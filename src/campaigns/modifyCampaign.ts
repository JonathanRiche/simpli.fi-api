import { BaseURL } from "../defaults";

const campaignEndpoint = (orgid: string) => `${BaseURL}${orgid}/campaigns`;

const appKey = process.env.APP_API_TOKEN;
const userKey = process.env.USER_API_KEY;

const headers = {
    "X-App-Key": appKey,
    "X-User-Key": userKey,
    "Content-Type": "application/json",
} as const;

async function createDraftCampaign(orgid: string): Promise<{campaigns:Array<Campaign>}> {
    const response = await fetch(`${campaignEndpoint(orgid)}`, {
        method: 'POST',
        headers,
    });
    if (!response.ok) {
        throw new Error('Failed to create campaign', { cause: await response.text() });
    }
    return response.json();
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
    return response.json();
}

async function updateCampaign(campaignId: number, campaignData: CampaignRequest, orgid: string): Promise<Campaign | null> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({campaign:campaignData}),
    });
    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        console.log(await response.text())
        throw new Error('Failed to update campaign', { cause: await response.text()});
    }
    return response.json();
}

async function createCampaign(campaignData: CampaignRequest,orgid: string): Promise<Campaign> {
    const {campaigns} = await createDraftCampaign(orgid);
    
    const updates = await updateCampaign(campaigns[0].id!,campaignData,orgid);

    if(!updates){
        throw new Error('Failed to create campaign')
    }

    return updates
    
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

async function listCampaigns(orgid: string): Promise<Campaign[]> {
    const response = await fetch(`${campaignEndpoint(orgid)}`, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve campaign list', { cause: await response.text() });
    }
    return response.json();
}


export { listCampaigns, deleteCampaign, updateCampaign, getCampaignById, createCampaign };