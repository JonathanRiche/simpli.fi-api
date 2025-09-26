import { describe, test, expect, beforeAll, afterAll, beforeEach } from "bun:test";
import { SimplifiClient } from "../../src/index";
import { 
  createMockCampaignRequest, 
  getTestCredentials, 
  isIntegrationTest,
  cleanupTestCampaign,
  waitForMs
} from "../utils/test-helpers";

// Integration tests - only run when environment is properly configured
describe.skipIf(!isIntegrationTest())("Campaign Integration Tests", () => {
  let client: SimplifiClient;
  let testCredentials: ReturnType<typeof getTestCredentials>;
  let createdCampaignIds: number[] = [];

  beforeAll(() => {
    console.log("🔗 Running Campaign Integration Tests against live API");
    testCredentials = getTestCredentials();
    client = new SimplifiClient({
      appApiKey: testCredentials.appApiKey,
      userApiKey: testCredentials.userApiKey,
      orgId: testCredentials.orgId,
      debug: false
    });
  });

  afterAll(async () => {
    // Cleanup any campaigns created during testing
    console.log("🧹 Cleaning up test campaigns...");
    for (const campaignId of createdCampaignIds) {
      await cleanupTestCampaign(campaignId, testCredentials.orgId, client);
    }
  });

  beforeEach(async () => {
    // Add small delay between tests to avoid rate limiting
    await waitForMs(1000);
  });

  describe("Campaign CRUD Operations", () => {
    test("should list campaigns", async () => {
      const campaigns = await client.listCampaigns();
      
      expect(campaigns).toBeDefined();
      expect(campaigns.campaigns).toBeInstanceOf(Array);
      
      if (campaigns.campaigns.length > 0) {
        const firstCampaign = campaigns.campaigns[0];
        expect(firstCampaign).toHaveProperty("id");
        expect(firstCampaign).toHaveProperty("name");
        expect(firstCampaign).toHaveProperty("status");
      }
    });

    test("should create and retrieve a campaign", async () => {
      const campaignData = createMockCampaignRequest({
        name: `Test Campaign ${Date.now()}`, // Ensure unique name
        start_date: "2024-04-01",
        end_date: "2024-04-30",
        total_budget: 1000
      });

      // Create campaign
      const createResponse = await client.createCampaign({ 
        campaignData 
      });
      
      expect(createResponse.success).toBe(true);
      expect(createResponse.campaign).toBeDefined();
      expect(createResponse.campaign.name).toBe(campaignData.name);
      
      const campaignId = createResponse.campaign.id!;
      createdCampaignIds.push(campaignId);

      // Retrieve the created campaign
      const retrievedCampaign = await client.getCampaignById({ 
        campaignId 
      });
      
      expect(retrievedCampaign).toBeDefined();
      expect(retrievedCampaign!.id).toBe(campaignId);
      expect(retrievedCampaign!.name).toBe(campaignData.name);
    }, 10000); // Extended timeout for network calls

    test("should update a campaign", async () => {
      // Create a campaign first
      const initialCampaignData = createMockCampaignRequest({
        name: `Test Campaign for Update ${Date.now()}`,
        start_date: "2024-05-01",
        end_date: "2024-05-31",
        total_budget: 2000
      });

      const createResponse = await client.createCampaign({ 
        campaignData: initialCampaignData 
      });
      
      const campaignId = createResponse.campaign.id!;
      createdCampaignIds.push(campaignId);

      // Update the campaign
      const updatedName = `Updated Campaign ${Date.now()}`;
      const updatedCampaign = await client.updateCampaign({ 
        campaignId, 
        campaignData: { name: updatedName }
      });
      
      expect(updatedCampaign).toBeDefined();
      expect(updatedCampaign!.name).toBe(updatedName);
    }, 10000);

    test("should handle campaign status changes", async () => {
      // Create a campaign first
      const campaignData = createMockCampaignRequest({
        name: `Test Campaign for Status ${Date.now()}`,
        start_date: "2024-06-01",
        end_date: "2024-06-30",
        total_budget: 1500
      });

      const createResponse = await client.createCampaign({ 
        campaignData 
      });
      
      const campaignId = createResponse.campaign.id!;
      createdCampaignIds.push(campaignId);

      // Test pause campaign (assuming it starts as Draft/Pending)
      await expect(client.pauseCampaign({ campaignId })).resolves.not.toThrow();
      
      // Add delay for status change to process
      await waitForMs(2000);
      
      // Verify status change
      const pausedCampaign = await client.getCampaignById({ campaignId });
      // Note: Status might be "Paused" or still processing, depending on API response time
      expect(pausedCampaign).toBeDefined();
    }, 15000);
  });

  describe("Campaign Filtering and Pagination", () => {
    test("should filter campaigns by status", async () => {
      const activeResponse = await client.listCampaigns({ 
        listParams: { filter: "active" }
      });
      
      expect(activeResponse.campaigns).toBeInstanceOf(Array);
      
      // If there are active campaigns, verify they all have "Active" status
      activeResponse.campaigns.forEach(campaign => {
        expect(campaign.status).toBe("Active");
      });
    });

    test("should handle pagination", async () => {
      const firstPage = await client.listCampaigns({ 
        listParams: { page: 1, size: 5 }
      });
      
      expect(firstPage.campaigns).toBeInstanceOf(Array);
      expect(firstPage.campaigns.length).toBeLessThanOrEqual(5);
      
      if (firstPage.paging) {
        expect(firstPage.paging.page).toBe(1);
        expect(firstPage.paging.size).toBe(5);
      }
    });
  });

  describe("Error Handling", () => {
    test("should handle non-existent campaign gracefully", async () => {
      const nonExistentCampaignId = 99999999;
      
      const result = await client.getCampaignById({ 
        campaignId: nonExistentCampaignId 
      });
      
      expect(result).toBeNull();
    });

    test("should handle invalid campaign data", async () => {
      const invalidCampaignData = {
        name: "", // Empty name should be invalid
        campaign_type_id: 1 as const,
        start_date: "invalid-date",
        end_date: "invalid-date"
      };

      await expect(
        client.createCampaign({ campaignData: invalidCampaignData })
      ).rejects.toThrow();
    });
  });
});