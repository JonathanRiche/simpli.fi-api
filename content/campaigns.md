Campaigns
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
      "status": "Ended",
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
      ],
      "actions": [
        {
          "pause": {
            "href": "https://app.simpli.fi/api/campaigns/1983/pause",
            "method": "POST"
          }
        },
        {
          "end": {
            "href": "https://app.simpli.fi/api/campaigns/1983/end",
            "method": "POST"
          }
        },
        {
          "copy": {
            "href": "https://app.simpli.fi/api/campaigns/1983/copy",
            "method": "POST"
          }
        }
      ],
      "resources": [
        {
          "ads": "https://app.simpli.fi/api/campaigns/1983/ads"
        },
        {
          "creative_groups": "https://app.simpli.fi/api/campaigns/1983/creative_groups"
        },
        {
          "keywords": "https://app.simpli.fi/api/campaigns/1983/keywords"
        },
        {
          "domains": "https://app.simpli.fi/api/campaigns/1983/domains"
        },
        {
          "browsers": "https://app.simpli.fi/api/campaigns/1983/browsers"
        },
        {
          "device_types": "https://app.simpli.fi/api/campaigns/1983/device_types"
        },
        {
          "contexts": "https://app.simpli.fi/api/campaigns/1983/contexts"
        },
        {
          "geo_targets": "https://app.simpli.fi/api/campaigns/1983/geo_targets"
        },
        {
          "postal_codes": "https://app.simpli.fi/api/campaigns/1983/postal_codes"
        },
        {
          "ip_ranges": "https://app.simpli.fi/api/campaigns/1983/ip_ranges"
        },
        {
          "deals": "https://app.simpli.fi/api/campaigns/1983/deals"
        },
        {
          "third_party_segments": "https://app.simpli.fi/api/campaigns/1983/third_party_segments"
        },
        {
          "first_party_segments": "https://app.simpli.fi/api/campaigns/1983/campaign_first_party_segments"
        },
        {
          "changes": "https://app.simpli.fi/api/campaigns/1983/changes"
        },
        {
          "addresses": "https://app.simpli.fi/api/campaigns/1983/campaign_addresses"
        },
        {
          "geo_fences": "https://app.simpli.fi/api/campaigns/1983/geo_fences"
        },
        {
          "retail_markups": "https://app.simpli.fi/api/campaigns/1983/retail_markups"
        }
      ]
    }
  ],
  "paging": {
    "page": 1,
    "size": 50,
    "total": 1
  }
}
HTTP Methods Supported
GET
POST
PUT
DELETE
Listing Campaigns
There are two different formats for listing campaigns. One is to list the campaigns belonging to a single organization. The request URL needs the organization_id.

Curl example listing campaigns for an organization:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns"
The alternative format is to list the campaigns for an organization and all of the campaigns belonging to the organizations underneath that organization. If query string includes the children parameter with value true

Curl example listing all campaigns for an organization and the campaigns belonging to organizations underneath it:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns?children=true"
Both format return paged results, accept the same filter parameters, and can nest the same resources.

The organizations url format cannot be used to list individual campaigns or take actions on a campaign.

Query String Params
Filter
You can pass a filter query string param to limit the result set.

Example:
?filter=status%3Dactive%2Cstatus%3Dpending
?filter=status%3Dpending%3Bstart_date%3E%3D2011-01-01

Alternative Filter Options
Instead of using the query string, other params can be used to filter the returned campaigns. These are exclusive with the filter param, and if the filter param is present, it will take precedence.

Filter campaigns by exact name match example:
?name=foo

Filter campaigns by name similarity match example:
?name_like=foo

Sort
You can sort the returned campaigns based on name, name_like or created_at by setting the sortColumn param to one of those values. The sort order can be specified by setting the sortOrder param to either asc or desc.

Sort results by created_at in ascending order example:
sortColumn=created_at&sortOrder=asc

Search campaigns by name similarity and sort results by similarity in descending order example:
name_like=foo&sortColumn=name_like&sortOrder=desc

Include
You can include/nest in the response the following resources:

