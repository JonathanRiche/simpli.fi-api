import { BaseURL, checkEnvApiKeys, type RequestHeaders } from "../defaults";

const attributionEndpoint = (orgid: string, campaignId: string) => `${BaseURL}${orgid}/campaigns/${campaignId}/store_visit_attribution`;
const metricsEndpoint = (orgid: string, campaignId: string) => `${BaseURL}${orgid}/campaigns/${campaignId}/store_conversion_metrics`;
const configEndpoint = (orgid: string, campaignId: string) => `${BaseURL}${orgid}/campaigns/${campaignId}/attribution_config`;

export interface StoreVisitAttribution {
    geo_fence_id: number;
    geo_fence_name: string;
    store_address?: string;
    total_visits: number;
    unique_visitors: number;
    attributed_visits: number;
    attribution_rate: number;
    average_visit_duration_minutes: number;
    visit_dates: string[];
}

export interface StoreVisitAttributionResponse {
    stores: StoreVisitAttribution[];
    total_attributed_visits: number;
    attribution_window_days: number;
    date_range: {
        start: string;
        end: string;
    };
}

export interface StoreConversionMetrics {
    store_id: number;
    store_name: string;
    campaign_id: number;
    total_visits: number;
    unique_visitors: number;
    attributed_visits: number;
    attribution_rate: number;
    average_visit_duration_minutes: number;
    conversion_value?: number;
    roi?: number;
}

export interface StoreAttributionConfig {
    view_attribution_window_days: number;
    click_attribution_window_days: number;
    store_visit_threshold_minutes: number;
    location_accuracy_meters: number;
    attribution_model: 'last_touch' | 'first_touch' | 'linear';
}

export interface StoreAttributionConfigParams {
    view_attribution_window_days?: number;
    click_attribution_window_days?: number;
    store_visit_threshold_minutes?: number;
    location_accuracy_meters?: number;
    attribution_model?: 'last_touch' | 'first_touch' | 'linear';
}

export async function getStoreVisitAttribution(
    orgid: string,
    campaignId: string,
    startDate: string,
    endDate: string,
    headers?: RequestHeaders
): Promise<StoreVisitAttributionResponse> {
    const response = await fetch(`${attributionEndpoint(orgid, campaignId)}?start_date=${startDate}&end_date=${endDate}`, {
        method: "GET",
        headers: checkEnvApiKeys() || headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve store visit attribution', { cause: await response.text() });
    }
    return response.json() as Promise<StoreVisitAttributionResponse>;
}

export async function getStoreConversionMetrics(
    orgid: string,
    campaignId: string,
    storeIds?: number[],
    headers?: RequestHeaders
): Promise<StoreConversionMetrics[]> {
    const url = storeIds && storeIds.length > 0 
        ? `${metricsEndpoint(orgid, campaignId)}?store_ids=${storeIds.join(',')}`
        : `${metricsEndpoint(orgid, campaignId)}`;
    
    const response = await fetch(url, {
        method: "GET",
        headers: checkEnvApiKeys() || headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve store conversion metrics', { cause: await response.text() });
    }
    return response.json() as Promise<StoreConversionMetrics[]>;
}

export async function setAttributionConfig(
    orgid: string,
    campaignId: string,
    config: StoreAttributionConfigParams,
    headers?: RequestHeaders
): Promise<StoreAttributionConfig> {
    const response = await fetch(`${configEndpoint(orgid, campaignId)}`, {
        method: "PUT",
        headers: checkEnvApiKeys() || headers,
        body: JSON.stringify({ attribution_config: config })
    });
    if (!response.ok) {
        throw new Error('Failed to set attribution config', { cause: await response.text() });
    }
    return response.json() as Promise<StoreAttributionConfig>;
}

export async function getAttributionConfig(
    orgid: string,
    campaignId: string,
    headers?: RequestHeaders
): Promise<StoreAttributionConfig> {
    const response = await fetch(`${configEndpoint(orgid, campaignId)}`, {
        method: "GET",
        headers: checkEnvApiKeys() || headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve attribution config', { cause: await response.text() });
    }
    return response.json() as Promise<StoreAttributionConfig>;
}