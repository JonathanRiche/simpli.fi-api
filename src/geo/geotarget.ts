import { BaseURL } from "../defaults";

const geotargetEndpoint = (orgid: string, campaignId?: string) =>
    campaignId
        ? `${BaseURL}${orgid}/campaigns/${campaignId}/geo_targets`
        : `${BaseURL}${orgid}/geo_targets`;

const appKey = process.env.APP_API_TOKEN;
const userKey = process.env.USER_API_KEY;

const headers = {
    "X-App-Key": appKey ?? "",
    "X-User-Key": userKey ?? "",
    "Content-Type": "application/json",
};

export interface GeoTarget {
    resource: string;
    id: number;
    name: string;
    parent_id: number | null;
    type: string;
    code: string;
    metro_code: string | null;
    state_code: string | null;
    country_code: string;
    path: string;
}

export interface GeoTargetQueryParams {
    name?: string;
    parent_id?: number;
    page?: number;
    per_page?: number;
}

export async function getTopLevelGeoTargets(orgid: string): Promise<GeoTarget[]> {
    const response = await fetch(`${geotargetEndpoint(orgid)}`, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve top-level geo targets', { cause: await response.text() });
    }
    return response.json() as Promise<GeoTarget[]>;
}

export async function queryGeoTargets(orgid: string, params: GeoTargetQueryParams): Promise<GeoTarget[]> {
    const queryParams = new URLSearchParams();
    if (params.name) queryParams.append('name', params.name);
    if (params.parent_id) queryParams.append('parent_id', params.parent_id.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.per_page) queryParams.append('per_page', params.per_page.toString());

    const url = `${geotargetEndpoint(orgid)}?${queryParams.toString()}`;
    const response = await fetch(url, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to query geo targets', { cause: await response.text() });
    }
    return response.json() as Promise<GeoTarget[]>;
}

export async function getCampaignGeoTargets(orgid: string, campaignId: string): Promise<GeoTarget[]> {
    const response = await fetch(`${geotargetEndpoint(orgid, campaignId)}`, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve campaign geo targets', { cause: await response.text() });
    }
    return response.json() as Promise<GeoTarget[]>;
}

export async function addGeoTargetsToCampaign(orgid: string, campaignId: string, metroCodes: string[]): Promise<void> {
    const response = await fetch(`${geotargetEndpoint(orgid, campaignId)}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ metro_codes: metroCodes })
    });
    if (!response.ok) {
        throw new Error('Failed to add geo targets to campaign', { cause: await response.text() });
    }
}

export interface RadiusGeoTargetParams {
    latitude: number;
    longitude: number;
    radius: number;
    radius_unit: 'mi' | 'km';
}

export async function queryGeoTargetsByRadius(orgid: string, params: RadiusGeoTargetParams): Promise<GeoTarget[]> {
    const queryParams = new URLSearchParams({
        latitude: params.latitude.toString(),
        longitude: params.longitude.toString(),
        radius: params.radius.toString(),
        radius_unit: params.radius_unit
    });

    const url = `${geotargetEndpoint(orgid)}/radius?${queryParams.toString()}`;
    const response = await fetch(url, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to query geo targets by radius', { cause: await response.text() });
    }
    return response.json() as Promise<GeoTarget[]>;
}
