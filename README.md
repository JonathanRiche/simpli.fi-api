# Simpli.fi API Client

This package provides a TypeScript client for interacting with the Simpli.fi API. It allows you to manage campaigns, ads, geo-fences, and perform various operations related to the Simpli.fi platform.

[NPM Package](https://www.npmjs.com/package/simpl.fi-api-client)

## Installation

```bash
npm i simpl.fi-api-client
# or
bun add simpl.fi-api-client
```

## Usage

First, import the SimplifiClient:

```typescript
import { SimplifiClient } from 'simplifi-api-client';
```

Then, create an instance of the client:

```typescript
const client = new SimplifiClient({
  appApiKey: 'YOUR_APP_API_KEY',
  userApiKey: 'YOUR_USER_API_KEY',
  orgId: 'YOUR_ORGANIZATION_ID', // Optional, can be provided in method calls
  debug: false // Optional, set to true for detailed logging
});
```

You can also use environment variables for configuration:

```typescript
const client = new SimplifiClient({});
```

This assumes you have set the following environment variables:
- APP_API_TOKEN
- USER_API_KEY

### Campaign Operations

#### List Campaigns

```typescript
const campaigns = await client.listCampaigns({
  orgId: 'YOUR_ORG_ID', // Optional if provided in constructor
  listParams: {
    filter: { status: 'active' },
    include: ['budget_flights'],
    sort: '-created_at'
  }
});
```

#### Create Campaign

```typescript
const newCampaign = await client.createCampaign({
  orgId: 'YOUR_ORG_ID', // Optional if provided in constructor
  campaignData: {
    name: 'New Campaign',
    status: 'active',
    // ... other campaign properties
  }
});
```

#### Update Campaign

```typescript
const updatedCampaign = await client.updateCampaign({
  orgId: 'YOUR_ORG_ID', // Optional if provided in constructor
  campaignId: 123,
  campaignData: {
    name: 'Updated Campaign Name',
    // ... other properties to update
  }
});
```

#### Delete Campaign

```typescript
await client.deleteCampaign({
  orgId: 'YOUR_ORG_ID', // Optional if provided in constructor
  campaignId: 123
});
```

#### Other Campaign Operations

```typescript
await client.activateCampaign({ orgId: 'ORG_ID', campaignId: 123 });
await client.pauseCampaign({ orgId: 'ORG_ID', campaignId: 123 });
await client.endCampaign({ orgId: 'ORG_ID', campaignId: 123 });
const copiedCampaign = await client.copyCampaign({ orgId: 'ORG_ID', campaignId: 123 });
```

### Ad Operations

```typescript
const ads = await client.listAds({ orgId: 'ORG_ID', campaignId: 123 });
const newAd = await client.createAd({ orgId: 'ORG_ID', campaignId: 123, ad: { /* ad data */ } });
await client.updateAd({ orgId: 'ORG_ID', campaignId: 123, adId: 456, ad: { /* update data */ } });
await client.pauseAd({ orgId: 'ORG_ID', campaignId: 123, adId: 456 });
await client.verifyClickTag({ orgId: 'ORG_ID', campaignId: 123, adId: 456 });
const bulkAds = await client.getBulkAds({ orgId: 'ORG_ID', campaignId: 123, adIds: [456, 789] });
```

### Geo-Fence Operations

```typescript
const geoFences = await client.getGeoFences({ orgId: 'ORG_ID', campaignId: 123 });
await client.deleteGeoFence({ orgId: 'ORG_ID', campaignId: 123, geoFenceId: 456 });
const updatedGeoFence = await client.updateGeoFence({
  orgId: 'ORG_ID',
  campaignId: 123,
  geoFenceId: 456,
  geoFence: { /* geo-fence data */ }
});
const replacedGeoFences = await client.replaceGeoFences({
  orgId: 'ORG_ID',
  campaignId: 123,
  geoFences: [/* array of geo-fence data */]
});
```

### Land Use Operations

```typescript
const allLandUses = await client.getAllLandUses({ orgId: 'ORG_ID' });
const singleLandUse = await client.getSingleLandUse({ orgId: 'ORG_ID', landUseId: 1 });
```

## Error Handling

The client throws errors for various scenarios, including configuration issues and API errors. Always wrap your API calls in try-catch blocks:

```typescript
try {
  const campaigns = await client.listCampaigns({ orgId: 'ORG_ID' });
} catch (error) {
  console.error('Error fetching campaigns:', error.message);
}
```

## TypeScript Support

This client is written in TypeScript and provides type definitions for all methods and responses.

## Contributing

Contributions are welcome! Please submit pull requests with any enhancements, bug fixes, or additional features.

## License

This project is licensed under the MIT License.
