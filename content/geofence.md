
Geo Fences

Geo Fences provide a way to target based on GPS information returned by the users' device. Note that the latitude/longitude accuracy is to 3 decimal places. More decimal places will be stored, but are rounded when actually doing the targeting.

The name and bid_area attributes are required.

The Geo Fences main attribute is the bid_area. This is returned and accepted as a GeoJSON Polygon. Note that we only support polygons with 12 points or less at this time. The coordinates need to be stored in a contiguous clockwise order. The first and last coordinate should be the same to close the polygon. The first number in each coordinate pair is the longitude. [[[longitude,latitude],[longitude,latitude], ...]]

A campaign level recency is supported for the geo fences in the campaign. This geo_fencing_recency_id attribute is an optional parameter in the update request. Refer to Recencies for details of the available ids. It is possible to update the geo_fencing_recency_id parameter without altering the geo fences by sending an update request with the geo_fencing_recency_id as the only parameter.
Requesting the Current Geo Fences for a Campaign
GET Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/898/geo_fences"

Adding New Geo Fences

The POST action supports adding new geo fences to a campaign. The current geo fences on the campaign will not be modified.

To add new geo fences to a campaign, send a POST request containing a geo_fences parameter. The geo fences should be in the same format as those returned by the GET action.
POST Request

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "geo_fences": [
          {
            "name": "Somewhere Special",
            "bid_area": {
              "type": "Polygon",
              "coordinates": [
                [
                  [-97.5, 33.1],
                  [-97.5, 35.5],
                  [-95.2, 35.5],
                  [-95.2, 33.1],
                  [-97.5, 33.1]
                ]
              ]
            }
          }
        ]
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/898/geo_fences"

Replacing and Updating Geo Fences

The PUT action supports replacing the geo fences on a campaign. The geo fences on the campaign will be replaced with the set of geo fences from the PUT request.

To replace the geo fences in a campaign, send a PUT request containing a geo_fences parameter. The geo fences should be in the same format as those returned by the GET action. The geo fences on the campaign will be replaced with the new set of geo fences from the PUT request.

The individual geo fences in the PUT request may contain an id parameter. If the id maps to a geo fence already on the campaign that geo fence will be updated and keep the same id. A new geo fence will be created if the id does not map to one already on the campaign.
PUT Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "geo_fences": [
          {
            "name": "Somewhere Special",
            "bid_area": {
              "type": "Polygon",
              "coordinates": [
                [
                  [-97.5, 33.1],
                  [-97.5, 35.5],
                  [-95.2, 35.5],
                  [-95.2, 33.1],
                  [-97.5, 33.1]
                ]
              ]
            }
          }
        ]
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/898/geo_fences"

To replace only one type of geo fence, send a PUT request containing geo_fences and geo_fencing_update_type parameters. The value of geo_fencing_update_type should be the type of geo fences to be updated or replaced (either Target or Conversion ).
PUT Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "geo_fences": [
          {
            "id": 1,
            "name": "Somewhere Special",
            "geo_fence_type_name": "Target",
            "bid_area": {
              "type": "Polygon",
              "coordinates": [
                [
                  [-97.5, 33.1],
                  [-97.5, 35.5],
                  [-95.2, 35.5],
                  [-95.2, 33.1],
                  [-97.5, 33.1]
                ]
              ]
            }
          }
        ],
        "geo_fencing_update_type": "Target"
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/898/geo_fences"

To replace geo fences in a campaign and update the recency, send a PUT request containing geo_fences and geo_fencing_recency_id parameters
PUT Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "geo_fences": [
          {
            "name": "Somewhere Special",
            "bid_area": {
              "type": "Polygon",
              "coordinates": [
                [
                  [-97.5, 33.1],
                  [-97.5, 35.5],
                  [-95.2, 35.5],
                  [-95.2, 33.1],
                  [-97.5, 33.1]
                ]
              ]
            }
          }
        ],
        "geo_fencing_recency_id": 4
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/898/geo_fences"

To update only the recency pass just the geo_fencing_recency_id parameter in the request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "geo_fencing_recency_id": 4
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/898/geo_fences"

Updating Geo Fences' Attributes
PUT Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "geo_fences": [
      {
        "id": 123,
        "name": "some new name",
        "bid_area": {
          "type": "Polygon",
          "coordinates": [
            [
              [-97.5, 33.1],
              [-97.5, 35.5],
              [-95.2, 35.5],
              [-95.2, 33.1],
              [-97.5, 33.1]
            ]
          ]
        }
      }, {
        "id": 456,
        "name": "a different new name",
        "bid_area": {
          "type": "Polygon",
          "coordinates": [
            [
              [-97.5, 33.1],
              [-97.5, 35.5],
              [-95.2, 35.5],
              [-95.2, 33.1],
              [-97.5, 33.1]
            ]
          ]
        }
      }
    ]
  }' \
  "https://app.simpli.fi/api/campaigns/8/geo_fences/update"

This endpoint updates the attributes of existing geo fences of a campaign. Geo fences not passed in the request will remain on the campaign unchanged. Multiple fences can be updated at a time by id. Geo fence type cannot be altered.
Deleting a Geo Fence for a Campaign
DELETE Request

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/geo_fences/8"

Deleting many Geo Fences for a Campaign
DELETE Request

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "geo_fence_ids": [789, 987, 654]
  }' \
  "https://app.simpli.fi/api/organizations/123/campaigns/456/geo_fences"


