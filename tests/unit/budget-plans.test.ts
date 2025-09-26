import { describe, test, expect, beforeEach, mock } from "bun:test";
import { SimplifiClient } from "../../src/index";
import { 
  createMockBudgetPlan, 
  getTestCredentials 
} from "../utils/test-helpers";

describe("Budget Plan Operations", () => {
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

  describe("listBudgetPlans", () => {
    test("should fetch budget plans for a campaign successfully", async () => {
      const campaignId = 12345;
      const mockBudgetPlans = [
        createMockBudgetPlan({ id: 1 }),
        createMockBudgetPlan({ id: 2 })
      ];
      const mockResponse = { budget_plans: mockBudgetPlans };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.listBudgetPlans({ campaignId });
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/budget_plans`);
        expect(callArgs[1].method).toBe("GET");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("getBudgetPlan", () => {
    test("should fetch a specific budget plan successfully", async () => {
      const budgetPlanId = 98765;
      const expectedBudgetPlan = createMockBudgetPlan({ id: budgetPlanId });
      const mockResponse = { budget_plans: [expectedBudgetPlan] };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.getBudgetPlan({ budgetPlanId });
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/budget_plans/${budgetPlanId}`);
        expect(callArgs[1].method).toBe("GET");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("createBudgetPlan", () => {
    test("should create budget plan successfully", async () => {
      const campaignId = 12345;
      const budgetPlanData = {
        start_date: "2024-02-01",
        end_date: "2024-02-29",
        total_budget: 5000,
        total_impressions: 100000
      };
      
      const expectedResponse = { 
        budget_plans: [createMockBudgetPlan(budgetPlanData)]
      };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.createBudgetPlan({ 
          campaignId, 
          budgetPlan: budgetPlanData 
        });
        
        expect(result).toEqual(expectedResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/budget_plans`);
        expect(callArgs[1].method).toBe("POST");
        expect(JSON.parse(callArgs[1].body)).toEqual({ 
          budget_plan: budgetPlanData 
        });
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("updateBudgetPlan", () => {
    test("should update budget plan successfully", async () => {
      const budgetPlanId = 98765;
      const updateData = {
        total_budget: 7500,
        end_date: "2024-03-15"
      };
      
      const expectedResponse = { 
        budget_plans: [createMockBudgetPlan({ ...updateData, id: budgetPlanId })]
      };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.updateBudgetPlan({ 
          budgetPlanId, 
          budgetPlan: updateData 
        });
        
        expect(result).toEqual(expectedResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/budget_plans/${budgetPlanId}`);
        expect(callArgs[1].method).toBe("PUT");
        expect(JSON.parse(callArgs[1].body)).toEqual({ 
          budget_plan: updateData 
        });
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("deleteBudgetPlan", () => {
    test("should delete budget plan successfully", async () => {
      const budgetPlanId = 98765;

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })) as any;
      global.fetch = mockFetch;

      try {
        await client.deleteBudgetPlan({ budgetPlanId });
        
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/budget_plans/${budgetPlanId}`);
        expect(callArgs[1].method).toBe("DELETE");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("rollover operations", () => {
    test("should rollover budget plan to next period", async () => {
      const budgetPlanId = 98765;
      const mockResponse = { 
        budget_plan: createMockBudgetPlan({ id: 99999 }) 
      };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.rolloverBudgetPlanNext({ budgetPlanId });
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/budget_plans/${budgetPlanId}/rollover/next`);
        expect(callArgs[1].method).toBe("POST");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should rollover budget plan evenly", async () => {
      const budgetPlanId = 98765;
      const mockResponse = { 
        budget_plan: createMockBudgetPlan({ id: 99999 }) 
      };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.rolloverBudgetPlanEven({ budgetPlanId });
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/budget_plans/${budgetPlanId}/rollover/even`);
        expect(callArgs[1].method).toBe("POST");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should create new rollover budget plan", async () => {
      const budgetPlanId = 98765;
      const mockResponse = { 
        budget_plan: createMockBudgetPlan({ id: 99999 }) 
      };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.rolloverBudgetPlanNew({ budgetPlanId });
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/budget_plans/${budgetPlanId}/rollover/new`);
        expect(callArgs[1].method).toBe("POST");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("campaign rollover operations", () => {
    test("should get campaigns with available rollover", async () => {
      const mockResponse = {
        campaigns: [{
          id: 12345,
          name: "Campaign with Rollover",
          available_rollover_amount: 1000
        }]
      };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.getCampaignsWithAvailableRollover({ 
          includeChildren: true 
        });
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain("campaigns/rollover");
        expect(callArgs[0]).toContain("include_children=true");
        expect(callArgs[1].method).toBe("GET");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should rollover campaign to next period", async () => {
      const campaignId = 12345;
      const mockResponse = { 
        budget_plan: createMockBudgetPlan({ id: 99999 }) 
      };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.rolloverCampaignNext({ campaignId });
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/rollover/next`);
        expect(callArgs[1].method).toBe("POST");
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should rollover campaign evenly", async () => {
      const campaignId = 12345;
      const mockResponse = { 
        budget_plan: createMockBudgetPlan({ id: 99999 }) 
      };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.rolloverCampaignEven({ campaignId });
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/rollover/even`);
        expect(callArgs[1].method).toBe("POST");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });
});