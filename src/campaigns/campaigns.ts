import { type RequestHeaders, BaseURL, checkEnvApiKeys } from "../defaults";

const campaignEndpoint = (orgid: string) => `${BaseURL}${orgid}/campaigns`;

const appKey = process.env.APP_API_TOKEN!;
const userKey = process.env.USER_API_KEY!;

const headers = {
    "X-App-Key": appKey,
    "X-User-Key": userKey,
    "Content-Type": "application/json",
} as const;
type Budget_Plan = {
    id: number,
    start_date: string,
    end_date: string,
    total_budget: number,
    adjusted_budget: number,
    spent_budget: number,
    available_rollover: boolean,
    resource: string
}

type Budget_Plan_Request = {
    start_date?: string,
    end_date?: string,
    total_budget?: number,
    total_impressions?: number

}
export type CampaignRequest = {
    /** The name of the campaign. */
    name: string;
    /** The type of the campaign: 1 (Search), 2 (Contextual), 3 (Site Retargeting), 4 (IP Targeting), 5 (Geo Optimized). */
    campaign_type_id: 1 | 2 | 3 | 4 | 5;
    /** The start date of the campaign. */
    start_date: string;
    /** The end date of the campaign. */
    end_date: string;
    /** The ID of the bid type. */
    bid_type_id?: number;
    /** The bid amount. */
    bid?: number;
    /** The daily budget for the campaign. */
    daily_budget?: number;
    /** The total budget for the campaign. */
    total_budget?: number;
    /** The impression cap for the campaign. */
    impression_cap?: number;
    /** The pacing value. */
    pacing?: number;
    /** Indicates if automated pacing is enabled. */
    automated_pacing_enabled?: boolean;
    /** The viewability setting (optional). */
    viewability?: "Good" | "Better" | "Best" | null;
    /** Frequency capping settings (optional). */
    frequency_capping?: {
        /** Number of times to show an ad. */
        how_many_times: number;
        /** Time frame for frequency capping. */
        hours: number;
    };
    /** The OBA provider ID. */
    oba_provider_id?: number;
    /** The media type ID. */
    media_type_id?: number;
    /** Segment match type (optional). */
    segment_match_type?: "all" | "any";
    /** Indicates if auto optimization is enabled. */
    auto_optimize?: boolean;
    /** Click attribution window. */
    click_attribution_window?: number;
    /** View attribution window. */
    view_attribution_window?: number;
    /** Indicates if organization blocklist opt-out is enabled. */
    org_blocklist_opt_out?: boolean;
    /** The ID of the ad placement. */
    ad_placement_id?: number;
    /** Week dayparting settings (optional). */
    week_dayparting?: number[][];
    /** Postal code settings (optional). */
    postal_codes?: {
        /** The postal code. */
        postal_code: string;
        /** The country code. */
        country_code: string;
    }[];
    /** List of geo targets (optional). */
    geo_targets?: string[];
    /** List of third-party segments (optional). */
    third_party_segments?: number[];
    /** List of first-party segments (optional). */
    first_party_segments?: number[];
    /** List of deals (optional). */
    deals?: number[];
    /** Campaign goal settings (optional). */
    campaign_goal?: {
        /** Type of campaign goal. */
        goal_type: string;
        /** Value of the campaign goal. */
        goal_value: number;
    };
};
export type CampaignResult = {
    /** The API resource type */
    resource: string;
    /** Campaign ID */
    id: number;
    /** Campaign name */
    name: string;
    /** Custom identifier for the campaign */
    custom_id: string | null;
    /** Current win rate of the campaign */
    current_win_rate: number;
    /** Daily budget for the campaign */
    daily_budget: number;
    /** Indicates if daily budget should be automatically adjusted */
    auto_adjust_daily_budget: boolean;
    /** Monthly budget for the campaign, if applicable */
    monthly_budget: number | null;
    /** Total budget allocated for the campaign */
    total_budget: number;
    /** Campaign status */
    status: "Draft" | "Pending" | "Active" | "Paused" | "Ended" | "Suspended";
    /** Cap on total impressions for the campaign */
    impression_cap: number | null;
    /** Cap on daily impressions */
    daily_impression_cap: number | null;
    /** Cap on monthly impressions */
    monthly_impression_cap: number | null;
    /** Indicates if daily impression cap should be automatically adjusted */
    auto_adjust_daily_impression_cap: boolean;
    /** Pacing value for the campaign */
    pacing: number;
    /** Indicates if automated pacing is enabled */
    automated_pacing_enabled: boolean;
    /** ID of the media type used in the campaign */
    media_type_id: number;
    /** Type of segment matching used */
    segment_match_type: string;
    /** Indicates if auto-optimization is enabled */
    auto_optimize: boolean;
    /** Window for click attribution in days */
    click_attribution_window: number;
    /** Window for view attribution in days */
    view_attribution_window: number;
    /** Indicates if organization blocklist opt-out is enabled */
    org_blocklist_opt_out: boolean;
    /** Start date for the campaign */
    start_date: string;
    /** End date for the campaign, if set */
    end_date: string | null;
    /** Bid amount for the campaign */
    bid: number;
    /** Bid type information */
    bid_type: {
        id: number;
        name: string;
    };
    /** Viewability setting for the campaign */
    viewability: string;
    /** Week dayparting settings */
    week_dayparting: number[][];
    /** Frequency capping settings */
    frequency_capping: {
        /** Number of times to show an ad */
        how_many_times: number;
        /** Time frame for frequency capping in hours */
        hours: number;
    };
    /** Campaign type information */
    campaign_type: {
        /** Campaign type ID (1: Search, 2: Contextual, 3: Site Retargeting, 4: IP Targeting, 5: Geo Optimized) */
        id: number;
        /** Name of the campaign type */
        name: string;
    };
    /** Campaign goal settings */
    campaign_goal: {
        /** Type of campaign goal */
        goal_type: string;
        /** Value of the campaign goal */
        goal_value: number;
        /** Cost per acquisition view-through percentage */
        cpa_view_thru_per: number;
        /** Cost per acquisition click-through percentage */
        cpa_click_thru_per: number;
    };
    /** OBA (Online Behavioral Advertising) provider information */
    oba_provider: {
        id: number;
        name: string;
    };
    /** Available actions for the campaign */
    actions: {
        activate?: {
            href: string;
            method: string;
        };
        copy?: {
            href: string;
            method: string;
        };
    }[];
    /** Associated resources for the campaign */
    resources: {
        [key: string]: string;
    }[];
}
/**
 * Represents a campaign object.
 */
