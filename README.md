# simpli.fi api

TypeScript package for use with the Simpli.fi REST API. [Simpli.fi](https://simpli.fi/)

This package was updated with the latest version "2021-04-16" from their [API docs](https://app.simpli.fi/apidocs)

## Getting Started

Create a .env file based on the .env.dev secrets and add the correct tokens found in the Simpli.fi user & admin area.

```s
APP_API_TOKEN="REPLACE_WITH_YOUR_APP_APITOKEN"
USER_API_KEY="REPLACE_WITH_YOUR_USER_APITOKEN"
```

## Installation

```bash
npm install @simpli.fi/api
# or
yarn add @simpli.fi/api
# or 
bun add @simpli.fi/api
```

## Usage

### Initializing the Client

```typescript
import { SimplifiClient } from "@simpli.fi/api";

const client = new SimplifiClient();
// Or, if not using environment variables:
// const client = new SimplifiClient('your-app-key', 'your-user-key', 'your-org-id');
```

### Working with Campaigns

```typescript
// List all campaigns
const campaigns = await client.listCampaigns();

// Create a new campaign
const newCampaign = await client.createCampaign({
  name: 'My New Campaign',
  budget: 100,
  campaign_type_id: 1,
  start_date: "2023-10-13",
  end_date: "2023-12-30"
});

// Get a specific campaign
const campaign = await client.getCampaignById(123456);

// Update a campaign
const updatedCampaign = await client.updateCampaign(123456, {
  name: 'Updated Campaign Name'
});

// Delete a campaign
const isDeleted = await client.deleteCampaign(123456);

// Other campaign operations
await client.activateCampaign(123456);
await client.pauseCampaign(123456);
await client.endCampaign(123456);
const copiedCampaign = await client.copyCampaign(123456, { name: 'Copied Campaign' });
```

## Types

The package includes TypeScript definitions for all API responses and request parameters. Here's an example of the Campaign type:

```typescript
type Campaign = {
  name: string;
  budget: number;
  /** Campaign type (1: Search, 2: Contextual, 3: Site Retargeting, 4: IP Targeting, 5: Geo Optimized) */
  campaign_type_id: 1 | 2 | 3 | 4 | 5;
  start_date: string;
  end_date: string;
  status: string;
  // ... other properties
};
```

## Development

If you'd like to clone the repo to contribute or develop locally, we use [bun](https://bun.sh/) for local development/debugging. Everything should be compatible with Node.js as well; we only use bun.utils/testing outside of the main package.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
