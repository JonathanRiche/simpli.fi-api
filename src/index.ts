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
    type CampaignResponse,
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
import {
    type EventTarget,
    type EventTargetResponse,
    type EventTargetCreateParams,
    type EventTargetUpdateParams,
    type EventTargetUpdateMethod,
    listEventTargets,
    getEventTarget,
    createEventTarget,
    updateEventTarget,
    deleteEventTarget
} from "./events/event_targets";
import { 
    type GeoTarget,
    type GeoTargetQueryParams,
    type GeoTargetResponse,
    type RadiusGeoTargetParams,
    getTopLevelGeoTargets,
    queryGeoTargets,
    getCampaignGeoTargets,
    addGeoTargetsToCampaign,
    queryGeoTargetsByRadius
} from "./geo/geotarget";
import { addGeoFences, getGeoFences, deleteGeoFence, updateGeoFence, replaceGeoFences, type GeoFenceParams, type GeoFence } from "./geo/geofence.ts";

import { LandUse, getAllLandUses, getSingleLandUse } from "./geo/landuses";
import {
    type BudgetPlan,
    type BudgetPlanRequest,
    type BudgetPlanResponse,
    type CampaignWithAvailableRollover,
    type CampaignsWithRolloverResponse,
    listBudgetPlans,
    getBudgetPlan,
    createBudgetPlan,
    updateBudgetPlan,
    deleteBudgetPlan,
    rolloverBudgetPlanNext,
    rolloverBudgetPlanEven,
    rolloverBudgetPlanNew,
    getCampaignsWithAvailableRollover,
    rolloverCampaignNext,
    rolloverCampaignEven
} from "./budget-plans/budget-plans";
import {
    type CampaignStat,
    type CampaignStatsResponse,
    type CampaignStatsParams,
    getCampaignStats,
    getAllCampaignStats,
    getCampaignStatsByCampaign,
    getCampaignStatsByAd,
    getSpecificCampaignStats,
    getDailyCampaignStats,
    getComprehensiveCampaignStats
} from "./campaign-stats/campaign-stats";
import type { BunFile } from "bun";
import { RequestHeaders } from "./defaults.ts";

const defaultApiConfigErrorMessage = 'Please ensure to set your app and user API keys via the config method or in a .env file';

export type Config = { appApiKey?: string; userApiKey?: string; orgId?: string, debug?: boolean };


export class SimplifiClient {
    /** The app api key availble in the Simpli app */
    private appApiKey: string;
    /** The user api key availble in the Simpli app */
    private userApiKey: string;
    /** Set this if you want this to be the default orgId for all methods */
    private orgId: string | null = null;
    /** Enable debug mode to view urls and configs*/
    private debug: boolean = false;

    private headers: RequestHeaders;

    constructor(config: Config) {
        this.appApiKey = config.appApiKey || process.env.APP_API_TOKEN || "";
        this.userApiKey = config.userApiKey || process.env.USER_API_KEY || "";
        this.orgId = config.orgId || null;
        this.debug = config.debug || false;

        if (!this.appApiKey || !this.userApiKey) {
            console.warn("API keys not set. Please set your app and user API keys via the config method or in a .env file");
        }
        this.headers = {
            "X-App-Key": this.appApiKey,
            "X-User-Key": this.userApiKey,
            "Content-Type": "application/json"
        };
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
        return createCampaign(params.campaignData, validOrgId, this.debug, this.headers);
    }

    public async deleteCampaign(params: { campaignId: number; orgId?: string }): Promise<boolean> {
        const validOrgId = this.validateConfig(params.orgId);
        return deleteCampaign(params.campaignId, validOrgId, this.debug, this.headers);
    }

    public async getCampaignById(params: { campaignId: number; orgId?: string }): Promise<Campaign | null> {
        const validOrgId = this.validateConfig(params.orgId);
        return getCampaignById(params.campaignId, validOrgId, this.debug, this.headers);
    }

    public async listCampaigns(params?: { listParams?: ListCampaignsParams; orgId?: string }): Promise<CampaignResponse> {
        const validOrgId = this.validateConfig(params?.orgId);
        return listCampaigns(validOrgId, params?.listParams, this.debug, this.headers);
    }