export type Campaign = {
    /** Campaign ID */
    id?: number;
    /** Campaign name */
    name: string;
    /**Campaign Status */
    status: "Draft" | "Pending" | "Active" | "Paused" | "Ended" | "Suspended";
    /** Start date for the campaign */
    start_date: string;
    /** End date for the campaign */
    end_date: string;
    /** Budget allocated for the campaign */
    budget: number;
    /** Campaign type (1: Search, 2: Contextual, 3: Site Retargeting, 4: IP Targeting, 5: Geo Optimized) */
    campaign_type_id: 1 | 2 | 3 | 4 | 5;
    /** List of targeting options for the campaign */
    targeting_options?: string[];
    /** Bid strategy for the campaign */
    bid_strategy?: string;
    /** Daily budget for the campaign */
    daily_budget?: number;
    /** Ad schedule for the campaign */
    ad_schedule?: {
        start_time: string;
        end_time: string;
        days: string[];
    }[];
    /** Geographic targeting settings for the campaign */
    geo_targets?: {
        geo_target_id: number;
        radius: number;
    }[];
    /** Language targeting for the campaign */
    language_targets?: string[];
    /** Other campaign-specific properties */
    // Add more properties as needed
}

export type Coordinates = number[][];
/**
 * Geo Fence object.
 */
export type GeoFence = {
    name: string; // Required
    bid_area: {
        type: 'Polygon'; // Fixed value
        coordinates: number[][]; // Always in the format of number[][]
    };
    geo_fencing_recency_id?: number; // Optional
};
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

