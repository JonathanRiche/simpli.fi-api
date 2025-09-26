import { describe, test, expect, beforeEach, mock } from "bun:test";
import { SimplifiClient } from "../../src/index";
import { 
  createMockGeoFence, 
  getTestCredentials 
} from "../utils/test-helpers";

describe("GeoFence Operations", () => {
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

  describe("getGeoFences", () => {
    test("should fetch geo fences for a campaign successfully", async () => {
      const campaignId = 12345;
      const mockGeoFences = [
        createMockGeoFence({ id: 1, name: "GeoFence 1" }),
        createMockGeoFence({ id: 2, name: "GeoFence 2" })
      ];

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGeoFences),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.getGeoFences({ campaignId });
        expect(result).toEqual(mockGeoFences);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/geo_fences`);
        expect(callArgs[1].method).toBe("GET");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should handle API errors", async () => {
      const campaignId = 12345;

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: false,
        status: 404,
        text: () => Promise.resolve("Campaign not found"),
      })) as any;
      global.fetch = mockFetch;

      try {
        await expect(
          client.getGeoFences({ campaignId })
        ).rejects.toThrow();
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("addGeoFences", () => {
    test("should add geo fences successfully", async () => {
      const campaignId = 12345;
      const geoFenceParams = [{
        name: "New GeoFence",
        bid_area: {
          type: "Polygon" as const,
          coordinates: [[[40.7128, -74.0060], [40.7138, -74.0070], [40.7118, -74.0050]] as [number, number][]]
        }
      }];
      
      const mockCreatedGeoFences = [createMockGeoFence({ name: "New GeoFence" })];

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCreatedGeoFences),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.addGeoFences({ 
          campaignId, 
          geoFences: geoFenceParams 
        });
        
        expect(result).toEqual(mockCreatedGeoFences);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/geo_fences`);
        expect(callArgs[1].method).toBe("POST");
        expect(JSON.parse(callArgs[1].body)).toEqual({ 
          geo_fences: geoFenceParams 
        });
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("updateGeoFence", () => {
    test("should update geo fence successfully", async () => {
      const campaignId = 12345;
      const geoFenceId = 67890;
      const updateParams = {
        name: "Updated GeoFence Name",
        bid_area: {
          type: "Polygon" as const,
          coordinates: [[[40.7128, -74.0060], [40.7138, -74.0070]] as [number, number][]]
        }
      };
      
      const updatedGeoFence = createMockGeoFence({ 
        id: geoFenceId, 
        name: "Updated GeoFence Name" 
      });

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(updatedGeoFence),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.updateGeoFence({ 
          campaignId, 
          geoFenceId, 
          geoFence: updateParams 
        });
        
        expect(result).toEqual(updatedGeoFence);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/geo_fences/${geoFenceId}`);
        expect(callArgs[1].method).toBe("PUT");
        expect(JSON.parse(callArgs[1].body)).toEqual({ 
          geo_fence: updateParams 
        });
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("deleteGeoFence", () => {
    test("should delete geo fence successfully", async () => {
      const campaignId = 12345;
      const geoFenceId = 67890;

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })) as any;
      global.fetch = mockFetch;

      try {
        await client.deleteGeoFence({ campaignId, geoFenceId });
        
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/geo_fences/${geoFenceId}`);
        expect(callArgs[1].method).toBe("DELETE");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should handle delete errors", async () => {
      const campaignId = 12345;
      const geoFenceId = 67890;

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: false,
        status: 404,
        text: () => Promise.resolve("GeoFence not found"),
      })) as any;
      global.fetch = mockFetch;

      try {
        await expect(
          client.deleteGeoFence({ campaignId, geoFenceId })
        ).rejects.toThrow();
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("replaceGeoFences", () => {
    test("should replace all geo fences successfully", async () => {
      const campaignId = 12345;
      const newGeoFences = [{
        name: "Replacement GeoFence",
        bid_area: {
          type: "Polygon" as const,
          coordinates: [[[40.7128, -74.0060], [40.7138, -74.0070]] as [number, number][]]
        }
      }];
      
      const mockReplacedGeoFences = [createMockGeoFence({ name: "Replacement GeoFence" })];

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockReplacedGeoFences),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.replaceGeoFences({ 
          campaignId, 
          geoFences: newGeoFences 
        });
        
        expect(result).toEqual(mockReplacedGeoFences);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/geo_fences`);
        expect(callArgs[1].method).toBe("PUT");
        expect(JSON.parse(callArgs[1].body)).toEqual({ 
          geo_fences: newGeoFences 
        });
      } finally {
        global.fetch = originalFetch;
      }
    });
  });
});