    public async updateCampaign(params: { campaignId: number; campaignData: Partial<CampaignRequest>; orgId?: string }): Promise<Campaign | null> {
        const validOrgId = this.validateConfig(params.orgId);
        return updateCampaign(params.campaignId, params.campaignData, validOrgId, this.debug, this.headers);
    }

    public async activateCampaign(params: { campaignId: number; orgId?: string }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return activateCampaign(params.campaignId, validOrgId, this.debug, this.headers);
    }

    public async pauseCampaign(params: { campaignId: number; orgId?: string }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return pauseCampaign(params.campaignId, validOrgId, this.debug, this.headers);
    }

    public async endCampaign(params: { campaignId: number; orgId?: string }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return endCampaign(params.campaignId, validOrgId, this.debug, this.headers);
    }

    public async copyCampaign(params: { campaignId: number; newCampaignData?: Partial<CampaignRequest>; orgId?: string }): Promise<CampaignResponse> {
        const validOrgId = this.validateConfig(params.orgId);
        return copyCampaign(params.campaignId, validOrgId, this.debug, this.headers);
    }

    public async listAds(params: { orgId?: string; campaignId?: number; filter?: string; include?: string; allow_deleted?: boolean; attributes_only?: boolean }): Promise<Ad[]> {
        const validOrgId = this.validateConfig(params.orgId);
        if (!params.campaignId) {
            throw new Error('Please provide a campaign ID');
        }
        return listAds(validOrgId, params.campaignId.toString(), params, this.headers);
    }

    public async createHTMLAd(params: { orgId?: string; campaignId: number; ad: HtmlAd }): Promise<Ad> {
        const validOrgId = this.validateConfig(params.orgId);
        return createAd(validOrgId, params.campaignId.toString(), params.ad, this.headers);
    }

    public async updateAd(params: { orgId?: string; campaignId: number; adId: number; ad: AdUpdateParams }): Promise<Ad> {
        const validOrgId = this.validateConfig(params.orgId);
        return updateAd(validOrgId, params.campaignId.toString(), params.adId, params.ad, this.headers);
    }

    public async pauseAd(params: { orgId?: string; campaignId: number; adId: number }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return pauseAd(validOrgId, params.campaignId.toString(), params.adId, this.headers);
    }

    public async verifyClickTag(params: { orgId?: string; campaignId: number; adId: number }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return verifyClickTag(validOrgId, params.campaignId.toString(), params.adId, this.headers);
    }

    public async getBulkAds(params: { orgId?: string; campaignId: number; adIds: number[]; previewOnly?: boolean }): Promise<BulkAdsResponse> {
        return getBulkAds(params.adIds, params.previewOnly, this.headers);
    }

    public async createAdWithFile(params: {
        orgId?: string; campaignId: number; ad: AdCreateParams; file: File | Blob | BunFile, debug?: boolean
    }): Promise<Ad> {
        const validOrgId = this.validateConfig(params.orgId);
        return createAdWithFile(validOrgId, params.campaignId.toString(), params.ad, params.file, params.debug, this.headers);
    }


    public async getGeoFences(params: { orgId?: string; campaignId: number }): Promise<GeoFence[]> {
        const validOrgId = this.validateConfig(params.orgId);
        return getGeoFences(validOrgId, params.campaignId.toString(), this.headers);
    }
    public async addGeoFences(params: { orgId?: string; campaignId: number; geoFences: GeoFenceParams[] }): Promise<GeoFence[]> {
        const validOrgId = this.validateConfig(params.orgId);
        return addGeoFences(validOrgId, params.campaignId.toString(), params.geoFences, this.headers);
    }
    public async deleteGeoFence(params: { orgId?: string; campaignId: number; geoFenceId: number }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return deleteGeoFence(validOrgId, params.campaignId.toString(), params.geoFenceId, this.headers);
    }
    public async updateGeoFence(params: { orgId?: string; campaignId: number; geoFenceId: number; geoFence: GeoFenceParams }): Promise<GeoFence> {
        const validOrgId = this.validateConfig(params.orgId);
        return updateGeoFence(validOrgId, params.campaignId.toString(), params.geoFenceId, params.geoFence, this.headers);
    }
    public async replaceGeoFences(params: { orgId?: string; campaignId: number; geoFences: GeoFenceParams[] }): Promise<GeoFence[]> {
        const validOrgId = this.validateConfig(params.orgId);
        return replaceGeoFences(validOrgId, params.campaignId.toString(), params.geoFences, this.headers);
    }

