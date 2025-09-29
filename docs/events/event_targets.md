Event Targets

Listing event targets that belong to an organization.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/events"

Response

{
  "events": [
    {
      "resource": "https://app.simpli.fi/api/events/300510",
      "id": 300510,
      "name": "Event Target 101",
      "user_count": 4096,
      "days_inactive": 35,
      "active": false,
      "organization_id": 5787,
      "criteria": [
        {
          "type": "GeoFence",
          "criterion": {
            "id": 25,
            "name": "rectangle6074",
            "bid_area": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -96.995957,
                    33.00698
                  ],
                  [
                    -96.995957,
                    33.007781
                  ],
                  [
                    -96.994606,
                    33.007781
                  ],
                  [
                    -96.994606,
                    33.00698
                  ],
                  [
                    -96.995957,
                    33.00698
                  ]
                ]
              ]
            },
            "geo_fence_type_name": "Event"
          },
          "flights": [
            {
              "start_at": "2016-09-07T14:01:33-05:00",
              "end_at": "2016-09-14T14:01:33-06:00"
            },
            {
              "start_at": "2016-09-014T12:22:29-05:00",
              "end_at": "2016-09-21T12:22:29-05:00"
            }
          ]
        }
      ]
    },
    ... Not showing all event targets in the output ...
  ],
  "paging": {
    "page": 1,
    "size": 10,
    "total": 2908,
    "next": "https://app.simpli.fi/api/organizations/5787/events?page=2"
  }
}

HTTP Methods Supported

    GET
    POST
    PUT
    DELETE

Query String Params
"method"

The method query string param identifies the edit method for criteria on a PUT command. Allowed values are "add" and "replace". Default value is "replace" if no query string param is sent.

Example:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/events/15?method=add"

Creating an Event Target

The POST body should be formatted as JSON and use the following format. The POST is only supported when nested within an organization context. The only currently supported criterion type is "GeoFence".

    Refer to Geo Fences for details of the requirements for geo_fences

Event Target Example

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "event": {
          "name": "Event Target 2",
          "criteria": [
            {
              "type": "GeoFence",
              "criterion": {
                "name": "rectangle6074",
                "bid_area": {
                  "type": "Polygon",
                  "coordinates": [
                    [
                      [-96.995957, 33.00698],
                      [-96.995957, 33.007781],
                      [-96.994606, 33.007781],
                      [-96.994606, 33.00698],
                      [-96.995957, 33.00698]
                    ]
                  ]
                }
              },
              "flights": [
                {
                  "start_at": "2016-09-07T14:01:33-05:00",
                  "end_at": "2016-09-14T14:01:33-06:00"
                },
                {
                  "start_at": "2016-09-14T12:22:29-05:00",
                  "end_at": "2016-09-21T12:22:29-05:00"
                }
              ]
            }
          ]
        }
      }' \
  "https://app.simpli.fi/api/organizations/5787/events"

Getting a Specific Event Target

Example - get event target 105234:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/events/105234"

The JSON returned:

{
  "events": [
    {
      "resource": "https://app.simpli.fi/api/events/105234",
      "id": 105234,
      "name": "Event Target 101",
      "user_count": 4096,
      "days_inactive": 35,
      "active": false,
      "organization_id": 5787,
      "criteria": [
        {
          "type": "GeoFence",
          "criterion": {
            "id": 25,
            "name": "rectangle6074",
            "bid_area": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -96.995957,
                    33.00698
                  ],
                  [
                    -96.995957,
                    33.007781
                  ],
                  [
                    -96.994606,
                    33.007781
                  ],
                  [
                    -96.994606,
                    33.00698
                  ],
                  [
                    -96.995957,
                    33.00698
                  ]
                ]
              ]
            },
            "geo_fence_type_name": "Event"
          },
          "flights": [
            {
              "start_at": "2016-09-07T14:01:33-05:00",
              "end_at": "2016-09-14T14:01:33-06:00"
            },
            {
              "start_at": "2016-09-14T12:22:29-05:00",
              "end_at": "2016-09-21T12:22:29-05:00"
            }
          ]
        }
      ]
    }
  ]
}

Updating an Event Target

The name field of the event target can be updated. The criteria of the event target will be either replaced or added to based on the "method" query string param.

Example - add criteria to the event target with id 105235:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "event": {
          "name": "Event Target 2",
          "criteria": [
            {
              "type": "GeoFence",
              "criterion": {
                "name": "rectangle1001",
                "bid_area": {
                  "type": "Polygon",
                  "coordinates": [
                    [
                      [-96.995957, 33.00698],
                      [-96.995957, 33.007781],
                      [-96.994606, 33.007781],
                      [-96.994606, 33.00698],
                      [-96.995957, 33.00698]
                    ]
                  ]
                }
              },
              "flights": [
                {
                  "start_at": "2016-09-07T14:01:33-05:00",
                  "end_at": "2016-09-14T14:01:33-06:00"
                },
                {
                  "start_at": "2016-09-14T12:22:29-05:00",
                  "end_at": "2016-09-21T12:22:29-05:00"
                }
              ]
            }
          ]
        }
      }' \
  "https://app.simpli.fi/api/events/105235?method=add"

Deleting an Event Target

Example - delete the event target with id 105226:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/events/105226"