Ads
Ad Groups
Keywords
Domains
Browsers
Device Types
Contexts
Geo Targets
Postal Codes
Ip Ranges
Deals
Third Party Segments
First Party Segments
Example:
?include=keywords,domains

Paging
Example:
?page=2

Attributes Only
If attributes_only is set to true then only the attributes of campaigns will be included in the response and the lists of actions and resources will be omitted. This reduces the amount of data in the response. This parameter may also be applied when getting a single campaign.

Example: ?attributes_only=true"

Page Size
Minimum size is 1
Maximum size is 500
Default size is 50

Example:
?size=100

Creating a Campaign
The POST is only supported when nested within an Organization context. It does not accept any params and will return a draft campaign ready to be edited.

A new campaign must be created and then the attributes can be updated.

Curl example creating a campaign:

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{}' \
  "https://app.simpli.fi/api/organizations/8/campaigns"
Deleting a Campaign
A Campaign is actually archived if it has already started. If it hasn't started, then it will actually be deleted.

Curl example deleting campaign id 747:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/747"
Campaign Type
A campaign can be of one of the following types:

Search (1)
Contextual (2)
Site Retargeting (3)
IP Targeting (4)
Geo Optimized (5)
To set a campaign's type:

Request
curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "campaign_type_id": 1
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644"
Response
{
  "campaigns": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaigns/644",
      "id": 644,
      "name": "Search campaign example",
      "campaign_type": {
        "id": 1,
        "name": "Search"
      }
    }
  ]
}
Campaign Goal
The campaign goal can have several different outputs. A CPM campaign can choose to have a CPC, CPA, CTR or no goal.

CPM Bid Type with No Goal
curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "campaign_goal": null
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/646"
CPM Bid Type with CPA Goal
curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
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
CPM Bid Type with CPC Goal
curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
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
CPM Bid Type with CTR Goal
curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
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
Auto Optimize
The auto optimize option allows Simpli.fi's adops team to use automated campaign optimization.

The auto_optimize attribute of the campaign controls the auto optimize setting. It accepts a boolean true or false.

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "auto_optimize": true
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/646"
OBA Provider
The OBA Provider for the campaign is set using the oba_provider_id field of the campaign. The field should have the id of the selected OBA Provider.

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "oba_provider_id": 1
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/646"
Geo Targets
The geo targets for the campaign are set using the geo_target_ids field of campaign. The field should have an array of all the geo_target_ids for the campaign. The API does not allow additional geo targets to be added to a campaign. It replaces all geo targets for the campaign with the new set. The geo targets for the campaign are not changed if the geo_target_ids field is not present in the request.

Example for Geo Targets of United States and Canada:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "geo_target_ids": ["8180", "1"]
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644"
Postal Codes
The postal codes for the campaign are set using the postal_codes field of campaign. The field should have an object with two fields: values and append.

values - an array containing all of the postal codes to be added to the campaign. Each postal code is passed as an object with fields postal_code and country_code where postal_code is the postal code and country_code is the three-character country code such as "GBR" for "Great Britain".
append - optional parameter. When set to true the postal codes in the request are appended to the existing set of postal codes for the campaign. The campaign postal codes are replaced if the value of the field is not true or the field is not included.
Example of where postal codes are replaced:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
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
Example where postal codes are appended:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
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
Viewability
This will restrict the ads to only serve on domains which have known chances of an ad being in view. Turning this on will greatly reduce the available inventory.

Possible values:

null - 'Not Set': All inventory is available
1 - 'Good': The best 30% of inventory is available
2 - 'Better': The best 15% of inventory is available
3 - 'Best': The best 7% of inventory is available
The viewability of a campaign is set using the numeric value of the viewability or null when viewability is not used by the campaign.

Example for Viewability of 'Not Set':

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "integral_viewability_threshold_id": null
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644"
Example for Viewability of 'Good':

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "integral_viewability_threshold_id": "1"
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644"
Example for Viewability of 'Better':

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "integral_viewability_threshold_id": "2"
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644"
Example for Viewability of 'Best':

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "integral_viewability_threshold_id": "3"
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644"
Possible Statuses
The Campaigns resources has the following possible values for the status:

