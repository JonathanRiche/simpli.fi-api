import { BaseURL, checkEnvApiKeys, type RequestHeaders } from "../defaults";

const geofenceEndpoint = (orgid: string, campaignId: string) => `${BaseURL}${orgid}/campaigns/${campaignId}/geo_fences`;

const appKey = process.env.APP_API_TOKEN;
const userKey = process.env.USER_API_KEY;

const headers = {
    "X-App-Key": appKey ?? "",
    "X-User-Key": userKey ?? "",
    "Content-Type": "application/json",
};

export interface GeoFence {
    resource: string;
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    radius: number;
    radius_unit: 'mi' | 'km';
}

export type Coordinate = [number, number];

// type Polygon = {
//     type: "Polygon";
//     coordinates: Coordinate[][];
// };


export type GeoFenceParams = {
    name: string;
    bid_area: {
        type: "Polygon" | "Conversion"
        coordinates: Coordinate[][];

    };
    geo_fence_source_id?: number;
    geo_fence_type_name: "Conversion" | "Target";
};

export interface GeoFenceCreateParams {
    name: string;
    latitude: number;
    longitude: number;
    radius: number;
    radius_unit: 'mi' | 'km';
}

export async function getGeoFences(orgid: string, campaignId: string, headers?: RequestHeaders): Promise<GeoFence[]> {
    const response = await fetch(`${geofenceEndpoint(orgid, campaignId)}`, {
        method: "GET",
        headers: checkEnvApiKeys() || headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve geo fences', { cause: await response.text() });
    }
    return response.json() as Promise<GeoFence[]>;
}

export async function addGeoFences(orgid: string, campaignId: string, geoFences: GeoFenceParams[], headers?: RequestHeaders): Promise<GeoFence[]> {
    const response = await fetch(`${geofenceEndpoint(orgid, campaignId)}`, {
        method: "POST",
        headers: checkEnvApiKeys() || headers,
        body: JSON.stringify({ geo_fences: geoFences })
    });
    if (!response.ok) {
        throw new Error('Failed to add geo fences', { cause: await response.text() });
    }
    return response.json() as Promise<GeoFence[]>;
}

export async function replaceGeoFences(orgid: string, campaignId: string, geoFences: GeoFenceParams[], headers?: RequestHeaders): Promise<GeoFence[]> {
    const response = await fetch(`${geofenceEndpoint(orgid, campaignId)}`, {
        method: "PUT",
        headers: checkEnvApiKeys() || headers,
        body: JSON.stringify({ geo_fences: geoFences })
    });
    if (!response.ok) {
        throw new Error('Failed to replace geo fences', { cause: await response.text() });
    }
    return response.json() as Promise<GeoFence[]>;
}

export async function updateGeoFence(orgid: string, campaignId: string, geoFenceId: number, updates: Partial<GeoFenceParams>, headers?: RequestHeaders): Promise<GeoFence> {
    const response = await fetch(`${geofenceEndpoint(orgid, campaignId)}/${geoFenceId}`, {
        method: "PUT",
        headers: checkEnvApiKeys() || headers,
        body: JSON.stringify({ geo_fence: updates })
    });
    if (!response.ok) {
        throw new Error('Failed to update geo fence', { cause: await response.text() });
    }
    return response.json() as Promise<GeoFence>;
}

export async function deleteGeoFence(orgid: string, campaignId: string, geoFenceId: number, headers?: RequestHeaders): Promise<void> {
    const response = await fetch(`${geofenceEndpoint(orgid, campaignId)}/${geoFenceId}`, {
        method: "DELETE",
        headers: checkEnvApiKeys() || headers
    });
    if (!response.ok) {
        throw new Error('Failed to delete geo fence', { cause: await response.text() });
    }
}

export async function deleteMultipleGeoFences(orgid: string, campaignId: string, geoFenceIds: number[], headers?: RequestHeaders): Promise<void> {
    const response = await fetch(`${geofenceEndpoint(orgid, campaignId)}`, {
        method: "DELETE",
        headers: checkEnvApiKeys() || headers,
        body: JSON.stringify({ geo_fence_ids: geoFenceIds })
    });
    if (!response.ok) {
        throw new Error('Failed to delete multiple geo fences', { cause: await response.text() });
    }
}
