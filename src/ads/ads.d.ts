/// <reference types="bun-types" />
interface AdCreateParams {
    name: string;
    ad_file_type_id: string | number;
    ad_size_id: string | number;
    target_url: string;
}
interface AdUpdateParams {
    name?: string;
    pacing?: number;
    target_url?: string;
}
interface ListAdsParams {
    filter?: string;
    include?: string;
    allow_deleted?: boolean;
    attributes_only?: boolean;
}
export declare function getAdFileTypes(): Promise<Record<string, string>>;
export declare function listAds(orgid: string, campaignId: string, params?: ListAdsParams): Promise<Ad[]>;
export declare function createAd(orgid: string, campaignId: string, ad: AdCreateParams): Promise<Ad>;
export declare function updateAd(orgid: string, campaignId: string, adId: number, ad: AdUpdateParams): Promise<Ad>;
export declare function pauseAd(orgid: string, campaignId: string, adId: number): Promise<void>;
export declare function verifyClickTag(orgid: string, campaignId: string, adId: number): Promise<void>;
interface BulkAdsResponse {
    ads: Ad[];
    not_valid_ad_ids: number[];
    not_permitted_ad_ids: number[];
}
export declare function getBulkAds(adIds: number[], previewOnly?: boolean): Promise<BulkAdsResponse>;
export declare function createAdWithFile(orgid: string, campaignId: string, ad: AdCreateParams, file: File): Promise<Ad>;
export {};
