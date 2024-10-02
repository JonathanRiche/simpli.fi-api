# Simpli.fi API Client

This package provides a TypeScript client for interacting with the Simpli.fi API. It allows you to manage campaigns and perform various operations related to the Simpli.fi platform.

## Installation

```bash
npm install simplifi-api-client
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
  orgId: 'YOUR_ORGANIZATION_ID' // Optional, can be provided in method calls
});
```

You can also use environment variables for configuration:

```typescript
const client = new SimplifiClient();
```

This assumes you have set the following environment variables:
- SIMPLIFI_APP_API_KEY
- SIMPLIFI_USER_API_KEY
- SIMPLIFI_ORG_ID (optional)

### Campaign Operations

#### List Campaigns

```typescript
const campaigns = await client.listCampaigns({
  orgId: 'YOUR_ORG_ID', // Optional if provided in constructor
  params: {
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
  campaignId: 'CAMPAIGN_ID',
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
  campaignId: 'CAMPAIGN_ID'
});
```

#### Other Campaign Operations

The client also supports operations like activate, pause, end, and copy campaigns:

```typescript
await client.activateCampaign({ orgId: 'ORG_ID', campaignId: 'CAMPAIGN_ID' });
await client.pauseCampaign({ orgId: 'ORG_ID', campaignId: 'CAMPAIGN_ID' });
await client.endCampaign({ orgId: 'ORG_ID', campaignId: 'CAMPAIGN_ID' });
const copiedCampaign = await client.copyCampaign({ orgId: 'ORG_ID', campaignId: 'CAMPAIGN_ID' });
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
```

This README now reflects the current structure and usage of the SimplifiClient, including the updated configuration options and the ability to provide the organization ID either in the constructor or in individual method calls. It also includes examples for the main campaign operations and mentions error handling.
