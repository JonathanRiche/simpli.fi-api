//create a class with a config method that takes in a the two api keys from the .env file and has methods that includes the functions in ./campaigns/modifyCampaigns.ts

import { createCampaign,deleteCampaign,getCampaignById,listCampaigns,updateCampaign } from "./campaigns/modifyCampaign";

const defaultApiConfigErrorMessage = 'Please ensure to set your app and user api keys via the config method or in a .env file';

export class Simplifi {
    private appApiKey: string | null = null;
    private userApiKey: string | null = null;
    private headers : Record<string, string> = {};
    private orgid: string | null = null;

    constructor() {
        if(process && process.env){
            this.appApiKey = process.env.APP_API_TOKEN ?? "";
            this.userApiKey = process.env.USER_API_KEY ?? "";
            this.headers ={
                "X-App-Key": this.appApiKey ,
                "X-User-Key": this.userApiKey,
                "Content-Type": "application/json",
            } 
        }else{
            console.warn("No process.env found. Please set your app and user api keys in a .env file or pass them in via the config method");
        }
        
    }

    public config(appApiKey: string, userApiKey: string,orgid?: string) {
        this.appApiKey = appApiKey;
        this.userApiKey = userApiKey;
        this.setHeaders();

        if(orgid){
            this.orgid = orgid;
        }
    }

    private setHeaders(){
        if(!this.appApiKey || !this.userApiKey){
            throw Error();
        }
        this.headers ={
            "X-App-Key": this.appApiKey ,
            "X-User-Key": this.userApiKey,
            "Content-Type": "application/json",
        } 
    }

    private checkConfigParams(orgid:string | null){
        if(!this.appApiKey || !this.userApiKey){
            throw Error(defaultApiConfigErrorMessage);
        }

        if(orgid){
           this.orgid = orgid; 
        }

        if(!this.orgid){
            throw Error("Please provide an organization id in the config method or in the method declaration");
        }

    }

    public async createCampaign(campaignData: CampaignRequest,orgid: string | null = this.orgid) {
        this.checkConfigParams(orgid);
        // Call createCampaign function from ./campaigns/modifyCampaign.ts
        createCampaign(campaignData,this.orgid!);
    }

    public async deleteCampaign(campaignId:number,orgid: string | null = this.orgid) {
        this.checkConfigParams(orgid);
        
        return deleteCampaign(campaignId, orgid!);
    }

    public async getCampaignById(campaignId: number, orgid: string | null = this.orgid) {
        this.checkConfigParams(orgid);

        getCampaignById(campaignId, orgid!);
    }

    public async listCampaigns(orgid: string | null = this.orgid) {
        this.checkConfigParams(orgid);

        return listCampaigns(orgid!);
    }

    public async updateCampaign(campaignId: number, campaignData: CampaignRequest,orgid: string | null = this.orgid) {
        this.checkConfigParams(orgid);

        return updateCampaign(campaignId,campaignData,orgid!);
    }
}

