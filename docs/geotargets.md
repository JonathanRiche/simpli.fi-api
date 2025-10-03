Geo Targets

Each geo target has an active attribute that is set to true when the geo target is valid and may be used in campaigns. A geo target with an active field set to false is no longer valid and should not be added to campaigns.
Querying All Available Top Level Geo Targets
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/geo_targets"

Response

{
  "geo_targets": [
    {
      "resource": "https://app.simpli.fi/api/geo_targets/143596",
      "id": 143596,
      "name": "Argentina",
      "parent_id": null,
      "active": true,
      "resources": [
        {
          "geo_targets": "https://app.simpli.fi/api/geo_targets?parent_id=143596"
        }
      ],
      "updated_date": "2016-02-04"
    },
    ... Not showing full list of geo targets ...
    {
      "resource": "https://app.simpli.fi/api/geo_targets/8180",
      "id": 8180,
      "name": "United States",
      "parent_id": null,
      "active": true,
      "resources": [
        {
          "geo_targets": "https://app.simpli.fi/api/geo_targets?parent_id=8180"
        }
      ],
      "updated_date": "2016-02-04"
    },
    ... Not showing full list of geo targets ...
    {
      "resource": "https://app.simpli.fi/api/geo_targets/154256",
      "id": 154256,
      "name": "Venezuela",
      "parent_id": null,
      "active": true,
      "resources": [
        {
          "geo_targets": "https://app.simpli.fi/api/geo_targets?parent_id=154256"
        }
      ],
      "updated_date": "2016-02-04"
    }
  ]
}

Querying Geo Targets By Name

Names must be an exact match but the comparison is case-insensitive. Example for United States:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/geo_targets?name=United+States"

Response

{
  "geo_targets": [
    {
      "resource": "https://app.simpli.fi/api/geo_targets/8180",
      "id": 8180,
      "name": "United States",
      "parent_id": null,
      "active": true,
      "resources": [
        {
          "geo_targets": "https://app.simpli.fi/api/geo_targets?parent_id=8180"
        }
      ],
      "updated_date": "2016-02-04"
    }
  ]
}

Querying Geo Targets Under a Parent

Example for United States which has id 8180:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/geo_targets?parent_id=8180"

Response

{
  "geo_targets": [
    {
      "resource": "https://app.simpli.fi/api/geo_targets/8184",
      "id": 8184,
      "name": "Alabama",
      "parent_id": 8180,
      "active": true,
      "resources": [
        {
          "geo_targets": "https://app.simpli.fi/api/geo_targets?parent_id=8184"
        }
      ],
      "updated_date": "2016-02-04"
    },
    ... Not showing full list of geo targets ...
  ]
}

Querying Geo Targets Under a Parent By Name

The two previous queries can be combined:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/geo_targets?parent_id=8180&name=Alabama"

Response

{
  "geo_targets": [
    {
      "resource": "https://app.simpli.fi/api/geo_targets/8184",
      "id": 8184,
      "name": "Alabama",
      "parent_id": 8180,
      "active": true,
      "resources": [
        {
          "geo_targets": "https://app.simpli.fi/api/geo_targets?parent_id=8184"
        }
      ],
      "updated_date": "2016-02-04"
    },
    ... For other queries the list of returned geo targets may be much longer ...
  ]
}

Querying Geo Targets for a Campaign
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/geo_targets"

Response

{
  "geo_targets": [
    {
      "resource": "https://app.simpli.fi/api/geo_targets/1?organization_id=8",
      "id": 1,
      "name": "Canada",
      "parent_id": null,
      "active": true,
      "resources": [
        {
          "geo_targets": "https://app.simpli.fi/api/organizations/8/campaigns/644/geo_targets?parent_id=1"
        }
      ],
      "updated_date": "2016-02-04"
    }
  ]
}

Updating Geo Targets for a Campaign via Metro Codes

The POST action currently supports adding geo targets to an existing campaign by specifying an array of metro codes. The add endpoint will not replace any existing Geo Target IDs currently on a campaign. If a given metro code contains Geo Target IDs that already exist, they will be ignored.

Only Campaign ID needs to be specified in POST request URL.
Request

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "metro_codes": ["558"]
      }' \
  "https://app.simpli.fi/api/campaigns/644/geo_targets/add_by_metro_code"

You can add multiple metro codes at once as demonstrated in this example:

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "metro_codes": ["534", "540", "558"]
      }' \
  "https://app.simpli.fi/api/campaigns/644/geo_targets/add_by_metro_code"

Response

The response is simply a hash of the metro codes that were added to the campaign via the request.

{
  "geo_targets": [
    {
      "resource": "https://app.simpli.fi/api/campaigns/644/geo_targets?id=18161",
      "id": 18161,
      "name": "Blaine",
      "parent_id": 8208,
      "active": true,
      "resources": [
        {
          "geo_targets": "https://app.simpli.fi/api/geo_targets?parent_id=18161"
        }
      ],
      "metro_code_id": 552,
      "updated_date": "2016-11-03"
    }
  ]
}

Note: If all resultant Geo Target IDs contained within the metro codes are present on the campaign, the response will contain an empty array indicating that no updates were made. Check the status code on the response for a 200 to ensure there were no errors with the request.

{
  "geo_targets": []
}

Updating Geo Targets for a Campaign by Geo Target ID

Geo Target IDs can be assigned to a campaign using the campaigns endpoint. Refer to the Geo Targets subsection of Campaigns for details.
Querying Geo Targets by Radius

Specify a latitude, longitude, and radius in miles to request geo targets in the specified circumference

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "latitude": 32.751541,
        "longitude": -97.459149,
        "radius": 20
      }' \
  "https://app.simpli.fi/api/geo_targets/for_radius"

Response

{
  "geo_targets": [
    {
      "resource": "http://app.simpli.fi/api/geo_targets/30259",
      "id": 30259,
      "name": "Aledo",
      "parent_id": 8234,
      "active": true,
      "resources": [
        {
          "geo_targets": "http://app.simpli.fi/api/geo_targets?parent_id=30259"
        }
      ]
    },
    ... Not showing full list of geo targets ...
  ]
}

