import { BaseURL } from "../defaults";

const adEndpoint = (orgid: string,campaignId:string) => `${BaseURL}${orgid}/campaigns/${campaignId}/ads`;


//?add to a class or object that inherits via a config method
const appKey = process.env.APP_API_TOKEN;
const userKey = process.env.USER_API_KEY;

//?add to a class or object that inherits via a config method
const headers = {
    "X-App-Key": appKey ?? "",
    "X-User-Key": userKey ?? "",
    "Content-Type": "application/json",
};

//multipart/form-data
//https://app.simpli.fi/api/ad_file_types

export async function getAdFileTypes(): Promise<Record<string,string>> {
    const response = await fetch(`https://app.simpli.fi/api/ad_file_types`, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve ad file types', { cause: await response.text() });
    }
    return response.json() as Promise<Record<string,string>>;
}

export async function listAds(orgid: string,campaignId:string): Promise<Ad[]> {
    const response = await fetch(`${adEndpoint(orgid,campaignId)}`, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve campaign ads list', { cause: await response.text() });
    }
    return response.json() as Promise<Ad[]>;
}

export async function createAd(orgid: string,campaignId:string,ad:Record<string,string|number>): Promise<Ad[]> {
    headers["Content-Type"] = "application/json";

    const response = await fetch(`${adEndpoint(orgid,campaignId)}`, {
        method: "POST",
        headers,
        body:JSON.stringify({ad})
    });
    if (!response.ok) {
        const textResponse = await response.text()
        throw new Error('Failed to create ad', { cause: textResponse});
    }
    return response.json() as Promise<Ad[]>;
}