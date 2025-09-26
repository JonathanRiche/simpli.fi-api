import { BaseURL, checkEnvApiKeys, type RequestHeaders } from "../defaults";

export interface CampaignStat {
    resource: string;
    name: string;
    impressions: number;
    clicks: number;
    ctr: number;
    cpm: number;
    cpc: number;
    cpa: number;
    vcr: number;
    weighted_actions: number;
    total_spend: number;
    stat_date: string;
    campaign_id?: number;
    ad_id?: number;
    resources: Array<{
        campaigns?: string;
        ads?: string;
    }>;
}

export interface CampaignStatsResponse {
    campaign_stats: CampaignStat[];
    paging: {
        page: number;
        size: number;
        total: number;
    };
}

export interface CampaignStatsParams {
    start_date?: string; // Format: YYYY-MM-DD
    end_date?: string;   // Format: YYYY-MM-DD
    by_day?: boolean;
    by_campaign?: boolean;
    by_ad?: boolean;
    campaign_id?: number;
    page?: number;
}

const campaignStatsEndpoint = (orgId: string) => `${BaseURL}${orgId}/campaign_stats`;

/**
 * Get campaign stats for an organization
 */
export async function getCampaignStats(
    orgId: string, 
    params?: CampaignStatsParams, 
    headers?: RequestHeaders
): Promise<CampaignStatsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params) {
        if (params.start_date) queryParams.append('start_date', params.start_date);
        if (params.end_date) queryParams.append('end_date', params.end_date);
        if (params.by_day) queryParams.append('by_day', 'true');
        if (params.by_campaign) queryParams.append('by_campaign', 'true');
        if (params.by_ad) queryParams.append('by_ad', 'true');
        if (params.campaign_id) queryParams.append('campaign_id', params.campaign_id.toString());
        if (params.page) queryParams.append('page', params.page.toString());
    }

    const url = `${campaignStatsEndpoint(orgId)}?${queryParams.toString()}`;
    const response = await fetch(url, {
        method: "GET",
        headers: checkEnvApiKeys() || headers
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get campaign stats: ${response.status} ${response.statusText}`, { cause: errorText });
    }

    return response.json() as Promise<CampaignStatsResponse>;
}

/**
 * Get stats for all campaigns under the organization
 */
export async function getAllCampaignStats(
    orgId: string, 
    startDate?: string, 
    endDate?: string, 
    headers?: RequestHeaders
): Promise<CampaignStatsResponse> {
    return getCampaignStats(orgId, { start_date: startDate, end_date: endDate }, headers);
}

/**
 * Get stats for all campaigns grouped by campaign
 */
export async function getCampaignStatsByCampaign(
    orgId: string, 
    startDate?: string, 
    endDate?: string, 
    headers?: RequestHeaders
): Promise<CampaignStatsResponse> {
    return getCampaignStats(orgId, { 
        by_campaign: true, 
        start_date: startDate, 
        end_date: endDate 
    }, headers);
}

/**
 * Get stats for all campaigns grouped by ad
 */
export async function getCampaignStatsByAd(
    orgId: string, 
    startDate?: string, 
    endDate?: string, 
    headers?: RequestHeaders
): Promise<CampaignStatsResponse> {
    return getCampaignStats(orgId, { 
        by_ad: true, 
        start_date: startDate, 
        end_date: endDate 
    }, headers);
}

/**
 * Get stats for a specific campaign
 */
export async function getSpecificCampaignStats(
    orgId: string, 
    campaignId: number, 
    startDate?: string, 
    endDate?: string, 
    headers?: RequestHeaders
): Promise<CampaignStatsResponse> {
    return getCampaignStats(orgId, { 
        campaign_id: campaignId, 
        start_date: startDate, 
        end_date: endDate 
    }, headers);
}

/**
 * Get daily stats breakdown
 */
export async function getDailyCampaignStats(
    orgId: string, 
    startDate?: string, 
    endDate?: string, 
    headers?: RequestHeaders
): Promise<CampaignStatsResponse> {
    return getCampaignStats(orgId, { 
        by_day: true, 
        start_date: startDate, 
        end_date: endDate 
    }, headers);
}

/**
 * Get comprehensive stats with all breakdowns
 */
export async function getComprehensiveCampaignStats(
    orgId: string, 
    campaignId?: number, 
    startDate?: string, 
    endDate?: string, 
    headers?: RequestHeaders
): Promise<CampaignStatsResponse> {
    return getCampaignStats(orgId, { 
        by_campaign: true,
        by_ad: true,
        by_day: true,
        campaign_id: campaignId,
        start_date: startDate, 
        end_date: endDate 
    }, headers);
}