import { BaseURL } from "../defaults";

const adEndpoint = (orgid: string, campaignId: string) => `${BaseURL}${orgid}/campaigns/${campaignId}/ads`;


//?add to a class or object that inherits via a config method
const appKey = process.env.APP_API_TOKEN;
const userKey = process.env.USER_API_KEY;

//?add to a class or object that inherits via a config method
const headers = {
    "X-App-Key": appKey ?? "",
    "X-User-Key": userKey ?? "",
    "Content-Type": "application/json",
};
export type Ad = {
    resource: string;
    id: number;
    name: string;
    status: 'Active' | 'Paused' | 'Deleted'; // Possible statuses
    pacing: number;
    creative_group_id: number | null;
    click_tag_verified: boolean | null;
    preview_tag: string;
    target_url: string;
    primary_creative: string;
    primary_creative_url: string;
    dynamic_ad_feed_id: number | null;
    feed_filter_id: number | null;
    extra_html: string | null;
    actions: {
        pause: {
            href: string;
            method: 'POST';
        };
        verify_click_tag: {
            href: string;
            method: 'POST';
        };
    }[];
    resources: {
        ad_file_types: string;
    }[];
}
type AdFileTypeName =
    | "Image"
    | "Flash"
    | "HTML"
    | "Facebook"
    | "Video"
    | "Click-To-Call"
    | "Third Party Video"
    | "HTML5"
    | "Native"
    | "Audio";

export type AdFileType = {
    resource: string;
    id: number;
    name: AdFileTypeName;
};
//multipart/form-data
//https://app.simpli.fi/api/ad_file_types
export interface AdCreateParams {
    name: string;
    alt_text: string;
    target_url: string;
    pacing: number;
    ad_file_type_id: number;
    ad_size_id: number;
}

export interface AdUpdateParams {
    name?: string;
    pacing?: number;
    target_url?: string;
    // Add other properties that can be updated
}

export interface ListAdsParams {
    filter?: string;
    include?: string;
    allow_deleted?: boolean;
    attributes_only?: boolean;
}

export async function getAdFileTypes(): Promise<Record<string, string>> {
    const response = await fetch(`https://app.simpli.fi/api/ad_file_types`, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve ad file types', { cause: await response.text() });
    }
    return response.json() as Promise<Record<string, string>>;
}

export async function listAds(orgid: string, campaignId: string, params?: ListAdsParams): Promise<Ad[]> {
    const queryParams = new URLSearchParams();
    if (params) {
        if (params.filter) queryParams.append('filter', params.filter);
        if (params.include) queryParams.append('include', params.include);
        if (params.allow_deleted) queryParams.append('allow_deleted', 'true');
        if (params.attributes_only) queryParams.append('attributes_only', 'true');
    }

    const url = `${adEndpoint(orgid, campaignId)}?${queryParams.toString()}`;
    const response = await fetch(url, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve campaign ads list', { cause: await response.text() });
    }
    return response.json() as Promise<Ad[]>;
}

export async function createAd(orgid: string, campaignId: string, ad: AdCreateParams): Promise<Ad> {
    const response = await fetch(`${adEndpoint(orgid, campaignId)}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ ad })
    });
    if (!response.ok) {
        const textResponse = await response.text();
        throw new Error('Failed to create ad', { cause: textResponse });
    }
    return response.json() as Promise<Ad>;
}

export async function updateAd(orgid: string, campaignId: string, adId: number, ad: AdUpdateParams): Promise<Ad> {
    const response = await fetch(`${adEndpoint(orgid, campaignId)}/${adId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ ad })
    });
    if (!response.ok) {
        const textResponse = await response.text();
        throw new Error('Failed to update ad', { cause: textResponse });
    }
    return response.json() as Promise<Ad>;
}

export async function pauseAd(orgid: string, campaignId: string, adId: number): Promise<void> {
    const response = await fetch(`${adEndpoint(orgid, campaignId)}/${adId}/pause`, {
        method: "POST",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to pause ad', { cause: await response.text() });
    }
}

export async function verifyClickTag(orgid: string, campaignId: string, adId: number): Promise<void> {
    const response = await fetch(`${adEndpoint(orgid, campaignId)}/${adId}/verify_click_tag`, {
        method: "POST",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to verify click tag', { cause: await response.text() });
    }
}

export interface BulkAdsResponse {
    ads: Ad[];
    not_valid_ad_ids: number[];
    not_permitted_ad_ids: number[];
}

export async function getBulkAds(adIds: number[], previewOnly: boolean = false): Promise<BulkAdsResponse> {
    const queryParams = new URLSearchParams({
        ids: adIds.join(','),
        preview_only: previewOnly.toString()
    });

    const response = await fetch(`${BaseURL}ads/bulk_ads?${queryParams.toString()}`, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve bulk ads', { cause: await response.text() });
    }
    return response.json() as Promise<BulkAdsResponse>;
}

export async function createAdWithFile(orgid: string, campaignId: string, ad: AdCreateParams, file: File): Promise<Ad> {
    const formData = new FormData();
    Object.entries(ad).forEach(([key, value]) => {
        formData.append(`ad[${key}]`, value.toString());
    });
    formData.append('ad[primary_creative]', file);

    const response = await fetch(`${adEndpoint(orgid, campaignId)}`, {
        method: "POST",
        headers: {
            "X-App-Key": appKey ?? "",
            "X-User-Key": userKey ?? "",
            "Content-Type": `multipart/form-data`,
            // Don't set Content-Type header here, let the browser set it with the boundary
        },
        body: formData
    });
    if (!response.ok) {
        const textResponse = await response.text();
        throw new Error('Failed to create ad with file', { cause: textResponse });
    }
    return response.json() as Promise<Ad>;
}
