import { BaseAPIURL, BaseURL, type RequestHeaders } from "../defaults";

export interface GeoTarget {
    resource: string;
    id: number;
    name: string;
    parent_id: number | null;
    active: boolean;
    resources: Array<{ geo_targets: string }>;
    metro_code_id?: number;
    updated_date?: string;
}

export interface GeoTargetQueryParams {
    name?: string;
    parent_id?: number;
    page?: number;
    per_page?: number;
}

export interface GeoTargetResponse {
    geo_targets: GeoTarget[];
}

export async function getTopLevelGeoTargets(headers: RequestHeaders): Promise<GeoTarget[]> {
    const response = await fetch(`${BaseAPIURL}geo_targets`, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve top-level geo targets', { cause: await response.text() });
    }
    const data = await response.json() as GeoTargetResponse;
    return data.geo_targets;
}

export async function queryGeoTargets(params: GeoTargetQueryParams, headers: RequestHeaders): Promise<GeoTarget[]> {
    const queryParams = new URLSearchParams();
    if (params.name) queryParams.append('name', params.name);
    if (params.parent_id) queryParams.append('parent_id', params.parent_id.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.per_page) queryParams.append('per_page', params.per_page.toString());

    const url = `${BaseAPIURL}geo_targets?${queryParams.toString()}`;
    const response = await fetch(url, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to query geo targets', { cause: await response.text() });
    }
    const data = await response.json() as GeoTargetResponse;
    return data.geo_targets;
}

export async function getCampaignGeoTargets(orgId: string, campaignId: string, headers: RequestHeaders): Promise<GeoTarget[]> {
    const response = await fetch(`${BaseAPIURL}organizations/${orgId}/campaigns/${campaignId}/geo_targets`, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve campaign geo targets', { cause: await response.text() });
    }
    const data = await response.json() as GeoTargetResponse;
    return data.geo_targets;
}

export async function addGeoTargetsToCampaign(campaignId: string, metroCodes: string[], headers: RequestHeaders): Promise<GeoTarget[]> {
    const response = await fetch(`${BaseAPIURL}campaigns/${campaignId}/geo_targets/add_by_metro_code`, {
        method: "POST",
        headers,
        body: JSON.stringify({ metro_codes: metroCodes })
    });
    if (!response.ok) {
        throw new Error('Failed to add geo targets to campaign', { cause: await response.text() });
    }
    const data = await response.json() as GeoTargetResponse;
    return data.geo_targets;
}

export interface RadiusGeoTargetParams {
    latitude: number;
    longitude: number;
    radius: number;
}

export async function queryGeoTargetsByRadius(params: RadiusGeoTargetParams, headers: RequestHeaders): Promise<GeoTarget[]> {
    const response = await fetch(`${BaseAPIURL}geo_targets/for_radius`, {
        method: "POST",
        headers,
        body: JSON.stringify(params)
    });
    if (!response.ok) {
        throw new Error('Failed to query geo targets by radius', { cause: await response.text() });
    }
    const data = await response.json() as GeoTargetResponse;
    return data.geo_targets;
}
