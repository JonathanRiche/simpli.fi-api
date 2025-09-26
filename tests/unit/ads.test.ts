import { describe, test, expect, beforeEach, mock } from "bun:test";
import { SimplifiClient } from "../../src/index";
import { 
  createMockAd, 
  getTestCredentials 
} from "../utils/test-helpers";

describe("Ad Operations", () => {
  let client: SimplifiClient;
  let testCredentials: ReturnType<typeof getTestCredentials>;

  beforeEach(() => {
    testCredentials = getTestCredentials();
    client = new SimplifiClient({
      appApiKey: testCredentials.appApiKey,
      userApiKey: testCredentials.userApiKey,
      orgId: testCredentials.orgId,
      debug: false
    });
  });

  describe("listAds", () => {
    test("should fetch ads for a campaign successfully", async () => {
      const campaignId = 12345;
      const mockAds = [
        createMockAd({ id: 1, name: "Test Ad 1" }),
        createMockAd({ id: 2, name: "Test Ad 2" })
      ];

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAds),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.listAds({ campaignId });
        expect(result).toEqual(mockAds);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/ads`);
        expect(callArgs[1].method).toBe("GET");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should handle filter parameters", async () => {
      const campaignId = 12345;

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })) as any;
      global.fetch = mockFetch;

      try {
        await client.listAds({ 
          campaignId, 
          filter: "active",
          include: "stats",
          allow_deleted: true,
          attributes_only: false
        });
        
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        const url = callArgs[0];
        expect(url).toContain("filter=active");
        expect(url).toContain("include=stats");
        expect(url).toContain("allow_deleted=true");
        expect(url).toContain("attributes_only=false");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should require campaignId parameter", async () => {
      await expect(
        client.listAds({ orgId: testCredentials.orgId })
      ).rejects.toThrow("Please provide a campaign ID");
    });
  });

  describe("createHTMLAd", () => {
    test("should create HTML ad successfully", async () => {
      const campaignId = 12345;
      const htmlAdData = {
        name: "Test HTML Ad",
        ad_file_type_id: "3", // HTML type
        ad_size_id: "123", 
        ad_placement_id: 1,
        target_url: "https://example.com",
        html: "<div>Test HTML</div>"
      };
      
      const expectedAd = createMockAd({ name: "Test HTML Ad" });

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedAd),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.createHTMLAd({ 
          campaignId, 
          ad: htmlAdData 
        });
        
        expect(result).toEqual(expectedAd);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/ads`);
        expect(callArgs[1].method).toBe("POST");
        expect(JSON.parse(callArgs[1].body)).toEqual({ ad: htmlAdData });
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("updateAd", () => {
    test("should update ad successfully", async () => {
      const campaignId = 12345;
      const adId = 67890;
      const updateData = { 
        name: "Updated Ad Name",
        target_url: "https://updated-example.com"
      };
      
      const updatedAd = createMockAd({ ...updateData, id: adId });

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(updatedAd),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.updateAd({ 
          campaignId, 
          adId, 
          ad: updateData 
        });
        
        expect(result).toEqual(updatedAd);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/ads/${adId}`);
        expect(callArgs[1].method).toBe("PUT");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("pauseAd", () => {
    test("should pause ad successfully", async () => {
      const campaignId = 12345;
      const adId = 67890;

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })) as any;
      global.fetch = mockFetch;

      try {
        await client.pauseAd({ campaignId, adId });
        
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/ads/${adId}/pause`);
        expect(callArgs[1].method).toBe("POST");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("verifyClickTag", () => {
    test("should verify click tag successfully", async () => {
      const campaignId = 12345;
      const adId = 67890;

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ verified: true }),
      })) as any;
      global.fetch = mockFetch;

      try {
        await client.verifyClickTag({ campaignId, adId });
        
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/ads/${adId}/verify_click_tag`);
        expect(callArgs[1].method).toBe("POST");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("getBulkAds", () => {
    test("should get bulk ads successfully", async () => {
      const campaignId = 12345;
      const adIds = [1, 2, 3];
      const mockResponse = {
        ads: adIds.map(id => createMockAd({ id })),
        not_valid_ad_ids: [],
        not_permitted_ad_ids: []
      };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.getBulkAds({ 
          campaignId, 
          adIds,
          previewOnly: false
        });
        
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[1].method).toBe("GET");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should handle preview-only mode", async () => {
      const campaignId = 12345;
      const adIds = [1, 2, 3];

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ads: [], errors: [] }),
      })) as any;
      global.fetch = mockFetch;

      try {
        await client.getBulkAds({ 
          campaignId, 
          adIds,
          previewOnly: true
        });
        
        expect(mockFetch).toHaveBeenCalledTimes(1);
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("createAdWithFile", () => {
    test("should create ad with file successfully", async () => {
      const campaignId = 12345;
      const adData = {
        name: "Image Ad",
        alt_text: "Test image alt text",
        target_url: "https://example.com",
        pacing: 100,
        ad_file_type_id: 1, // Image type
        ad_size_id: 123
      };
      
      // Mock file
      const mockFile = new Blob(["test image data"], { type: "image/png" });
      
      const expectedAd = createMockAd({ name: "Image Ad" });

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedAd),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.createAdWithFile({ 
          campaignId, 
          ad: adData,
          file: mockFile,
          debug: false
        });
        
        expect(result).toEqual(expectedAd);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/ads`);
        expect(callArgs[1].method).toBe("POST");
        
        // Check that FormData was used (body should be FormData)
        expect(callArgs[1].body).toBeInstanceOf(FormData);
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should handle file upload errors", async () => {
      const campaignId = 12345;
      const adData = { 
        name: "Failed Ad",
        alt_text: "Failed alt text",
        target_url: "https://example.com",
        pacing: 100,
        ad_file_type_id: 1,
        ad_size_id: 123
      };
      const mockFile = new Blob(["test"], { type: "image/png" });

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: false,
        status: 413,
        text: () => Promise.resolve("File too large"),
      })) as any;
      global.fetch = mockFetch;

      try {
        await expect(
          client.createAdWithFile({ 
            campaignId, 
            ad: adData,
            file: mockFile
          })
        ).rejects.toThrow();
      } finally {
        global.fetch = originalFetch;
      }
    });
  });
});