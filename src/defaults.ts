export const BaseURL = `https://app.simpli.fi/api/organizations/` as const;

export type RequestHeaders = {
    "X-App-Key": string,
    "X-User-Key": string,
    "Content-Type"?: string//"application/json",
};

export function checkEnvApiKeys(): RequestHeaders | null {
    if (!process.env.APP_API_TOKEN || !process.env.USER_API_KEY) {
        return null
    }
    return {
        "X-App-Key": process.env.APP_API_TOKEN,
        "X-User-Key": process.env.USER_API_KEY,
        "Content-Type": "application/json"
    };
}