Draft
Pending
Active
Paused
Ended
Suspended
The status of the Campaign cannot be modified in an update/PUT. The status of the Campaign can only be modified by the given "actions".

Example of activating a campaign

curl -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/activate"
Common Errors
Request: POST "/api/organizations/{organization_id}/campaigns/{campaign_id}/pause"
Error Response: 422 Unprocessable Entity - "Could not pause campaign"
Solution: Campaign is not currently active and cannot be paused.
Request: POST "/api/organizations/{organization_id}/campaigns/{campaign_id}/activate"
Error Response: 422 Unprocessable Entity - "Geo targets Select at least 1 location or postal code"
Solution: Campaign cannot activate without at least one Geo Target being chosen. See Geo Targets for an example.
Request: PUT "/api/organizations/{organization_id}/campaigns/{campaign_id}"
Error Response: 404 Not Found
Solution: The campaign is ended, or has been deleted.
Deprecated Campaign Params
The Campaigns resource supports receiving the deprecated fields through the use of -H "X-Api-Version: YYYY-MM-DD".

Example of sending the deprecated org_blacklist_opt_out parameter. Note: You will not receive the parameter in the response in this or older API versions.

Request
curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2020-11-16" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "org_blacklist_opt_out": "true"
        }
      }' \
  "https://app.simpli.fi/api/organizations/55/campaigns/25083"
Response
{
  "campaigns": [
    {
      "resource": "https://app.simpli.fi/api/organizations/55/campaigns/25083",
      "id": 25083,
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
      "status": "Ended",
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
      "auto_optimize": true,
      "click_attribution_window": 30,
      "view_attribution_window": 30,
      "week_dayparting": [
        [0,1,2,3,4,5,20,21,22,23],  // Monday
        [0,1,2,3,4,5,20,21,22,23],  // Tuesday
        [0,1,2,3,4,5,20,21,22,23],  // Wednesday
        [0,1,2,3,4,5,20,21,22,23],  // Thursday
        [0,1,2,3,4,5,20,21,22,23],  // Friday
        [8,9,10,11,12,13,14,15],    // Saturday
        [8,9,10,11,12,13,14,15]     // Sunday
      ],
      "actions": [
        {
          "pause": {
            "href": "https://app.simpli.fi/api/campaigns/25083/pause",
            "method": "POST"
          }
        },
        {
          "end": {
            "href": "https://app.simpli.fi/api/campaigns/25083/end",
            "method": "POST"
          }
        },
        {
          "copy": {
            "href": "https://app.simpli.fi/api/campaigns/25083/copy",
            "method": "POST"
          }
        }
      ],
      "resources": [
        {
          "ads": "https://app.simpli.fi/api/campaigns/25083/ads"
        },
        {
          "creative_groups": "https://app.simpli.fi/api/campaigns/25083/creative_groups"
        },
        {
          "keywords": "https://app.simpli.fi/api/campaigns/25083/keywords"
        },
        {
          "domains": "https://app.simpli.fi/api/campaigns/25083/domains"
        },
        {
          "browsers": "https://app.simpli.fi/api/campaigns/25083/browsers"
        },
        {
          "devices": "https://app.simpli.fi/api/campaigns/25083/devices"
        },
        {
          "contexts": "https://app.simpli.fi/api/campaigns/25083/contexts"
        },
        {
          "geo_targets": "https://app.simpli.fi/api/campaigns/25083/geo_targets"
        },
        {
          "postal_codes": "https://app.simpli.fi/api/campaigns/25083/postal_codes"
        },
        {
          "ip_ranges": "https://app.simpli.fi/api/campaigns/25083/ip_ranges"
        },
        {
          "deals": "https://app.simpli.fi/api/campaigns/25083/deals"
        },
        {
          "third_party_segments": "https://app.simpli.fi/api/campaigns/25083/third_party_segments"
        },
        {
          "first_party_segments": "https://app.simpli.fi/api/campaigns/25083/campaign_first_party_segments"
        },
        {
          "changes": "https://app.simpli.fi/api/campaigns/25083/changes"
        },
        {
          "addresses": "https://app.simpli.fi/api/campaigns/25083/campaign_addresses"
        },
        {
          "geo_fences": "https://app.simpli.fi/api/campaigns/25083/geo_fences"
        }
      ],
      "third_party_segments_match_type": "any",
      "site_retargeting_segments_match_type": "any"
    }
  ]
}
Deprecated Campaign Fields
The Campaigns resource supports responding with deprecated fields through the use of -H "X-Api-Version: YYYY-MM-DD".

