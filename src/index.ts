import {
    createCampaign,
    deleteCampaign,
    getCampaignById,
    listCampaigns,
    updateCampaign,
    type ListCampaignsParams,
    activateCampaign,
    pauseCampaign,
    endCampaign,
    copyCampaign,
    CampaignResponse,
    type campaignResponse,
    type CampaignRequest,
    type Campaign
} from "./campaigns/campaigns";
import {
    type Ad,
    type AdCreateParams,
    type AdUpdateParams,
    type BulkAdsResponse,
    type HtmlAd,
    listAds,
    createAd,
    updateAd,
    pauseAd,
    verifyClickTag,
    getBulkAds,
    createAdWithFile
} from "./ads/ads";
// import { get, getSingleGeoTarget } from "./geo/geotarget.ts";
import { addGeoFences, getGeoFences, deleteGeoFence, updateGeoFence, replaceGeoFences, type GeoFenceParams, type GeoFence } from "./geo/geofence.ts";

import { LandUse, getAllLandUses, getSingleLandUse } from "./geo/landuses";
import type { BunFile } from "bun";
const defaultApiConfigErrorMessage = 'Please ensure to set your app and user API keys via the config method or in a .env file';
type Config = { appApiKey?: string; userApiKey?: string; orgId?: string, debug?: boolean };

export class SimplifiClient {
    /** The app api key availble in the Simpli app */
    private appApiKey: string;
    /** The user api key availble in the Simpli app */
    private userApiKey: string;
    /** Set this if you want this to be the default orgId for all methods */
    private orgId: string | null = null;
    /** Enable debug mode to view urls and configs*/
    private debug: boolean = false;

    constructor(config: Config) {
        this.appApiKey = config.appApiKey || process.env.APP_API_TOKEN || "";
        this.userApiKey = config.userApiKey || process.env.USER_API_KEY || "";
        this.orgId = config.orgId || null;
        this.debug = config.debug || false;

        if (!this.appApiKey || !this.userApiKey) {
            console.warn("API keys not set. Please set your app and user API keys via the config method or in a .env file");
        }
    }

    public config(config: Config): void {
        this.appApiKey = config.appApiKey || this.appApiKey;
        this.userApiKey = config.userApiKey || this.userApiKey;
        this.orgId = config.orgId || this.orgId;
        this.debug = config.debug || this.debug;
    }

    private validateConfig(orgId?: string): string {
        if (!this.appApiKey || !this.userApiKey) {
            throw new Error(defaultApiConfigErrorMessage);
        }
        if (!this.orgId && !orgId) {
            throw new Error("Please provide an organization ID in the config method or in the method call");
        }
        const validOrgId = orgId || this.orgId;
        if (!validOrgId) {
            throw new Error("Please provide an organization ID in the config method or in the method call");
        }

        return validOrgId;
    }

    // Campaign methods
    public async createCampaign(params: { campaignData: CampaignRequest; orgId?: string }): Promise<{ campaign: Campaign, success: boolean }> {
        const validOrgId = this.validateConfig(params.orgId);
        return createCampaign(params.campaignData, validOrgId, this.debug);
    }

    public async deleteCampaign(params: { campaignId: number; orgId?: string }): Promise<boolean> {
        const validOrgId = this.validateConfig(params.orgId);
        return deleteCampaign(params.campaignId, validOrgId, this.debug);
    }

    public async getCampaignById(params: { campaignId: number; orgId?: string }): Promise<Campaign | null> {
        const validOrgId = this.validateConfig(params.orgId);
        return getCampaignById(params.campaignId, validOrgId, this.debug);
    }

    public async listCampaigns(params?: { listParams?: ListCampaignsParams; orgId?: string }): Promise<CampaignResponse> {
        const validOrgId = this.validateConfig(params?.orgId);
        return listCampaigns(validOrgId, params?.listParams, this.debug);
    }

    public async updateCampaign(params: { campaignId: number; campaignData: Partial<CampaignRequest>; orgId?: string }): Promise<Campaign | null> {
        const validOrgId = this.validateConfig(params.orgId);
        return updateCampaign(params.campaignId, params.campaignData, validOrgId, this.debug);
    }

    public async activateCampaign(params: { campaignId: number; orgId?: string }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return activateCampaign(params.campaignId, validOrgId, this.debug);
    }