    public async getAllLandUses(params: { orgId?: string }): Promise<LandUse[]> {
        return getAllLandUses(this.headers);
    }
    public async getSingleLandUse(params: { orgId?: string; landUseId: number }): Promise<LandUse> {
        return getSingleLandUse(params.landUseId, this.headers);
    }

    public async listEventTargets(params: { orgId?: string }): Promise<EventTargetResponse> {
        const validOrgId = this.validateConfig(params.orgId);
        return listEventTargets(validOrgId, this.headers);
    }

    public async getEventTarget(params: { eventId: number }): Promise<EventTarget> {
        return getEventTarget(params.eventId, this.headers);
    }

    public async createEventTarget(params: { orgId?: string; eventData: EventTargetCreateParams }): Promise<EventTarget> {
        const validOrgId = this.validateConfig(params.orgId);
        return createEventTarget(validOrgId, params.eventData, this.headers);
    }

    public async updateEventTarget(params: { eventId: number; eventData: EventTargetUpdateParams; method?: EventTargetUpdateMethod }): Promise<EventTarget> {
        return updateEventTarget(params.eventId, params.eventData, params.method, this.headers);
    }

    public async deleteEventTarget(params: { eventId: number }): Promise<void> {
        return deleteEventTarget(params.eventId, this.headers);
    }

    // Budget Plans methods
    public async listBudgetPlans(params: { campaignId: number }): Promise<BudgetPlanResponse> {
        return listBudgetPlans(params.campaignId, this.headers);
    }

    public async getBudgetPlan(params: { budgetPlanId: number }): Promise<BudgetPlanResponse> {
        return getBudgetPlan(params.budgetPlanId, this.headers);
    }

    public async createBudgetPlan(params: { campaignId: number; budgetPlan: BudgetPlanRequest }): Promise<BudgetPlanResponse> {
        return createBudgetPlan(params.campaignId, params.budgetPlan, this.headers);
    }

    public async updateBudgetPlan(params: { budgetPlanId: number; budgetPlan: Partial<BudgetPlanRequest> }): Promise<BudgetPlanResponse> {
        return updateBudgetPlan(params.budgetPlanId, params.budgetPlan, this.headers);
    }

    public async deleteBudgetPlan(params: { budgetPlanId: number }): Promise<void> {
        return deleteBudgetPlan(params.budgetPlanId, this.headers);
    }

    public async rolloverBudgetPlanNext(params: { budgetPlanId: number }): Promise<BudgetPlanResponse> {
        return rolloverBudgetPlanNext(params.budgetPlanId, this.headers);
    }

    public async rolloverBudgetPlanEven(params: { budgetPlanId: number }): Promise<BudgetPlanResponse> {
        return rolloverBudgetPlanEven(params.budgetPlanId, this.headers);
    }

    public async rolloverBudgetPlanNew(params: { budgetPlanId: number }): Promise<BudgetPlanResponse> {
        return rolloverBudgetPlanNew(params.budgetPlanId, this.headers);
    }

    public async getCampaignsWithAvailableRollover(params: { orgId?: string; includeChildren?: boolean }): Promise<CampaignsWithRolloverResponse> {
        const validOrgId = this.validateConfig(params.orgId);
        return getCampaignsWithAvailableRollover(validOrgId, params.includeChildren, this.headers);
    }

    public async rolloverCampaignNext(params: { campaignId: number }): Promise<BudgetPlanResponse> {
        return rolloverCampaignNext(params.campaignId, this.headers);
    }

    public async rolloverCampaignEven(params: { campaignId: number }): Promise<BudgetPlanResponse> {
        return rolloverCampaignEven(params.campaignId, this.headers);
    }