Example of receiving the deprecated site_retargeting_segments_match_type and third_party_segments_match_type fields after sending in one of those two fields to update segment_match_type.

Request
curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2020-02-04" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign": {
          "third_party_segments_match_type": "any"
        }
      }' \
  "https://app.simpli.fi/api/organizations/55/campaigns/25083"
Response
{
  "campaigns": [
    {
      "resource": "https://app.simpli.fi/api/organizations/55/campaigns/25083",
      "id": 25083,
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
      "status": "Ended",
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
      "auto_optimize": true,
      "click_attribution_window": 30,
      "view_attribution_window": 30,
      "week_dayparting": [
        [0,1,2,3,4,5,20,21,22,23],  // Monday
        [0,1,2,3,4,5,20,21,22,23],  // Tuesday
        [0,1,2,3,4,5,20,21,22,23],  // Wednesday
        [0,1,2,3,4,5,20,21,22,23],  // Thursday
        [0,1,2,3,4,5,20,21,22,23],  // Friday
        [8,9,10,11,12,13,14,15],    // Saturday
        [8,9,10,11,12,13,14,15]     // Sunday
      ],
      "actions": [
        {
          "pause": {
            "href": "https://app.simpli.fi/api/campaigns/25083/pause",
            "method": "POST"
          }
        },
        {
          "end": {
            "href": "https://app.simpli.fi/api/campaigns/25083/end",
            "method": "POST"
          }
        },
        {
          "copy": {
            "href": "https://app.simpli.fi/api/campaigns/25083/copy",
            "method": "POST"
          }
        }
      ],
      "resources": [
        {
          "ads": "https://app.simpli.fi/api/campaigns/25083/ads"
        },
        {
          "creative_groups": "https://app.simpli.fi/api/campaigns/25083/creative_groups"
        },
        {
          "keywords": "https://app.simpli.fi/api/campaigns/25083/keywords"
        },
        {
          "domains": "https://app.simpli.fi/api/campaigns/25083/domains"
        },
        {
          "browsers": "https://app.simpli.fi/api/campaigns/25083/browsers"
        },
        {
          "devices": "https://app.simpli.fi/api/campaigns/25083/devices"
        },
        {
          "contexts": "https://app.simpli.fi/api/campaigns/25083/contexts"
        },
        {
          "geo_targets": "https://app.simpli.fi/api/campaigns/25083/geo_targets"
        },
        {
          "postal_codes": "https://app.simpli.fi/api/campaigns/25083/postal_codes"
        },
        {
          "ip_ranges": "https://app.simpli.fi/api/campaigns/25083/ip_ranges"
        },
        {
          "deals": "https://app.simpli.fi/api/campaigns/25083/deals"
        },
        {
          "third_party_segments": "https://app.simpli.fi/api/campaigns/25083/third_party_segments"
        },
        {
          "first_party_segments": "https://app.simpli.fi/api/campaigns/25083/campaign_first_party_segments"
        },
        {
          "changes": "https://app.simpli.fi/api/campaigns/25083/changes"
        },
        {
          "addresses": "https://app.simpli.fi/api/campaigns/25083/campaign_addresses"
        },
        {
          "geo_fences": "https://app.simpli.fi/api/campaigns/25083/geo_fences"
        }
      ],
      "third_party_segments_match_type": "any",
      "site_retargeting_segments_match_type": "any"
    }
  ]
}

