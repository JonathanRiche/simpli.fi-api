import { describe, test, expect, beforeEach, afterEach, mock } from "bun:test";
import { SimplifiClient } from "../../src/index";
import { 
  createMockCampaign, 
  createMockCampaignRequest, 
  getTestCredentials 
} from "../utils/test-helpers";

describe("Campaign Operations", () => {
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

  describe("listCampaigns", () => {
    test("should fetch campaigns successfully", async () => {
      const mockCampaigns = [createMockCampaign(), createMockCampaign({ id: 67890 })];
      const mockResponse = { campaigns: mockCampaigns };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.listCampaigns();
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should handle filter parameters", async () => {
      const mockResponse = { campaigns: [] };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        await client.listCampaigns({ listParams: { filter: "active,pending" } });
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        // Check that the URL contains the filter parameter
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain("filter=active%2Cpending");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should handle pagination parameters", async () => {
      const mockResponse = { 
        campaigns: [], 
        paging: { page: 1, size: 10, total: 0 }
      };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        await client.listCampaigns({ 
          listParams: { page: 2, size: 25 }
        });
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain("page=2");
        expect(callArgs[0]).toContain("size=25");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("createCampaign", () => {
    test("should create campaign successfully", async () => {
      const campaignRequest = createMockCampaignRequest();
      const expectedCampaign = createMockCampaign();
      const mockResponse = { campaign: expectedCampaign, success: true };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.createCampaign({ campaignData: campaignRequest });
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        // Verify the request body
        const callArgs = mockFetch.mock.calls[0];
        const requestOptions = callArgs[1];
        expect(requestOptions.method).toBe("POST");
        expect(JSON.parse(requestOptions.body)).toEqual({ campaign: campaignRequest });
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should handle API errors", async () => {
      const campaignRequest = createMockCampaignRequest();

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: false,
        status: 400,
        text: () => Promise.resolve("Bad Request: Invalid campaign data"),
      })) as any;
      global.fetch = mockFetch;

      try {
        await expect(
          client.createCampaign({ campaignData: campaignRequest })
        ).rejects.toThrow();
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("getCampaignById", () => {
    test("should fetch campaign by ID successfully", async () => {
      const expectedCampaign = createMockCampaign();

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedCampaign),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.getCampaignById({ campaignId: 12345 });
        expect(result).toEqual(expectedCampaign);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain("/campaigns/12345");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should return null for not found campaign", async () => {
      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: false,
        status: 404,
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.getCampaignById({ campaignId: 99999 });
        expect(result).toBeNull();
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("updateCampaign", () => {
    test("should update campaign successfully", async () => {
      const campaignId = 12345;
      const updates = { name: "Updated Campaign Name", budget: 15000 };
      const updatedCampaign = createMockCampaign(updates);

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(updatedCampaign),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.updateCampaign({ 
          campaignId, 
          campaignData: updates 
        });
        expect(result).toEqual(updatedCampaign);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}`);
        expect(callArgs[1].method).toBe("PUT");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("campaign status operations", () => {
    beforeEach(() => {
      // Mock successful responses for status operations
      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })) as any;
      global.fetch = mockFetch;
      
      // Store for cleanup in test
      (global as any).originalFetch = originalFetch;
      (global as any).mockFetch = mockFetch;
    });

    afterEach(() => {
      global.fetch = (global as any).originalFetch;
    });

    test("should activate campaign", async () => {
      const campaignId = 12345;
      await client.activateCampaign({ campaignId });
      
      const mockFetch = (global as any).mockFetch;
      expect(mockFetch).toHaveBeenCalledTimes(1);
      
      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[0]).toContain(`/campaigns/${campaignId}/activate`);
      expect(callArgs[1].method).toBe("POST");
    });

    test("should pause campaign", async () => {
      const campaignId = 12345;
      await client.pauseCampaign({ campaignId });
      
      const mockFetch = (global as any).mockFetch;
      expect(mockFetch).toHaveBeenCalledTimes(1);
      
      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[0]).toContain(`/campaigns/${campaignId}/pause`);
      expect(callArgs[1].method).toBe("POST");
    });

    test("should end campaign", async () => {
      const campaignId = 12345;
      await client.endCampaign({ campaignId });
      
      const mockFetch = (global as any).mockFetch;
      expect(mockFetch).toHaveBeenCalledTimes(1);
      
      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[0]).toContain(`/campaigns/${campaignId}/end`);
      expect(callArgs[1].method).toBe("POST");
    });
  });

  describe("copyCampaign", () => {
    test("should copy campaign successfully", async () => {
      const campaignId = 12345;
      const mockResponse = { 
        campaigns: [createMockCampaign({ id: 67890, name: "Copied Campaign" })] 
      };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.copyCampaign({ campaignId });
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/copy`);
        expect(callArgs[1].method).toBe("POST");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("deleteCampaign", () => {
    test("should delete campaign successfully", async () => {
      const campaignId = 12345;

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.deleteCampaign({ campaignId });
        expect(result).toBe(true);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}`);
        expect(callArgs[1].method).toBe("DELETE");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should return false when delete fails", async () => {
      const campaignId = 12345;

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: false,
        status: 404,
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.deleteCampaign({ campaignId });
        expect(result).toBe(false);
      } finally {
        global.fetch = originalFetch;
      }
    });
  });
});