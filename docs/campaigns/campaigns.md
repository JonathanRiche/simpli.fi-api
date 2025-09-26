# Campaigns

Campaigns are the core advertising units in the Simpli.fi platform. This API allows you to create, manage, and configure advertising campaigns with comprehensive targeting and budget controls.

## Overview

The Campaigns API provides full campaign lifecycle management including:
- Campaign creation and configuration
- Budget and bid management
- Targeting parameter setup
- Status controls and actions
- Performance monitoring

## HTTP Methods Supported

- **GET** - List campaigns or retrieve specific campaign details
- **POST** - Create new campaigns and perform actions
- **PUT** - Update campaign settings
- **DELETE** - Archive or delete campaigns

## Campaign Object Structure

```json
{
  "campaigns": [
    {
      "resource": "https://app.simpli.fi/api/organizations/0/campaigns/1983",
      "id": 1983,
      "name": "My Best Campaign Yet!",
      "custom_id": null,
      "current_win_rate": 0.0,
      "campaign_type": {
        "id": 1,
        "name": "Search"
      },
      "start_date": "2010-05-13",
      "end_date": "2010-07-30",
      "bid_type": {
        "id": 2,
        "name": "CPC"
      },
      "bid": 3.5,
      "campaign_goal": {
        "goal_type": "cpc",
        "goal_value": 5.0
      },
      "daily_budget": 100.0,
      "total_budget": 3100.0,
      "status": "Active",
      "impression_cap": null,
      "pacing": 100.0,
      "automated_pacing_enabled": true,
      "viewability": "Good",
      "frequency_capping": {
        "how_many_times": 2,
        "hours": 24
      },
      "oba_provider": {
        "id": 1,
        "name": "Truste"
      },
      "media_type_id": 1,
      "segment_match_type": "any",
      "auto_optimize": true,
      "click_attribution_window": 30,
      "view_attribution_window": 30,
      "org_blocklist_opt_out": true,
      "ad_placement_id": 1,
      "week_dayparting": [
        [0,1,2,3,4,5,20,21,22,23],  // Monday
        [0,1,2,3,4,5,20,21,22,23],  // Tuesday
        [0,1,2,3,4,5,20,21,22,23],  // Wednesday
        [0,1,2,3,4,5,20,21,22,23],  // Thursday
        [0,1,2,3,4,5,20,21,22,23],  // Friday
        [8,9,10,11,12,13,14,15],    // Saturday
        [8,9,10,11,12,13,14,15]     // Sunday
      ]
    }
  ]
}
```

## Listing Campaigns

### Organization-Specific Campaigns

List campaigns belonging to a single organization:

```bash
curl -i -X GET \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns"
```

### Include Child Organizations

List campaigns for an organization and all child organizations:

```bash
curl -i -X GET \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns?children=true"
```

## Getting a Single Campaign

Campaigns can be retrieved directly by ID or with organization context:

```bash
# Direct access (recommended)
curl -i -X GET \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/12345"

# Legacy format with organization context
curl -i -X GET \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/12345"
```

## Creating a Campaign

New campaigns are created in draft status and require organization context:

```bash
curl -i -X POST \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{}' \
  "https://app.simpli.fi/api/organizations/8/campaigns"
```

**Note:** New campaigns are created as drafts and must be configured before activation.

## Campaign Types

Set the campaign type using `campaign_type_id`:

- **Search (1)** - Search-based campaigns
- **Contextual (2)** - Content-based targeting
- **Site Retargeting (3)** - Retargeting campaigns
- **IP Targeting (4)** - IP-based targeting
- **Geo Optimized (5)** - Location-optimized campaigns

```bash
curl -i -X PUT \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "campaign_type_id": 1
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644"
```

## Campaign Goals

### No Goal (CPM Only)
```bash
curl -i -X PUT \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "campaign_goal": null
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/646"
```

### CPC Goal
```bash
curl -i -X PUT \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "campaign_goal": {
            "goal_value": "5.0",
            "goal_type": "cpc"
          }
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/646"
```

### CPA Goal
```bash
curl -i -X PUT \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "campaign_goal": {
            "goal_value": "2.0",
            "cpa_view_thru_per": "0.6",
            "cpa_click_thru_per": "0.4",
            "goal_type": "cpa"
          }
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/646"
```

### CTR Goal
```bash
curl -i -X PUT \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "campaign_goal": {
            "goal_value": "0.8",
            "goal_type": "ctr"
          }
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/646"
```

## Geographic Targeting

### Geo Targets
Replace all geo targets for a campaign:

```bash
curl -i -X PUT \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "geo_target_ids": ["8180", "1"]
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644"
```

### Postal Codes

Replace postal codes:
```bash
curl -i -X PUT \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "postal_codes": {
            "values": [
              {
                "postal_code": "76102",
                "country_code": "USA"
              }
            ]
          }
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644"
```

Append postal codes:
```bash
curl -i -X PUT \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "postal_codes": {
            "values": [
              {
                "postal_code": "76103",
                "country_code": "USA"
              }
            ],
            "append": "true"
          }
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644"
```

## Viewability Settings

Control inventory quality based on viewability scores:

- **null** - All inventory available
- **1** - "Good": Top 30% of inventory
- **2** - "Better": Top 15% of inventory  
- **3** - "Best": Top 7% of inventory

```bash
curl -i -X PUT \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "integral_viewability_threshold_id": "1"
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644"
```

## Campaign Status Management

### Possible Statuses
- **Draft** - Being configured
- **Pending** - Awaiting activation
- **Active** - Currently running
- **Paused** - Temporarily stopped
- **Ended** - Completed or stopped
- **Suspended** - Platform suspended

### Status Actions

Campaign status is controlled through action endpoints:

```bash
# Activate campaign
curl -X POST \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/activate"

# Pause campaign
curl -X POST \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/pause"

# End campaign
curl -X POST \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/end"
```

## Query Parameters

### Filtering
Filter campaigns by status, date, or name:
```
?filter=status%3Dactive%2Cstatus%3Dpending
?filter=status%3Dpending%3Bstart_date%3E%3D2011-01-01
?name=exact-campaign-name
?name_like=partial-name
```

### Sorting
Sort results by name, similarity, or creation date:
```
?sortColumn=created_at&sortOrder=asc
?name_like=foo&sortColumn=name_like&sortOrder=desc
```

### Pagination
```
?page=2&size=100
```

### Data Options
```
?attributes_only=true  # Exclude actions and resources
```

## Related Resources

- [Campaign Stats](campaign-stats.md) - Performance metrics
- [Budget Plans](budget-plans.md) - Budget management
- [Campaign Addresses](campaign-addresses.md) - Addressable targeting
- [Campaign Deals](campaign-deals.md) - Private marketplace deals
- [Ads](../ads/ads.md) - Creative management

## Next Steps

1. Create a campaign with the appropriate campaign type
2. Configure targeting parameters and budget
3. Upload ad creatives
4. Activate the campaign
5. Monitor performance through Campaign Stats

For comprehensive campaign setup, see the related documentation sections for targeting, creative management, and reporting.