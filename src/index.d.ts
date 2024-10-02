import { type ListCampaignsParams } from "./campaigns/campaigns";
type Config = {
    appApiKey?: string;
    userApiKey?: string;
    orgId?: string;
};
export declare class SimplifiClient {
    private appApiKey;
    private userApiKey;
    private orgId;
    constructor(config: Config);
    config(config: Config): void;
    private validateConfig;
    createCampaign(params: {
        campaignData: CampaignRequest;
        orgId?: string;
    }): Promise<Campaign>;
    deleteCampaign(params: {
        campaignId: number;
        orgId?: string;
    }): Promise<boolean>;
    getCampaignById(params: {
        campaignId: number;
        orgId?: string;
    }): Promise<Campaign | null>;
    listCampaigns(params?: {
        listParams?: ListCampaignsParams;
        orgId?: string;
    }): Promise<import("./campaigns/campaigns").CampaignResponse>;
    updateCampaign(params: {
        campaignId: number;
        campaignData: Partial<CampaignRequest>;
        orgId?: string;
    }): Promise<Campaign | null>;
    activateCampaign(params: {
        campaignId: number;
        orgId?: string;
    }): Promise<void>;
    pauseCampaign(params: {
        campaignId: number;
        orgId?: string;
    }): Promise<void>;
    endCampaign(params: {
        campaignId: number;
        orgId?: string;
    }): Promise<void>;
    copyCampaign(params: {
        campaignId: number;
        newCampaignData?: Partial<CampaignRequest>;
        orgId?: string;
    }): Promise<Campaign>;
}
export {};
