import { describe, test, expect, beforeEach, mock } from "bun:test";
import { SimplifiClient } from "../../src/index";
import { createMockCampaignRequest, getTestCredentials } from "../utils/test-helpers";

describe("SimplifiClient", () => {
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

  describe("constructor and configuration", () => {
    test("should create client with provided credentials", () => {
      expect(client).toBeInstanceOf(SimplifiClient);
    });

    test("should create client with environment variables when no config provided", () => {
      process.env.APP_API_TOKEN = "env_app_key";
      process.env.USER_API_KEY = "env_user_key";
      
      const envClient = new SimplifiClient({});
      expect(envClient).toBeInstanceOf(SimplifiClient);
    });

    test("should update config with config method", () => {
      const newConfig = {
        appApiKey: "new_app_key",
        userApiKey: "new_user_key",
        orgId: "67890",
        debug: true
      };

      client.config(newConfig);
      expect(client).toBeInstanceOf(SimplifiClient);
    });

    test("should warn when API keys are not set", () => {
      const consoleSpy = mock(() => {});
      const originalWarn = console.warn;
      console.warn = consoleSpy as any;

      // Create client without keys and no env vars
      delete process.env.APP_API_TOKEN;
      delete process.env.USER_API_KEY;
      
      new SimplifiClient({});

      console.warn = originalWarn;
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    test("should throw error when API keys are missing for campaign operations", async () => {
      const invalidClient = new SimplifiClient({
        appApiKey: "",
        userApiKey: "",
        orgId: testCredentials.orgId // Provide orgId so we test the API key validation first
      });

      const mockCampaignData = createMockCampaignRequest();

      await expect(
        invalidClient.createCampaign({ campaignData: mockCampaignData })
      ).rejects.toThrow("Please ensure to set your app and user API keys");
    });

    test("should throw error when orgId is missing", async () => {
      const clientWithoutOrgId = new SimplifiClient({
        appApiKey: testCredentials.appApiKey,
        userApiKey: testCredentials.userApiKey,
      });

      const mockCampaignData = createMockCampaignRequest();

      await expect(
        clientWithoutOrgId.createCampaign({ campaignData: mockCampaignData })
      ).rejects.toThrow("Please provide an organization ID");
    });

    test("should use orgId from method params when client orgId is not set", async () => {
      const clientWithoutOrgId = new SimplifiClient({
        appApiKey: testCredentials.appApiKey,
        userApiKey: testCredentials.userApiKey,
      });

      // Mock fetch to avoid actual API calls
      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ campaigns: [] }),
      })) as any;
      global.fetch = mockFetch;

      try {
        await clientWithoutOrgId.listCampaigns({ orgId: "12345" });
        expect(global.fetch).toHaveBeenCalled();
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("API method parameter handling", () => {
    test("should handle optional parameters correctly", async () => {
      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ campaigns: [] }),
      })) as any;
      global.fetch = mockFetch;

      try {
        await client.listCampaigns();
        expect(mockFetch).toHaveBeenCalled();
        
        await client.listCampaigns({ listParams: { filter: "active" } });
        expect(mockFetch).toHaveBeenCalledTimes(2);
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should require campaign ID for ad operations", async () => {
      await expect(
        client.listAds({ orgId: testCredentials.orgId })
      ).rejects.toThrow("Please provide a campaign ID");
    });
  });
});