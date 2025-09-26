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
    geo_fence_type_name?: 'Target' | 'Conversion';
}

export interface GeoConversionZone extends GeoFence {
    geo_fence_type_name: 'Conversion';
    attribution_window_days: number;
    store_address?: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
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
    geo_fence_type_name?: 'Target' | 'Conversion';
    attribution_window_days?: number;
    store_address?: string;
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

// Geo-conversion zone methods
export async function addConversionZones(orgid: string, campaignId: string, conversionZones: GeoFenceParams[], headers?: RequestHeaders): Promise<GeoConversionZone[]> {
    const response = await fetch(`${geofenceEndpoint(orgid, campaignId)}`, {
        method: "POST",
        headers: checkEnvApiKeys() || headers,
        body: JSON.stringify({ 
            geo_fences: conversionZones,
            geo_fencing_update_type: "Conversion"
        })
    });
    if (!response.ok) {
        throw new Error('Failed to add conversion zones', { cause: await response.text() });
    }
    return response.json() as Promise<GeoConversionZone[]>;
}

export async function getConversionZones(orgid: string, campaignId: string, headers?: RequestHeaders): Promise<GeoConversionZone[]> {
    const response = await fetch(`${geofenceEndpoint(orgid, campaignId)}`, {
        method: "GET",
        headers: checkEnvApiKeys() || headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve conversion zones', { cause: await response.text() });
    }
    const allZones = await response.json() as Promise<GeoFence[]>;
    return (await allZones).filter(zone => zone.geo_fence_type_name === 'Conversion') as GeoConversionZone[];
}

export async function updateConversionZone(orgid: string, campaignId: string, zoneId: number, updates: Partial<GeoFenceParams>, headers?: RequestHeaders): Promise<GeoConversionZone> {
    const response = await fetch(`${geofenceEndpoint(orgid, campaignId)}/${zoneId}`, {
        method: "PUT",
        headers: checkEnvApiKeys() || headers,
        body: JSON.stringify({ 
            geo_fence: updates,
            geo_fencing_update_type: "Conversion"
        })
    });
    if (!response.ok) {
        throw new Error('Failed to update conversion zone', { cause: await response.text() });
    }
    return response.json() as Promise<GeoConversionZone>;
}

export async function deleteConversionZone(orgid: string, campaignId: string, zoneId: number, headers?: RequestHeaders): Promise<void> {
    const response = await fetch(`${geofenceEndpoint(orgid, campaignId)}/${zoneId}`, {
        method: "DELETE",
        headers: checkEnvApiKeys() || headers
    });
    if (!response.ok) {
        throw new Error('Failed to delete conversion zone', { cause: await response.text() });
    }
}
