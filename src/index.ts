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
    // type CampaignRequest,
    // type Campaign,
} from "./campaigns/campaigns";

const defaultApiConfigErrorMessage = 'Please ensure to set your app and user API keys via the config method or in a .env file';
type Config = { appApiKey?: string; userApiKey?: string; orgId?: string };

export class SimplifiClient {
    private appApiKey: string;
    private userApiKey: string;
    private orgId: string | null = null;

    constructor(config: Config) {
        this.appApiKey = config.appApiKey || process.env.APP_API_TOKEN || "";
        this.userApiKey = config.userApiKey || process.env.USER_API_KEY || "";
        this.orgId = config.orgId || null;

        if (!this.appApiKey || !this.userApiKey) {
            console.warn("API keys not set. Please set your app and user API keys via the config method or in a .env file");
        }
    }

    public config(config: Config): void {
        this.appApiKey = config.appApiKey || this.appApiKey;
        this.userApiKey = config.userApiKey || this.userApiKey;
        this.orgId = config.orgId || this.orgId;
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
    public async createCampaign(params: { campaignData: CampaignRequest; orgId?: string }): Promise<Campaign> {
        const validOrgId = this.validateConfig(params.orgId);
        return createCampaign(params.campaignData, validOrgId);
    }

    public async deleteCampaign(params: { campaignId: number; orgId?: string }): Promise<boolean> {
        const validOrgId = this.validateConfig(params.orgId);
        return deleteCampaign(params.campaignId, validOrgId);
    }

    public async getCampaignById(params: { campaignId: number; orgId?: string }): Promise<Campaign | null> {
        const validOrgId = this.validateConfig(params.orgId);
        return getCampaignById(params.campaignId, validOrgId);
    }

    public async listCampaigns(params?: { listParams?: ListCampaignsParams; orgId?: string }) {
        const validOrgId = this.validateConfig(params?.orgId);
        return listCampaigns(validOrgId, params?.listParams);
    }

    public async updateCampaign(params: { campaignId: number; campaignData: Partial<CampaignRequest>; orgId?: string }): Promise<Campaign | null> {
        const validOrgId = this.validateConfig(params.orgId);
        return updateCampaign(params.campaignId, params.campaignData, validOrgId);
    }

    public async activateCampaign(params: { campaignId: number; orgId?: string }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return activateCampaign(params.campaignId, validOrgId);
    }

    public async pauseCampaign(params: { campaignId: number; orgId?: string }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return pauseCampaign(params.campaignId, validOrgId);
    }

    public async endCampaign(params: { campaignId: number; orgId?: string }): Promise<void> {
        const validOrgId = this.validateConfig(params.orgId);
        return endCampaign(params.campaignId, validOrgId);
    }

    public async copyCampaign(params: { campaignId: number; newCampaignData?: Partial<CampaignRequest>; orgId?: string }): Promise<Campaign> {
        const validOrgId = this.validateConfig(params.orgId);
        return copyCampaign(params.campaignId, validOrgId);
    }

    // Add other methods for different API endpoints (e.g., ads, creative assets, etc.) here
}
