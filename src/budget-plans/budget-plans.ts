import { BaseURL, checkEnvApiKeys, type RequestHeaders } from "../defaults";

export interface BudgetPlan {
    id: number;
    start_date: string;
    end_date: string;
    total_budget?: number;
    adjusted_budget?: number;
    spent_budget?: number;
    total_impressions?: number;
    adjusted_impressions?: number;
    spent_impressions?: number;
    available_rollover: boolean;
    resource: string;
}

export interface BudgetPlanRequest {
    start_date: string;
    end_date: string;
    total_budget?: number;
    total_impressions?: number;
}

export interface BudgetPlanResponse {
    budget_plans: BudgetPlan[];
}

export interface CampaignWithAvailableRollover {
    id: number;
    name: string;
    organization_id: number;
    remaining_budget: number;
    actions: Array<{
        rollover_next?: { href: string; method: string };
        rollover_even?: { href: string; method: string };
    }>;
}

export interface CampaignsWithRolloverResponse {
    campaigns: CampaignWithAvailableRollover[];
}

// Budget Plans endpoints
const budgetPlanEndpoint = (campaignId: number) => `https://app.simpli.fi/api/campaigns/${campaignId}/budget_plans`;
const budgetPlanByIdEndpoint = (budgetPlanId: number) => `https://app.simpli.fi/api/budget_plans/${budgetPlanId}`;
const orgCampaignsWithRolloverEndpoint = (orgId: string, children?: boolean) => 
    `${BaseURL}${orgId}/campaigns/with_available_rollover${children ? '?children=true' : ''}`;
const campaignRolloverEndpoint = (campaignId: number, type: 'next' | 'even') => 
    `https://app.simpli.fi/api/campaigns/${campaignId}/rollover_${type}`;

/**
 * List all budget plans for a campaign
 */
export async function listBudgetPlans(campaignId: number, headers?: RequestHeaders): Promise<BudgetPlanResponse> {
    const response = await fetch(budgetPlanEndpoint(campaignId), {
        method: "GET",
        headers: checkEnvApiKeys() || headers
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to list budget plans: ${response.status} ${response.statusText}`, { cause: errorText });
    }

    return response.json() as Promise<BudgetPlanResponse>;
}

/**
 * Get a specific budget plan by ID
 */
export async function getBudgetPlan(budgetPlanId: number, headers?: RequestHeaders): Promise<BudgetPlanResponse> {
    const response = await fetch(budgetPlanByIdEndpoint(budgetPlanId), {
        method: "GET",
        headers: checkEnvApiKeys() || headers
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get budget plan: ${response.status} ${response.statusText}`, { cause: errorText });
    }

    return response.json() as Promise<BudgetPlanResponse>;
}

/**
 * Create a new budget plan for a campaign
 */
export async function createBudgetPlan(
    campaignId: number, 
    budgetPlan: BudgetPlanRequest, 
    headers?: RequestHeaders
): Promise<BudgetPlanResponse> {
    const response = await fetch(budgetPlanEndpoint(campaignId), {
        method: "POST",
        headers: checkEnvApiKeys() || headers,
        body: JSON.stringify(budgetPlan)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create budget plan: ${response.status} ${response.statusText}`, { cause: errorText });
    }

    return response.json() as Promise<BudgetPlanResponse>;
}

/**
 * Update an existing budget plan
 */
export async function updateBudgetPlan(
    budgetPlanId: number, 
    budgetPlan: Partial<BudgetPlanRequest>, 
    headers?: RequestHeaders
): Promise<BudgetPlanResponse> {
    const response = await fetch(budgetPlanByIdEndpoint(budgetPlanId), {
        method: "PUT",
        headers: checkEnvApiKeys() || headers,
        body: JSON.stringify(budgetPlan)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update budget plan: ${response.status} ${response.statusText}`, { cause: errorText });
    }

    return response.json() as Promise<BudgetPlanResponse>;
}

/**
 * Delete a budget plan
 */
export async function deleteBudgetPlan(budgetPlanId: number, headers?: RequestHeaders): Promise<void> {
    const response = await fetch(budgetPlanByIdEndpoint(budgetPlanId), {
        method: "DELETE",
        headers: checkEnvApiKeys() || headers
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete budget plan: ${response.status} ${response.statusText}`, { cause: errorText });
    }
}

/**
 * Rollover budget plan unspent budget to next available budget plan
 */
export async function rolloverBudgetPlanNext(budgetPlanId: number, headers?: RequestHeaders): Promise<BudgetPlanResponse> {
    const response = await fetch(`${budgetPlanByIdEndpoint(budgetPlanId)}/rollover_next`, {
        method: "PUT",
        headers: checkEnvApiKeys() || headers
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to rollover budget plan to next: ${response.status} ${response.statusText}`, { cause: errorText });
    }

    return response.json() as Promise<BudgetPlanResponse>;
}

/**
 * Rollover budget plan unspent budget evenly to available budget plans
 */
export async function rolloverBudgetPlanEven(budgetPlanId: number, headers?: RequestHeaders): Promise<BudgetPlanResponse> {
    const response = await fetch(`${budgetPlanByIdEndpoint(budgetPlanId)}/rollover_even`, {
        method: "PUT",
        headers: checkEnvApiKeys() || headers
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to rollover budget plan evenly: ${response.status} ${response.statusText}`, { cause: errorText });
    }

    return response.json() as Promise<BudgetPlanResponse>;
}

/**
 * Rollover budget plan unspent budget to a new budget plan
 */
export async function rolloverBudgetPlanNew(budgetPlanId: number, headers?: RequestHeaders): Promise<BudgetPlanResponse> {
    const response = await fetch(`${budgetPlanByIdEndpoint(budgetPlanId)}/rollover_new`, {
        method: "PUT",
        headers: checkEnvApiKeys() || headers
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to rollover budget plan to new: ${response.status} ${response.statusText}`, { cause: errorText });
    }

    return response.json() as Promise<BudgetPlanResponse>;
}

/**
 * Get campaigns with available budget plan rollover
 */
export async function getCampaignsWithAvailableRollover(
    orgId: string, 
    includeChildren?: boolean, 
    headers?: RequestHeaders
): Promise<CampaignsWithRolloverResponse> {
    const response = await fetch(orgCampaignsWithRolloverEndpoint(orgId, includeChildren), {
        method: "GET",
        headers: checkEnvApiKeys() || headers
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get campaigns with available rollover: ${response.status} ${response.statusText}`, { cause: errorText });
    }

    return response.json() as Promise<CampaignsWithRolloverResponse>;
}

/**
 * Rollover all budget plans from a campaign with available rollover to the next available budget plan
 */
export async function rolloverCampaignNext(campaignId: number, headers?: RequestHeaders): Promise<BudgetPlanResponse> {
    const response = await fetch(campaignRolloverEndpoint(campaignId, 'next'), {
        method: "PUT",
        headers: checkEnvApiKeys() || headers
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to rollover campaign to next: ${response.status} ${response.statusText}`, { cause: errorText });
    }

    return response.json() as Promise<BudgetPlanResponse>;
}

/**
 * Rollover all budget plans from a campaign with available rollover evenly to available budget plans
 */
export async function rolloverCampaignEven(campaignId: number, headers?: RequestHeaders): Promise<BudgetPlanResponse> {
    const response = await fetch(campaignRolloverEndpoint(campaignId, 'even'), {
        method: "PUT",
        headers: checkEnvApiKeys() || headers
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to rollover campaign evenly: ${response.status} ${response.statusText}`, { cause: errorText });
    }

    return response.json() as Promise<BudgetPlanResponse>;
}