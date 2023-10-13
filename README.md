# simplfi

Typescript package for use with the Simpli.fi REST API. [Simpli.fi](https://simpli.fi/)

This package was updated with the latest version "2021-04-16" from their [API docs](https://app.simpli.fi/apidocs)

View [global.d.ts](https://github.com/JonathanRiche/simpli.fi-api/blob/5f26349501f6fafde7b0736b07731ad8ab877162/global.d.ts) for types

Example of campaign type.
```typescript
/**
 * Campaign object.
 */
type Campaign = {
  name: string;
  budget: number;
  /** Campaign type (1: Search, 2: Contextual, 3: Site Retargeting, 4: IP Targeting, 5: Geo Optimized) */
  campaign_type_id: 1 | 2 | 3 | 4 | 5; 
  start_date: string;
  end_date: string;
  status: string;
};
```

```typescript
import {listCampaigns,createCampaign} from "@simpli.fi/campaigns";

//The Organization ID you'd like to access this is required for all API Calls.
const organizationId = "00000"

//Returns Array<Campaign> 
const allCampaigns = await listCampaigns(organizationId);

//Create a campaign
createCampaign(
    //Campaign 
    {
        name: 'My New Campaign',
        budget: 100,
        campaign_type_id: 1,
        start_date: "2023-10-13",
        end_date: "2023-12-30"
    },
    organizationId
)

```