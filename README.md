# Simpli.fi API Client

This package provides a TypeScript client for interacting with the Simpli.fi API. It allows you to manage campaigns and perform various operations related to the Simpli.fi platform.

[NPM Package](https://www.npmjs.com/package/simpl.fi-api-client)

## Installation

```bash
npm i simpl.fi-api-client
#or 
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
Example csv of data to load into new campaign
```csv
name,status,start_date,end_date,budget_type,budget_amount,budget_period,timezone,goal_type,goal_amount,campaign_type,geo_type,device_types,geo_targets,keyword_targets
Summer Sale 2024,active,2024-06-01,2024-08-31,total,10000,campaign,America/New_York,impressions,1000000,display,dma,"desktop,mobile,tablet","New York,Los Angeles,Chicago","summer sale,discount,promotion"
Back to School 2024,paused,2024-08-01,2024-09-15,daily,500,day,America/Chicago,clicks,1000,video,zip,"mobile,tablet","60601,90210,33139","back to school,supplies,deals"
Holiday Special 2024,draft,2024-12-01,2024-12-31,total,20000,campaign,America/Los_Angeles,conversions,500,native,city,"desktop,mobile","San Francisco,Seattle,Portland","holiday gift,christmas sale,new year"
```

Example json of data to load into new campaign
```json
[
  {
    "name": "Summer Sale 2024",
    "status": "active",
    "start_date": "2024-06-01",
    "end_date": "2024-08-31",
    "budget_type": "total",
    "budget_amount": 10000,
    "budget_period": "campaign",
    "timezone": "America/New_York",
    "goal_type": "impressions",
    "goal_amount": 1000000,
    "campaign_type": "display",
    "geo_type": "dma",
    "device_types": ["desktop", "mobile", "tablet"],
    "geo_targets": ["New York", "Los Angeles", "Chicago"],
    "keyword_targets": ["summer sale", "discount", "promotion"]
  },
  {
    "name": "Back to School 2024",
    "status": "paused",
    "start_date": "2024-08-01",
    "end_date": "2024-09-15",
    "budget_type": "daily",
    "budget_amount": 500,
    "budget_period": "day",
    "timezone": "America/Chicago",
    "goal_type": "clicks",
    "goal_amount": 1000,
    "campaign_type": "video",
    "geo_type": "zip",
    "device_types": ["mobile", "tablet"],
    "geo_targets": ["60601", "90210", "33139"],
    "keyword_targets": ["back to school", "supplies", "deals"]
  },
  {
    "name": "Holiday Special 2024",
    "status": "draft",
    "start_date": "2024-12-01",
    "end_date": "2024-12-31",
    "budget_type": "total",
    "budget_amount": 20000,
    "budget_period": "campaign",
    "timezone": "America/Los_Angeles",
    "goal_type": "conversions",
    "goal_amount": 500,
    "campaign_type": "native",
    "geo_type": "city",
    "device_types": ["desktop", "mobile"],
    "geo_targets": ["San Francisco", "Seattle", "Portland"],
    "keyword_targets": ["holiday gift", "christmas sale", "new year"]
  }
]
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
