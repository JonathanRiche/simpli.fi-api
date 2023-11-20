import { BaseURL } from "../defaults";

const campaignEndpoint = (orgid: string) => `${BaseURL}${orgid}/campaigns`;


//?add to a class or object that inherits via a config method
const appKey = process.env.APP_API_TOKEN!;
const userKey = process.env.USER_API_KEY!;

//?add to a class or object that inherits via a config method
const headers = {
    "X-App-Key": appKey,
    "X-User-Key": userKey,
    "Content-Type": "application/json",
} as const;

//?apply all functions as methods in a class

async function createDraftCampaign(orgid: string): Promise<{ campaigns: Array<Campaign> }> {
    const response = await fetch(`${campaignEndpoint(orgid)}`, {
        method: 'POST',
        headers,
    });
    if (!response.ok) {
        throw new Error('Failed to create campaign', { cause: await response.text() });
    }
    return response.json() as Promise<{ campaigns: Array<Campaign> }>;
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

async function updateCampaign(campaignId: number, campaignData: CampaignRequest, orgid: string): Promise<Campaign | null> {

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
    //@ts-expect-error
    return data.campaigns[0];
}

async function createCampaign(campaignData: CampaignRequest, orgid: string): Promise<Campaign> {
    const { campaigns } = await createDraftCampaign(orgid);

    const updates = await updateCampaign(campaigns[0].id!, campaignData, orgid);

    if (!updates) {
        throw new Error('Failed to create campaign')
    }

    return updates

}

async function deleteCampaign(campaignId: number, orgid: string): Promise<boolean> {
    //@ts-ignore
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

async function listCampaigns(orgid: string): Promise<Campaign[]> {
    //@ts-ignore
    const response = await fetch(`${campaignEndpoint(orgid)}`, {
        method: "GET",
        //@ts-ignore
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve campaign list', { cause: await response.text() });
    }
    return response.json() as Promise<Campaign[]>;
}


async function getCampaignBudgetPlan(campaignId: number, orgid: string): Promise<{ budget_plans: Array<Budget_Plan> }> {
    //https://app.simpli.fi/api/campaigns/2/budget_plans
    const endpoint = `https://app.simpli.fi/api/campaigns/${campaignId}/budget_plans`;
    console.log(endpoint)
    //@ts-ignore
    const response = await fetch(endpoint, {
        method: "GET",
        //@ts-ignore
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve budget plans', { cause: await response.text() });
    }
    //onsole.log(response.text())
    //@ts-ignore
    return response.json();
}

//"https://app.simpli.fi/api/budget_plans/12"
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

export { listCampaigns, deleteCampaign, updateCampaign, getCampaignById, createCampaign, getCampaignBudgetPlan, updateBudgetPlan };