    public async pauseCampaign(params: { campaignId: number; orgId?: string }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return pauseCampaign(params.campaignId, validOrgId, this.debug);
    }

    public async endCampaign(params: { campaignId: number; orgId?: string }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return endCampaign(params.campaignId, validOrgId, this.debug);
    }

    public async copyCampaign(params: { campaignId: number; newCampaignData?: Partial<CampaignRequest>; orgId?: string }): Promise<campaignResponse> {
        const validOrgId = this.validateConfig(params.orgId);
        return copyCampaign(params.campaignId, validOrgId, this.debug);
    }

    public async listAds(params: { orgId?: string; campaignId?: number; filter?: string; include?: string; allow_deleted?: boolean; attributes_only?: boolean }): Promise<Ad[]> {
        const validOrgId = this.validateConfig(params.orgId);
        if (!params.campaignId) {
            throw new Error('Please provide a campaign ID');
        }
        return listAds(validOrgId, params.campaignId.toString(), params);
    }

    public async createHTMLAd(params: { orgId?: string; campaignId: number; ad: HtmlAd }): Promise<Ad> {
        const validOrgId = this.validateConfig(params.orgId);
        return createAd(validOrgId, params.campaignId.toString(), params.ad);
    }

    public async updateAd(params: { orgId?: string; campaignId: number; adId: number; ad: AdUpdateParams }): Promise<Ad> {
        const validOrgId = this.validateConfig(params.orgId);
        return updateAd(validOrgId, params.campaignId.toString(), params.adId, params.ad);
    }

    public async pauseAd(params: { orgId?: string; campaignId: number; adId: number }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return pauseAd(validOrgId, params.campaignId.toString(), params.adId);
    }

    public async verifyClickTag(params: { orgId?: string; campaignId: number; adId: number }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return verifyClickTag(validOrgId, params.campaignId.toString(), params.adId);
    }

    public async getBulkAds(params: { orgId?: string; campaignId: number; adIds: number[]; previewOnly?: boolean }): Promise<BulkAdsResponse> {
        return getBulkAds(params.adIds, params.previewOnly);
    }

    public async createAdWithFile(params: {
        orgId?: string; campaignId: number; ad: AdCreateParams; file: File | Blob | BunFile, debug?: boolean
    }): Promise<Ad> {
        const validOrgId = this.validateConfig(params.orgId);
        return createAdWithFile(validOrgId, params.campaignId.toString(), params.ad, params.file, params.debug);
    }


    public async getGeoFences(params: { orgId?: string; campaignId: number }): Promise<GeoFence[]> {
        const validOrgId = this.validateConfig(params.orgId);
        return getGeoFences(validOrgId, params.campaignId.toString());
    }
    public async addGeoFences(params: { orgId?: string; campaignId: number; geoFences: GeoFenceParams[] }): Promise<GeoFence[]> {
        const validOrgId = this.validateConfig(params.orgId);
        return addGeoFences(validOrgId, params.campaignId.toString(), params.geoFences);
    }
    public async deleteGeoFence(params: { orgId?: string; campaignId: number; geoFenceId: number }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return deleteGeoFence(validOrgId, params.campaignId.toString(), params.geoFenceId);
    }
    public async updateGeoFence(params: { orgId?: string; campaignId: number; geoFenceId: number; geoFence: GeoFenceParams }): Promise<GeoFence> {
        const validOrgId = this.validateConfig(params.orgId);
        return updateGeoFence(validOrgId, params.campaignId.toString(), params.geoFenceId, params.geoFence);
    }
    public async replaceGeoFences(params: { orgId?: string; campaignId: number; geoFences: GeoFenceParams[] }): Promise<GeoFence[]> {
        const validOrgId = this.validateConfig(params.orgId);
        return replaceGeoFences(validOrgId, params.campaignId.toString(), params.geoFences);
    }

    public async getAllLandUses(params: { orgId?: string }): Promise<LandUse[]> {
        return getAllLandUses();
    }
    public async getSingleLandUse(params: { orgId?: string; landUseId: number }): Promise<LandUse> {
        return getSingleLandUse(params.landUseId);
    }


    // Add other methods for different API endpoints (e.g., ads, creative assets, etc.) here
}
