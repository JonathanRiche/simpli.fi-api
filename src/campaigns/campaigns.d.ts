export interface ListCampaignsParams {
    filter?: string;
    include?: string[];
    page?: number;
    size?: number;
    attributes_only?: boolean;
    children?: boolean;
    name?: string;
    name_like?: string;
    sortColumn?: 'name' | 'name_like' | 'created_at';
    sortOrder?: 'asc' | 'desc';
}
export interface CampaignResponse {
    campaigns: Campaign[];
    paging?: {
        page: number;
        size: number;
        total: number;
    };
}
declare function listCampaigns(orgid: string, params?: ListCampaignsParams): Promise<CampaignResponse>;
declare function createDraftCampaign(orgid: string): Promise<CampaignResponse>;
declare function getCampaignById(campaignId: number, orgid: string): Promise<Campaign | null>;
declare function updateCampaign(campaignId: number, campaignData: Partial<CampaignRequest>, orgid: string): Promise<Campaign | null>;
declare function createCampaign(campaignData: CampaignRequest, orgid: string): Promise<Campaign>;
declare function deleteCampaign(campaignId: number, orgid: string): Promise<boolean>;
declare function getCampaignBudgetPlan(campaignId: number, orgid: string): Promise<{
    budget_plans: Array<Budget_Plan>;
}>;
declare function updateBudgetPlan(id: number, plan: Budget_Plan_Request): Promise<unknown>;
declare function activateCampaign(campaignId: number, orgid: string): Promise<void>;
declare function pauseCampaign(campaignId: number, orgid: string): Promise<void>;
declare function endCampaign(campaignId: number, orgid: string): Promise<void>;
declare function copyCampaign(campaignId: number, orgid: string): Promise<Campaign>;
export { listCampaigns, createDraftCampaign, getCampaignById, updateCampaign, createCampaign, deleteCampaign, getCampaignBudgetPlan, updateBudgetPlan, activateCampaign, pauseCampaign, endCampaign, copyCampaign };
