import {
    createCampaign,
    deleteCampaign,
    getCampaignById,
    listCampaigns,
    updateCampaign,
    // CampaignRequest,
    // Campaign,
    ListCampaignsParams,
    activateCampaign,
    pauseCampaign,
    endCampaign,
    copyCampaign,
} from "./campaigns/campaigns";

const defaultApiConfigErrorMessage = 'Please ensure to set your app and user API keys via the config method or in a .env file';

export class SimplifiClient {
    private appApiKey: string;
    private userApiKey: string;
    private orgId: string | null = null;

    constructor(appApiKey?: string, userApiKey?: string, orgId?: string) {
        this.appApiKey = appApiKey || process.env.APP_API_TOKEN || "";
        this.userApiKey = userApiKey || process.env.USER_API_KEY || "";
        this.orgId = orgId || null;

        if (!this.appApiKey || !this.userApiKey) {
            console.warn("API keys not set. Please set your app and user API keys via the config method or in a .env file");
        }
    }

    public config(appApiKey: string, userApiKey: string, orgId?: string): void {
        this.appApiKey = appApiKey;
        this.userApiKey = userApiKey;
        this.orgId = orgId || null;
    }

    private validateConfig(orgId?: string): string {
        if (!this.appApiKey || !this.userApiKey) {
            throw new Error(defaultApiConfigErrorMessage);
        }

        const validOrgId = orgId || this.orgId;
        if (!validOrgId) {
            throw new Error("Please provide an organization ID in the config method or in the method call");
        }

        return validOrgId;
    }

    // Campaign methods
    public async createCampaign(campaignData: CampaignRequest, orgId?: string): Promise<Campaign> {
        const validOrgId = this.validateConfig(orgId);
        return createCampaign(campaignData, validOrgId);
    }

    public async deleteCampaign(campaignId: number, orgId?: string): Promise<boolean> {
        const validOrgId = this.validateConfig(orgId);
        return deleteCampaign(campaignId, validOrgId);
    }

    public async getCampaignById(campaignId: number, orgId?: string): Promise<Campaign | null> {
        const validOrgId = this.validateConfig(orgId);
        return getCampaignById(campaignId, validOrgId);
    }

    public async listCampaigns(params?: ListCampaignsParams, orgId?: string) {
        const validOrgId = this.validateConfig(orgId);
        return listCampaigns(validOrgId, params);
    }

    public async updateCampaign(campaignId: number, campaignData: Partial<CampaignRequest>, orgId?: string): Promise<Campaign | null> {
        const validOrgId = this.validateConfig(orgId);
        return updateCampaign(campaignId, campaignData, validOrgId);
    }

    public async activateCampaign(campaignId: number, orgId?: string): Promise<void> {
        const validOrgId = this.validateConfig(orgId);
        return activateCampaign(campaignId, validOrgId);
    }

    public async pauseCampaign(campaignId: number, orgId?: string): Promise<void> {
        const validOrgId = this.validateConfig(orgId);
        return pauseCampaign(campaignId, validOrgId);
    }

    public async endCampaign(campaignId: number, orgId?: string): Promise<void> {
        const validOrgId = this.validateConfig(orgId);
        return endCampaign(campaignId, validOrgId);
    }

    public async copyCampaign(campaignId: number, orgId?: string): Promise<Campaign> {
        const validOrgId = this.validateConfig(orgId);
        return copyCampaign(campaignId, validOrgId);
    }

    // Add other methods for different API endpoints (e.g., ads, creative assets, etc.) here
}
