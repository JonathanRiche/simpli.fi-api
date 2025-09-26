import type { Campaign, CampaignRequest, Ad, BudgetPlan, GeoFence } from "../../src/index";

// Mock data generators
export const createMockCampaign = (overrides: Partial<Campaign> = {}): Campaign => ({
  id: 12345,
  name: "Test Campaign",
  status: "Active",
  start_date: "2024-01-01",
  end_date: "2024-12-31",
  budget: 10000,
  campaign_type_id: 4,
  ...overrides,
});

export const createMockCampaignRequest = (overrides: Partial<CampaignRequest> = {}): CampaignRequest => ({
  name: "Test Campaign Request",
  campaign_type_id: 4,
  start_date: "2024-01-01", 
  end_date: "2024-12-31",
  total_budget: 5000,
  daily_budget: 50,
  bid: 1.75,
  ...overrides,
});

export const createMockAd = (overrides: Partial<Ad> = {}): Ad => ({
  id: 54321,
  name: "Test Ad",
  status: "Active",
  pacing: 100,
  creative_group_id: 999,
  click_tag_verified: true,
  preview_tag: "<div>Preview</div>",
  target_url: "https://example.com",
  primary_creative: "test-creative.jpg",
  primary_creative_url: "https://cdn.example.com/test-creative.jpg",
  dynamic_ad_feed_id: null,
  feed_filter_id: null,
  extra_html: null,
  resource: "https://api.simpli.fi/ads/54321",
  actions: [],
  resources: [],
  ...overrides,
});

export const createMockBudgetPlan = (overrides: Partial<BudgetPlan> = {}): BudgetPlan => ({
  id: 98765,
  start_date: "2024-01-01",
  end_date: "2024-01-31",
  total_budget: 1000,
  adjusted_budget: 1000,
  spent_budget: 250,
  available_rollover: true,
  resource: "https://api.simpli.fi/budget_plans/98765",
  ...overrides,
});

export const createMockGeoFence = (overrides: Partial<GeoFence> = {}): GeoFence => ({
  id: 11111,
  name: "Test GeoFence",
  latitude: 40.7128,
  longitude: -74.0060,
  radius: 1000,
  radius_unit: "mi",
  resource: "https://api.simpli.fi/geo_fences/11111",
  ...overrides,
});

// Test environment setup helpers
export const getTestCredentials = () => ({
  appApiKey: process.env.TEST_APP_API_TOKEN || "test_app_token",
  userApiKey: process.env.TEST_USER_API_KEY || "test_user_key",
  orgId: process.env.TEST_ORG_ID || "12345"
});

export const isIntegrationTest = () => {
  return process.env.RUN_INTEGRATION_TESTS === "true" && 
         process.env.TEST_APP_API_TOKEN && 
         process.env.TEST_USER_API_KEY &&
         process.env.TEST_ORG_ID;
};

// Mock Fetch for Unit Tests using Bun's mock function
export const createMockFetch = (mockResponse: any, status = 200) => {
  const mockFetch = () => 
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(mockResponse),
      text: () => Promise.resolve(JSON.stringify(mockResponse)),
    });
  return mockFetch;
};

// Cleanup helpers
export const cleanupTestCampaign = async (campaignId: number, orgId: string, client: any) => {
  if (isIntegrationTest()) {
    try {
      await client.deleteCampaign({ campaignId, orgId });
    } catch (error) {
      console.warn(`Failed to cleanup test campaign ${campaignId}:`, error);
    }
  }
};

export const cleanupTestAd = async (adId: number, campaignId: number, orgId: string, client: any) => {
  if (isIntegrationTest()) {
    try {
      await client.pauseAd({ adId, campaignId, orgId });
    } catch (error) {
      console.warn(`Failed to cleanup test ad ${adId}:`, error);
    }
  }
};

// Wait helper for async operations
export const waitForMs = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));