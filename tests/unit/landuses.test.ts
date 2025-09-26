import { describe, test, expect, beforeEach, mock } from "bun:test";
import { SimplifiClient } from "../../src/index";
import { getTestCredentials } from "../utils/test-helpers";

describe("Land Use Operations", () => {
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

  describe("getAllLandUses", () => {
    test("should fetch all land uses successfully", async () => {
      const mockLandUses = [
        {
          id: 1,
          name: "Residential",
          resource: "https://api.simpli.fi/land_uses/1"
        },
        {
          id: 2,
          name: "Commercial", 
          resource: "https://api.simpli.fi/land_uses/2"
        },
        {
          id: 3,
          name: "Industrial",
          resource: "https://api.simpli.fi/land_uses/3"
        }
      ];

      const mockResponse = { land_uses: mockLandUses };
      
      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.getAllLandUses({});
        expect(result).toEqual(mockLandUses);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain("/land_uses");
        expect(callArgs[1].method).toBe("GET");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should handle API errors", async () => {
      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: false,
        status: 500,
        text: () => Promise.resolve("Internal Server Error"),
      })) as any;
      global.fetch = mockFetch;

      try {
        await expect(
          client.getAllLandUses({})
        ).rejects.toThrow();
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("getSingleLandUse", () => {
    test("should fetch a single land use successfully", async () => {
      const landUseId = 42;
      const expectedLandUse = {
        id: landUseId,
        name: "Educational",
        description: "Schools, universities, and educational facilities",
        resource: `https://api.simpli.fi/land_uses/${landUseId}`
      };

      const mockResponse = { land_uses: [expectedLandUse] };
      
      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.getSingleLandUse({ landUseId });
        expect(result).toEqual(expectedLandUse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/land_uses/${landUseId}`);
        expect(callArgs[1].method).toBe("GET");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should handle not found land use", async () => {
      const landUseId = 99999;

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: false,
        status: 404,
        text: () => Promise.resolve("Land use not found"),
      })) as any;
      global.fetch = mockFetch;

      try {
        await expect(
          client.getSingleLandUse({ landUseId })
        ).rejects.toThrow();
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should handle invalid land use ID", async () => {
      const landUseId = -1;

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: false,
        status: 400,
        text: () => Promise.resolve("Invalid land use ID"),
      })) as any;
      global.fetch = mockFetch;

      try {
        await expect(
          client.getSingleLandUse({ landUseId })
        ).rejects.toThrow();
      } finally {
        global.fetch = originalFetch;
      }
    });
  });
});