import { SimplifiClient } from 'simpl.fi-api-client';
// import * as dotenv from 'dotenv';
// dotenv.config();

const APP_API_TOKEN = Bun.env.APP_API_TOKEN;
const USER_API_KEY = Bun.env.USER_API_KEY;
const ORG_ID = Bun.env.ORG_ID;
const CAMPAIGN_ID = Bun.env.CAMPAIGN_ID;
const client = new SimplifiClient({
  appApiKey: APP_API_TOKEN,
  userApiKey: USER_API_KEY,
  orgId: ORG_ID,
});
console.log(CAMPAIGN_ID);
if (!CAMPAIGN_ID || APP_API_TOKEN === '' || USER_API_KEY === '' || ORG_ID === '') {
  throw new Error('Set all required environment variables');
}

const path = './json/createImageAd.json';
const imagePath = './image/bb.png';
const adParamsfile = Bun.file(path);
const adParamscontents = await adParamsfile.json();
const adImage = Bun.file(imagePath) as unknown as File;
const buffer = await adImage.arrayBuffer();
const fileToUpload = new Blob([buffer], { type: adImage.type });

await client.createAdWithFile({
  campaignId: +CAMPAIGN_ID,
  ad: adParamscontents,
  file: fileToUpload,
  debug: true
});

