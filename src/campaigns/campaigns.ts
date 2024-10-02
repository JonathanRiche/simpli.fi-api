import { BaseURL } from "../defaults";

const campaignEndpoint = (orgid: string) => `${BaseURL}${orgid}/campaigns`;

const appKey = process.env.APP_API_TOKEN!;
const userKey = process.env.USER_API_KEY!;

const headers = {
    "X-App-Key": appKey,
    "X-User-Key": userKey,
    "Content-Type": "application/json",
} as const;

export interface ListCampaignsParams {
    /** 
     *Filter
You can pass a filter query string param to limit the result set.

Example:
filter=active
filter=active,pending

Alternative Filter Options
Instead of using the query string, other params can be used to filter the returned campaigns. These are exclusive with the filter param, and if the filter param is present, it will take precedence.

Filter campaigns by exact name match example:
?name=foo

Filter campaigns by name similarity match example:
?name_like=foo
     * */
    filter?: string;
    include?: string[];
    page?: number;
    size?: number;
    attributes_only?: boolean;
    children?: boolean;
    /** 
     * Name used in conjunction with the filter param to filter campaigns by exact name match.
     * **/
    name?: string;
    name_like?: string;
    sortColumn?: 'name' | 'name_like' | 'created_at';
    sortOrder?: 'asc' | 'desc';
}

export interface CampaignResponse {
    campaigns: Campaign[];
    paging?: {
        page: number;
        size: number;
        total: number;
    };
}

async function listCampaigns(orgid: string, params?: ListCampaignsParams, debug?: boolean): Promise<CampaignResponse> {
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
    if (debug) {
        console.log(queryParams.toString())
    }
    const response = await fetch(`${campaignEndpoint(orgid)}?${queryParams.toString()}`, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to retrieve campaign list', { cause: responseText });
    }
    return response.json() as Promise<CampaignResponse>;
}

async function createDraftCampaign(orgid: string, debug?: boolean): Promise<CampaignResponse> {
    const response = await fetch(`${campaignEndpoint(orgid)}`, {
        method: 'POST',
        headers,
    });
    if (!response.ok) {
        const responseText = await response.text();

        throw new Error('Failed to create campaign', { cause: responseText });
    }
    const data = await response.json() as unknown as Promise<CampaignResponse>;
    if (debug) {
        console.info('Draft campaign created : ', data);
    }
    return data
}

async function getCampaignById(campaignId: number, orgid: string, debug?: boolean): Promise<Campaign | null> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}`, {
        method: "GET",
        headers
    });
    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        const responseText = await response.text();

        throw new Error('Failed to retrieve campaign', { cause: responseText });
    }

    return response.json() as Promise<Campaign | null>;
}

async function updateCampaign(campaignId: number, campaignData: Partial<CampaignRequest>, orgid: string, debug?: boolean): Promise<Campaign | null> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ campaign: campaignData }),
    });
    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to update campaign', { cause: responseText });
    }
    const data = await response.json();
    return data.campaigns[0];
}

async function createCampaign(campaignData: CampaignRequest, orgid: string, debug?: boolean): Promise<{ campaign: Campaign, success: boolean }> {
    const { campaigns } = await createDraftCampaign(orgid, debug);
    let updates: Campaign | null = null;
    try {
        updates = await updateCampaign(campaigns[0].id!, campaignData, orgid, debug);
    } catch (e) {
        return { campaign: campaigns[0], success: false };
    }
    if (!updates) {
        throw new Error('Failed to create campaign')
    }

    return { campaign: updates, success: true };
}

async function deleteCampaign(campaignId: number, orgid: string, debug?: boolean): Promise<boolean> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}`, {
        method: 'DELETE',
        headers
    });
    if (response.status === 404) {
        return false;
    }
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to delete campaign', { cause: responseText });
    }
    return true;
}

async function getCampaignBudgetPlan(campaignId: number, debug?: boolean): Promise<{ budget_plans: Array<Budget_Plan> }> {
    const endpoint = `https://app.simpli.fi/api/campaigns/${campaignId}/budget_plans`;
    const response = await fetch(endpoint, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to retrieve budget plans', { cause: responseText });
    }
    return response.json();
}

async function updateBudgetPlan(id: number, plan: Budget_Plan_Request, debug?: boolean) {
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

async function activateCampaign(campaignId: number, orgid: string, debug?: boolean): Promise<void> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}/activate`, {
        method: 'POST',
        headers
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to activate campaign', { cause: responseText });
    }
}

async function pauseCampaign(campaignId: number, orgid: string, debug?: boolean): Promise<void> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}/pause`, {
        method: 'POST',
        headers
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to pause campaign', { cause: responseText });
    }
}

async function endCampaign(campaignId: number, orgid: string, debug?: boolean): Promise<void> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}/end`, {
        method: 'POST',
        headers
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to end campaign', { cause: responseText });
    }
}

async function copyCampaign(campaignId: number, orgid: string, debug?: boolean): Promise<Campaign> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}/copy`, {
        method: 'POST',
        headers
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to copy campaign', { cause: responseText });
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
