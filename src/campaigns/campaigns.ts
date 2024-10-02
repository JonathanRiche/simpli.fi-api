import { BaseURL } from "../defaults";

const campaignEndpoint = (orgid: string) => `${BaseURL}${orgid}/campaigns`;

const appKey = process.env.APP_API_TOKEN!;
const userKey = process.env.USER_API_KEY!;

const headers = {
    "X-App-Key": appKey,
    "X-User-Key": userKey,
    "Content-Type": "application/json",
} as const;

interface ListCampaignsParams {
    filter?: string;
    include?: string[];
    page?: number;
    size?: number;
    attributes_only?: boolean;
    children?: boolean;
    name?: string;
    name_like?: string;
    sortColumn?: 'name' | 'name_like' | 'created_at';
    sortOrder?: 'asc' | 'desc';
}

interface CampaignResponse {
    campaigns: Campaign[];
    paging?: {
        page: number;
        size: number;
        total: number;
    };
}

async function listCampaigns(orgid: string, params?: ListCampaignsParams): Promise<CampaignResponse> {
    const queryParams = new URLSearchParams();
    if (params) {
        if (params.filter) queryParams.append('filter', params.filter);
        if (params.include) queryParams.append('include', params.include.join(','));
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.size) queryParams.append('size', params.size.toString());
        if (params.attributes_only) queryParams.append('attributes_only', 'true');
        if (params.children) queryParams.append('children', 'true');
        if (params.name) queryParams.append('name', params.name);
        if (params.name_like) queryParams.append('name_like', params.name_like);
        if (params.sortColumn) queryParams.append('sortColumn', params.sortColumn);
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    }

    const response = await fetch(`${campaignEndpoint(orgid)}?${queryParams.toString()}`, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve campaign list', { cause: await response.text() });
    }
    return response.json() as Promise<CampaignResponse>;
}

async function createDraftCampaign(orgid: string): Promise<CampaignResponse> {
    const response = await fetch(`${campaignEndpoint(orgid)}`, {
        method: 'POST',
        headers,
    });
    if (!response.ok) {
        throw new Error('Failed to create campaign', { cause: await response.text() });
    }
    return response.json() as Promise<CampaignResponse>;
}

async function getCampaignById(campaignId: number, orgid: string): Promise<Campaign | null> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}`, {
        method: "GET",
        headers
    });
    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        throw new Error('Failed to retrieve campaign', { cause: await response.text() });
    }

    return response.json() as Promise<Campaign | null>;
}

async function updateCampaign(campaignId: number, campaignData: Partial<CampaignRequest>, orgid: string): Promise<Campaign | null> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ campaign: campaignData }),
    });
    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        console.log(await response.text())
        throw new Error('Failed to update campaign', { cause: await response.text() });
    }
    const data = await response.json();
    return data.campaigns[0];
}

async function createCampaign(campaignData: CampaignRequest, orgid: string): Promise<Campaign> {
    const { campaigns } = await createDraftCampaign(orgid);

    const updates = await updateCampaign(campaigns[0].id!, campaignData, orgid);

    if (!updates) {
        throw new Error('Failed to create campaign')
    }

    return updates;
}

async function deleteCampaign(campaignId: number, orgid: string): Promise<boolean> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}`, {
        method: 'DELETE',
        headers
    });
    if (response.status === 404) {
        return false;
    }
    if (!response.ok) {
        throw new Error('Failed to delete campaign', { cause: await response.text() });
    }
    return true;
}

async function getCampaignBudgetPlan(campaignId: number, orgid: string): Promise<{ budget_plans: Array<Budget_Plan> }> {
    const endpoint = `https://app.simpli.fi/api/campaigns/${campaignId}/budget_plans`;
    const response = await fetch(endpoint, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve budget plans', { cause: await response.text() });
    }
    return response.json();
}

async function updateBudgetPlan(id: number, plan: Budget_Plan_Request) {
    const endpoint = `https://app.simpli.fi/api/budget_plans/${id}`;

    const response = await fetch(endpoint, {
        method: "PUT",
        headers,
        body: JSON.stringify(plan)
    });
    if (!response.ok) {
        const cause = await response.text()
        throw new Error('Failed to update budget plan', { cause });
    }

    return response.json();
}

async function activateCampaign(campaignId: number, orgid: string): Promise<void> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}/activate`, {
        method: 'POST',
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to activate campaign', { cause: await response.text() });
    }
}

async function pauseCampaign(campaignId: number, orgid: string): Promise<void> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}/pause`, {
        method: 'POST',
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to pause campaign', { cause: await response.text() });
    }
}

async function endCampaign(campaignId: number, orgid: string): Promise<void> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}/end`, {
        method: 'POST',
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to end campaign', { cause: await response.text() });
    }
}

async function copyCampaign(campaignId: number, orgid: string): Promise<Campaign> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}/copy`, {
        method: 'POST',
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to copy campaign', { cause: await response.text() });
    }
    return response.json() as Promise<Campaign>;
}

export {
    listCampaigns,
    createDraftCampaign,
    getCampaignById,
    updateCampaign,
    createCampaign,
    deleteCampaign,
    getCampaignBudgetPlan,
    updateBudgetPlan,
    activateCampaign,
    pauseCampaign,
    endCampaign,
    copyCampaign
};
