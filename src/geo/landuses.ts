import { BaseURL, checkEnvApiKeys, type RequestHeaders } from "../defaults";

const landUseEndpoint = `${BaseURL}land_uses`;

const appKey = process.env.APP_API_TOKEN;
const userKey = process.env.USER_API_KEY;

const headers = {
    "X-App-Key": appKey ?? "",
    "X-User-Key": userKey ?? "",
    "Content-Type": "application/json",
};


export interface LandUse {
    id: number;
    name: string;
    resource: string;
}

export async function getAllLandUses(headers?: RequestHeaders): Promise<LandUse[]> {
    const response = await fetch(landUseEndpoint, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve all land uses', { cause: await response.text() });
    }
    const data = await response.json() as { land_uses: LandUse[] };
    return data.land_uses as LandUse[];
}

export async function getSingleLandUse(id: number, headers?: RequestHeaders): Promise<LandUse> {
    const response = await fetch(`${landUseEndpoint}/${id}`, {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error(`Failed to retrieve land use with id ${id}`, { cause: await response.text() });
    }
    const data = await response.json() as { land_uses: LandUse[] };
    return data.land_uses[0] as LandUse;
}