async function listCampaigns(orgid: string, params?: ListCampaignsParams, debug?: boolean, headers?: RequestHeaders): Promise<CampaignResponse> {
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
        headers: checkEnvApiKeys() || headers
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to retrieve campaign list', { cause: responseText });
    }
    return response.json() as Promise<CampaignResponse>;
}

async function createDraftCampaign(orgid: string, debug?: boolean, headers?: RequestHeaders): Promise<CampaignResponse> {
    const response = await fetch(`${campaignEndpoint(orgid)}`, {
        method: 'POST',
        headers: checkEnvApiKeys() || headers,
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

async function getCampaignById(campaignId: number, orgid: string, debug?: boolean, headers?: RequestHeaders): Promise<Campaign | null> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}`, {
        method: "GET",
        headers: checkEnvApiKeys() || headers
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

async function updateCampaign(campaignId: number, campaignData: Partial<CampaignRequest>, orgid: string, debug?: boolean, headers?: RequestHeaders): Promise<Campaign | null> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}`, {
        method: 'PUT',
        headers: checkEnvApiKeys() || headers,
        body: JSON.stringify({ campaign: campaignData }),
    });
    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to update campaign', { cause: responseText });
    }
    const data = await response.json() as unknown as Promise<Campaign>;
    return data;
}

async function createCampaign(campaignData: CampaignRequest, orgid: string, debug?: boolean, headers?: RequestHeaders): Promise<{ campaign: Campaign, success: boolean }> {
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

async function deleteCampaign(campaignId: number, orgid: string, debug?: boolean, headers?: RequestHeaders): Promise<boolean> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}`, {
        method: 'DELETE',
        headers: checkEnvApiKeys() || headers
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

async function getCampaignBudgetPlan(campaignId: number, debug?: boolean, headers?: RequestHeaders): Promise<{ budget_plans: Array<Budget_Plan> }> {
    const endpoint = `https://app.simpli.fi/api/campaigns/${campaignId}/budget_plans`;
    const response = await fetch(endpoint, {
        method: "GET",
        headers: checkEnvApiKeys() || headers
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to retrieve budget plans', { cause: responseText });
    }
    return response.json() as Promise<{ budget_plans: Array<Budget_Plan> }>;

}

async function updateBudgetPlan(id: number, plan: Budget_Plan_Request, debug?: boolean, headers?: RequestHeaders) {
    const endpoint = `https://app.simpli.fi/api/budget_plans/${id}`;

    const response = await fetch(endpoint, {
        method: "PUT",
        headers: checkEnvApiKeys() || headers,
        body: JSON.stringify(plan)
    });
    if (!response.ok) {
        const cause = await response.text()
        throw new Error('Failed to update budget plan', { cause });
    }

    return response.json();
}

async function activateCampaign(campaignId: number, orgid: string, debug?: boolean, headers?: RequestHeaders): Promise<void> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}/activate`, {
        method: 'POST',
        headers: checkEnvApiKeys() || headers
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to activate campaign', { cause: responseText });
    }
}

async function pauseCampaign(campaignId: number, orgid: string, debug?: boolean, headers?: RequestHeaders): Promise<void> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}/pause`, {
        method: 'POST',
        headers: checkEnvApiKeys() || headers
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to pause campaign', { cause: responseText });
    }
}

async function endCampaign(campaignId: number, orgid: string, debug?: boolean, headers?: RequestHeaders): Promise<void> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}/end`, {
        method: 'POST',
        headers: checkEnvApiKeys() || headers
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to end campaign', { cause: responseText });
    }
}
async function copyCampaign(campaignId: number, orgid: string, debug?: boolean, headers?: RequestHeaders): Promise<CampaignResponse> {
    const response = await fetch(`${campaignEndpoint(orgid)}/${campaignId}/copy`, {
        method: 'POST',
        headers: checkEnvApiKeys() || headers
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Failed to copy campaign', { cause: responseText });
    }
    return response.json() as Promise<CampaignResponse>;
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