    // Campaign Stats methods
    public async getCampaignStats(params: { orgId?: string; statsParams?: CampaignStatsParams }): Promise<CampaignStatsResponse> {
        const validOrgId = this.validateConfig(params.orgId);
        return getCampaignStats(validOrgId, params.statsParams, this.headers);
    }

    public async getAllCampaignStats(params: { orgId?: string; startDate?: string; endDate?: string }): Promise<CampaignStatsResponse> {
        const validOrgId = this.validateConfig(params.orgId);
        return getAllCampaignStats(validOrgId, params.startDate, params.endDate, this.headers);
    }

    public async getCampaignStatsByCampaign(params: { orgId?: string; startDate?: string; endDate?: string }): Promise<CampaignStatsResponse> {
        const validOrgId = this.validateConfig(params.orgId);
        return getCampaignStatsByCampaign(validOrgId, params.startDate, params.endDate, this.headers);
    }

    public async getCampaignStatsByAd(params: { orgId?: string; startDate?: string; endDate?: string }): Promise<CampaignStatsResponse> {
        const validOrgId = this.validateConfig(params.orgId);
        return getCampaignStatsByAd(validOrgId, params.startDate, params.endDate, this.headers);
    }

    public async getSpecificCampaignStats(params: { orgId?: string; campaignId: number; startDate?: string; endDate?: string }): Promise<CampaignStatsResponse> {
        const validOrgId = this.validateConfig(params.orgId);
        return getSpecificCampaignStats(validOrgId, params.campaignId, params.startDate, params.endDate, this.headers);
    }

    public async getDailyCampaignStats(params: { orgId?: string; startDate?: string; endDate?: string }): Promise<CampaignStatsResponse> {
        const validOrgId = this.validateConfig(params.orgId);
        return getDailyCampaignStats(validOrgId, params.startDate, params.endDate, this.headers);
    }

    public async getComprehensiveCampaignStats(params: { orgId?: string; campaignId?: number; startDate?: string; endDate?: string }): Promise<CampaignStatsResponse> {
        const validOrgId = this.validateConfig(params.orgId);
        return getComprehensiveCampaignStats(validOrgId, params.campaignId, params.startDate, params.endDate, this.headers);
    }

    public async getTopLevelGeoTargets(): Promise<GeoTarget[]> {
        return getTopLevelGeoTargets(this.headers);
    }

    public async queryGeoTargets(params: GeoTargetQueryParams): Promise<GeoTarget[]> {
        return queryGeoTargets(params, this.headers);
    }

    public async getCampaignGeoTargets(params: { orgId?: string; campaignId: number }): Promise<GeoTarget[]> {
        const validOrgId = this.validateConfig(params.orgId);
        return getCampaignGeoTargets(validOrgId, params.campaignId.toString(), this.headers);
    }

    public async addGeoTargetsToCampaign(params: { campaignId: number; metroCodes: string[] }): Promise<GeoTarget[]> {
        return addGeoTargetsToCampaign(params.campaignId.toString(), params.metroCodes, this.headers);
    }

    public async queryGeoTargetsByRadius(params: RadiusGeoTargetParams): Promise<GeoTarget[]> {
        return queryGeoTargetsByRadius(params, this.headers);
    }
}

// Export types for external use
export type {
    Campaign,
    CampaignRequest,
    CampaignResponse,
    ListCampaignsParams,
    Ad,
    AdCreateParams,
    AdUpdateParams,
    BulkAdsResponse,
    HtmlAd,
    GeoFence,
    GeoFenceParams,
    GeoTarget,
    GeoTargetQueryParams,
    GeoTargetResponse,
    RadiusGeoTargetParams,
    LandUse,
    BudgetPlan,
    BudgetPlanRequest,
    BudgetPlanResponse,
    CampaignWithAvailableRollover,
    CampaignsWithRolloverResponse,
    CampaignStat,
    CampaignStatsResponse,
    CampaignStatsParams,
    EventTarget,
    EventTargetResponse,
    EventTargetCreateParams,
    EventTargetUpdateParams,
    EventTargetUpdateMethod
};
