
Skip to Main Content
Mirage
Simpli.fi Api Documentation

    Introduction
    Newsletter
    Authentication
    The Initial Request
    API Versioning
    API Versions
    HTTP Responses
    Common Query String Params
    Report API Walkthrough

Resources

    Resources Intro
    Ad File Types
    Ad Groups
    Ad Placements
    Ad Sizes
    Ad Template Groups
    Addressable Targets
    Ads
    Bid Types
    Browsers
    Budget Plans
    Campaign Addresses
    Campaign Deals
    Campaign Events
    Campaign First Party Segments
    Campaign Groups
    Campaign Stats
    Campaign Types
    Campaigns
    Changes
    Comments
    Congressional Districts
    Contexts
    Custom Field Values
    Custom Fields
    Demographics
    Device Types
    Domains
    Dynamic Ad Feeds
    Dynamic Ad Types
    Event Targets
    Feed Filters
    First Party Segment Custom Values
    First Party Segment Rules
    First Party Segments
    Geo Fences
    Geo Targets
    Ip Ranges
    Keywords
    Land Uses
    Markup Rate Types
    Media Types
    Multi Campaign Keywords
    OBA Providers
    Operating Systems
    Organization Domain Blocklists
    Organization Tags
    Organizations
    Playback Methods
    Postal Codes
    Recencies
    Report Center Filter Expressions
    Report Center Report Schedules
    Report Center Report Snapshots
    Report Center Reports
    Report Center Templates
    Report Center Webhook Notifications
    Retail Markups
    Segment Custom Value Types
    Segment Target Types
    Segment Types
    Segment Url Match Types
    Simplifi Managed Deals
    Third Party Segment Providers
    Third Party Segments
    Users
    Video Ad Types

Introduction

The Simpli.fi APIs are continuing to evolve based on customer feedback. They are based on RESTful principles, always use HTTPS, use API keys for authentication, and use JSON for communicating data.

In order to get the most out of our APIs it is important to understand the underlying structure of our system. We have Organizations and Users.

Users belong to one or more Organizations (using the same login credentials). An Organization may have parent or child Organizations.

There are currently 3 levels of nesting supported with Organizations. Organizations where Simpli.fi is the parent support 2 additional levels of Organizations underneath them. Organizations where Simpli.fi is the grandparent support 1 level of nesting.
Newsletter
Sign up for our API newsletter

Authentication

First, you'll need to have an application API key. Your Simpli.fi client services representative can provide one. Second, you need to have a user's API key that you will be acting on behalf of. Generate one in My Account. Once you have these two keys, just pass them in the headers for each request.

The headers are X-App-Key and X-User-Key.

You will also need to ensure you have the correct Content-Type header for your requests. For most resources, this is "application/json".

You must not share your application key and/or user key with others. Simpli.fi enforces a rate limit of 300 requests/minute per application key. If requests exceed this rate, they will fail with a 429 response code. These must be reattempted later.
The Initial Request

An optional initial request to the api can be made to the root (/api). This will give you back the User you have access to and nested within that are the Resources you can access on behalf of the User.
API Versioning

On occasion, the API may need to make breaking changes to its format or content. Everyone wants stability in the APIs they use, so we have put in place a versioning system that will allow you to continue using your existing API applications without an immediate update.

Versions are dates, formatted YYYY-MM-DD. There is a list of API versions below.

When an API application key makes its first request, it will default to the newest version. API application keys first used on or before 2018-06-13 will default to that version, the oldest version. To use a different version, include the version name in the header X-Api-Version in the request.

For now, use the header to change the request's version, or contact Simpli.fi to have an API application's default set to a new value.
API Versions
2024-10-08

This update causes the Campaign and Campaign Stats endpoints to no longer support including resources.
2021-04-16

This update causes the Report Center Report Schedules endpoints to only return schedules belonging to the current organization.
2020-11-17

This update causes the Campaign endpoints to accept the deprecated org_blacklist_opt_out parameter to set that value internally as well as preventing the org_blocklist_opt_out field from being returned in the response.
2020-10-08

This update causes the Domains, Organizations, and Organization Blocklists endpoints to return blacklist variants of their terminology and underlying resources instead of blocklist.
2020-02-05

This update causes the Campaign Addresses, Campaign Audiences, Campaign Events, and Campaign First Party Segments endpoints to return segment_match_type instead of site_retargeting_segments_match_type.

In addition, it also changes the Third Party Segments endpoint to return segment_match_type instead of third_party_segments_match_type.

And finally, it changes the Campaigns endpoint to accept the site_retargeting_segments_match_type and third_party_segments_match_type parameters instead of the segment_match_type parameter and then return the site_retargeting_segments_match_type and third_party_segments_match_type fields instead of the segment_match_type field.
2018-06-14

This update changes the formats for the Organizations resource to match the other resources. Details and examples are in the resource documentation. These changes are intended to allow developers to use the same parsing code for all endpoints.

Performing a GET for a single organization returns a named array containing the organization, instead of a simple hash of the organization object.

In addition, the resources section of each organization becomes an array of hashes, instead of a simple hash. This change applies to lists of organizations and single organizations.
2018-06-13 or earlier

If your API application key was created before this date, its default API version is set here. None of the changes above apply. If you would like to use a different version, include the X-Api-Version header in your request. We recommend keeping your application up to date, but we will make an effort to keep things stable for it.
HTTP Responses

Since we use RESTful principles, we do our best to send back appropriate HTTP headers.

200
    Successful response and body contains the JSON response or the binary contents of the requested file. Check the Content-Type header to see if the data is text/csv, application/zip, or application/json. 
202
    Request is accepted and will be processed and you've received a Location header to check the results at.
204
    No content. You should see this when a DELETE action was successful.
401
    The API keys you supplied are not valid to access the resource you are attempting to access.
404
    Couldn't find the resource you were looking for.
422
    Couldn't process the request. The response should contain a collection of errors in the JSON response.
429
    Too many requests. Simpli.fi rate limits each application key to 300 requests per minute.
500
    Something blew up on our end. The response may or may not contain a collection of errors in the JSON response. We get a notification when this happens.

Common Query String Params
Filters

The filter query string param is implemented for some resources and the values are dependent upon that particular resource. However, the format for the param remains the same across any resources it is implemented for.

The filter query string param allows you to create simple left-to-right OR/AND filters. The param must be url-encoded.
Conditional Operators

Depending on the param the following conditional operators can be used:

    = (%3D)
    < (%3C)
    <= (%3C%3D)
    > (%3E)
    >= (%3E%3D)
    <> (%3C%3E)

Relational Operators

You can chain filters together using a comma to represent OR and a semi-colon to represent AND. The conditions are read left-to-right and currently do not support grouping. An example of filtering campaigns by the status of "Active" OR "Pending". ?filter=status%3Dactive%2Cstatus%3Dpending

    OR is , (%2C)
    AND is ; (%3B)

Includes

The include query string param is implemented for some resources and nests the output of child/nested resources. For example an Ad can include the AdFileType and AdSize resources within the Ad response. Only certain resources expose this option with only certain nested resources. Multiple resources can be specified by using a comma. The resources names should always be passed as plural and underscore spaced. The nesting cascades into subsequently nested resources. For example on a Campaign resource you can include ?include=ads%2Cad_file_types%2Cad_sizes This will nest all the Ads with their AdFileType and AdSize nested within the Campaign response.

Even though a resource is nested it is still defined within the resources Array in the response.
Report API Walkthrough

Here is a walkthrough on running and scheduling multiple reports through our API. There are several steps to run reports. It may help to have an overview:

    Find and choose a report template. You will need its report template ID. The template is the “skeleton” of the report which has the overall schema and column structure for the report as well as the default filters.
    Using the template ID, create a “report model” which is based on that template.
    Take note of the report model ID.
    Once that report model is created, run report snapshots which are an instant view of that data, or schedule reports which run on a recurring basis. In either case, these snapshots or schedules can filter your report data based on different parameters. So you can use the same report model to run scheduled reports using different date ranges or even entirely different organizations that you have access to. Report snapshots run "asynchronously". That is, even though you are requesting it at this moment, the snapshot goes into a queue for the report to run which you can pick up later. Schedules run once a day or less often depending on your parameters.
    Retrieve the snapshot or scheduled report when its finished. You can do this through "polling' by checking a certain time of day for when the report data is ready, or preferably by using a webhook URL in which case your server will get a notification when the report data is ready. Polling is often easier to experiment with during development, where webhooks will scale better in production.

Api Calls

Assume you are running reports for a fictional company named “Innitech” which has an Organization ID in our UI of 4968

    Note: All the report templates are also available for all the organizations in our UI. In each step below, your IDs for report models, templates, organization ID, etc. will be different than the examples below. 

Step 1: Find and choose a Report Template
Request

curl -i -X GET -H "X-App-Key: [your-app-key]" -H "X-User-Key:
[your-user-key]" \
  -H "Content-Type: application/json" \
"https://app.simpli.fi/api/organizations/4968/report_center/reports/templates"

Response

{
  "templates": [
    {
      "template_id": 26627,
      "category": "Ad/Campaign Reporting",
      "title": "Account Conversion by Ad",
      "description": null
    },
    {
      "template_id": 26628,
      "category": "Ad/Campaign Reporting",
      "title": "Account Conversion by Ad by Day",
      "description": null
    },
    {
      "template_id": 26573,
      "category": "Ad/Campaign Reporting",
      "title": "Account Conversion by Campaign",
      "description": null
    },
    // etc...
    {
      "template_id": 53680,
      "category": "Viewability Reporting",
      "title": "Viewability by Campaign by Day",
      "description": null
    }
  ]
}

Pick a template from these results or the Simpli.fi UI. For example, let us say we picked Template ID 26942 titled "Organization Ad Performance by Day". Create a report model for this Template ID 26942 which we pass as a parameter into our API call as template_id below.

    Note: The report model is tied to the user creating it. 

    Note: Report Templates titled "Organization Reports" capture all data at the current organization ID and all organizations below it. If you only want the one organization and none below it, use one of the report templates titled "Account..." 

Step 2: Create a Report Model based on the Template ID
Request

curl -i -X POST -H "X-App-Key: [your-app-key]" -H "X-User-Key:
[your-user-key]" \
  -H "Content-Type: application/json" \
  -d '{
        "template_id": 26942
      }' \
  "https://app.simpli.fi/api/organizations/4968/report_center/reports"

Response

{
  "reports": [
    {
      "resource": "https://app.simpli.fi/api/organizations/4968/report_center/reports/166766",
      "id": 166766,
      "title": "Organization Ad Performance  by Day",
      "private": true,
      "owner": "Bob Bobberson",
      "organization_name": null,
      "locked": false,
      "filters": {
        "summary_delivery_events.event_date": "1 months"
      },
      "current_fields": [
        {
          "category": "dimension",
          "label": "Time Event Date",
          "label_short": "Event Date",
          "name": "summary_delivery_events.event_date",
          "type": "date_date"
        },
        {
          "category": "measure",
          "label": "Retail Markup Total Retail Cost",
          "label_short": "Total Retail Cost",
          "name": "summary_delivery_events.retail_total",
          "type": "number"
        },
        /// many more fields, etc...
      ],
      "show_totals": false,
      "actions": [
        {
          "duplicate_report": {
            "href": "https://app.simpli.fi/api/organizations/4968/report_center/reports/166766/duplicate_report",
            "method": "POST"
          }
        },
        {
          "move_to_public": {
            "href": "https://app.simpli.fi/api/organizations/4968/report_center/reports/166766/move_to_public",
            "method": "POST"
          }
        }
      ]
    }
  ]
}

As you can see, the model gives us information including all the fields that are available in this report and the default filters when its run. You cannot at this time modify which fields get returned in the reports (you would have to make a custom template in the UI), but this response at least notifies you of what to expect. For future steps, we need to make a note of "ID": 166766 in the JSON returned. That is our new Report Model ID.

    Tip: If you ever want to retrieve this information again after it's been created, you can request the report model again using that ID and a GET request (this is optional):

    curl -i -X GET -H "X-App-Key: [your-app-key]" -H "X-User-Key: [your-user-key]" \
      -H "Content-Type: application/json" \
      "https://app.simpli.fi/api/organizations/4968/report_center/reports/166773"

    This will return the same response that we got in our POST to create the model in the first place.

Step 3: Create a snapshot or schedule based on the report model

We are now almost at the point where we can retrieve data. Run the schedules and snapshots on this report model for different organizations with a combination of different filters. However, we might want to change some things about the report model first. For example, the default filter for "Organization Ad Performance by Day" is summary_delivery_events.event_date":"1 months" as was seen in the JSON response above when we first created the report model. If you do not pass a value for summary_delivery_events.event_date in future snapshots or schedules, they will run based on this default. You might want to change that, or change the name of the report model for easier reference.

To do so, pass a new title and different options into the filters object of our JSON and send a PUT (update) to our report model, again using report model ID 166773.
Request

curl -i -X PUT -H "X-App-Key: [your-app-key]" -H "X-User-Key: [your-user-key]" \
  -H "Content-Type: application/json" \
  -d '{
        "title": "Organization Ad Perf. By Day for Innitech",
        "filters": {
          "summary_delivery_events.event_date": "7 days ago for 7 days"
        }
      }' \
  "https://app.simpli.fi/api/organizations/4968/report_center/reports/166773"

Response (should look familiar)

"reports": [
  {
    "resource": "https://app.simpli.fi/api/organizations/4968/report_center/reports/166773",
    "id": 166773,
    "title": "Organization Ad Perf. By Day for Innitech",
    "private": true,
    "owner": "Bob Bobberson",
    "organization_name": null,
    "locked": false,
    "filters": {
      "summary_delivery_events.event_date": "7 days ago for 7 days"
    },
    "current_fields": [
      {
        "category": "dimension",
        "label": "Time Event Date",
        "label_short": "Event Date",
        "name": "summary_delivery_events.event_date",
        "type": "date_date"
      }, {
        "category": "dimension",
        "label": "Companies Platform Name",
        "label_short": "Platform Name",
        "name": "dim_client.platform_name",
        "type": "string"
      },
      /// so many more fields...
      {
        "category": "measure",
        "label": "Retail Markup Total Retail Cost",
        "label_short": "Total Retail Cost",
        "name": "summary_delivery_events.retail_total",
        "type": "number"
      }
    ],
    "show_totals": false,
    "actions": [
      {
        "duplicate_report": {
          "href": "https://app.simpli.fi/api/organizations/4968/report_center/reports/166773/duplicate_report",
          "method": "POST"
        }
      },
      {
        "move_to_public": {
          "href": "https://app.simpli.fi/api/organizations/4968/report_center/reports/166773/move_to_public",
          "method": "POST"
        }
      }
    ]
  }
]

Again, this step is not strictly necessary, but might be useful to put in sane defaults for filters or to rename your report model.
Step 4: Running Snapshots

The most important step is to schedule a report or run a snapshot to put into the reporting queue based on the report model. You can change various filters when running a snapshot "on the fly" to differ from your Report Model.

For example: let us say you have access to another organization with an ID 12345 apart from Innitech and it requires you to run a monthly report for Innitech but a weekly report for org 12345. Then using this single report model, you can create snapshots for both organizations passing different filters with date ranges.

    Note: Your user account associated with your user key must have access to both organizations in order for this to work. 

For Innitech the request would be:

curl -i -X POST -H "X-App-Key: [your-app-key]" -H "X-User-Key: [your-user-key]" \
  -H "Content-Type: application/json" \
  -d '{
      "scheduled_plan": {
      },
      "destination_format": "json",
      "recipients": [
          "your_name@email.com"
      ],
      "webhook_urls": [
          "https://yourapp.com/endpoint"
      ],
      "filters": {
          "summary_delivery_events.event_date": "1 month"
        }
      }' \
  "https://app.simpli.fi/api/organizations/4968/report_center/reports/166773/schedules/create_snapshot"

Notice the Organization ID 4968 (for Innitech) and Report Model ID 166773 again in the URL. Also, see that we changed the filters object in the JSON for a 1 month timeframe. AND notice the destination_format of json. We could have chosen a different format, such as CSV.
Response

{
  "snapshots": [
    {
      "id": 2452225,
      "date": "12/20/2018",
      "status": "in_progress",
      "delivery": false,
      "download_link": null
    }
  ]
}

Our snapshot appears to be in progress. We do not have a download link yet, because the report is still processing in the queue.

For the secondary organization with ID 12345 we can run the report using the same report model ID but a different organization ID:
Request

curl -i -X POST -H "X-App-Key: [your-app-key]" -H "X-User-Key: [your-user-key]" \
  -H "Content-Type: application/json" \
  -d '{
      "scheduled_plan": {
      },
      "destination_format": "json",
      "recipients": [
          "your_name@email.com"
      ],
      "webhook_urls": [
          "https://yourapp.com/endpoint"
      ],
      "filters": {
          "summary_delivery_events.event_date": "1 month"
        }
  }' \
  "https://app.simpli.fi/api/organizations/12345/report_center/reports/166773/schedules/create_snapshot"

You will receive a similar response for Organization 12345 as before so we will skip that here. The point is, you are only customizing your snapshot/schedule calls with different values of the filter without updating the report model.

When those report snapshots finish, you will receive a notification at the webhook_urls you put in the POST snapshot requests above. (We highly recommend you do this in production environments, for both our sakes!) That will perform a POST to your URL(s) like something like this:
Response

{
  "download_link": "https://app.simpli.fi/report_center/reports/166773/schedules/2452225/download?code=6a5e838b3cb1373b7dc5a89f667bb4bcf56ad320",
  "report_filename": "Organization_Ad_Perf._By_Day_for_Innitech.json"

}

However, we can always request a list of all our snapshots like so:
Request

curl -i -X POST -H "X-App-Key: [your-app-key]" -H "X-User-Key: [your-user-key]" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/4968/report_center/reports/166773/schedules/snapshots"

Response

"snapshots": [
  {
    "id": 2452246,
    "date": "12/20/2018",
    "status": "in_progress",
    "delivery": false,
    "download_link": null
  }, {
    "id": 2452225,
    "date": "12/20/2018",
    "status": "in_progress",
    "delivery": false,
    "download_link": null
  }, {
    "id": 2452224,
    "date": "12/20/2018",
    "status": "in_progress",
    "delivery": false,
    "download_link": null
  }, {
    "id": 2452221,
    "date": "12/20/2018",
    "status": "in_progress",
    "delivery": false,
    "download_link": null
  }, {
    "id": 2452153,
    "date": "12/20/2018",
    "status": "success",
    "delivery": true,
    "download_link":"https://app.simpli.fi/report_center/reports/166773/schedules/download_snapshot?code=4404ad1bd77efecf52283a015052904c587fd9f6"
  }
]

You will see that last report snapshot is done and we have a download_link we can grab it from. Let us do that now. You can paste that link in your web browser or use curl again:
Request

curl "https://app.simpli.fi/report_center/reports/166773/schedules/download_snapshot?code=4404ad1bd77efecf52283a015052904c587fd9f6"

Response

[
  {
    "summary_delivery_events.ad_name": "some creative.jpg",
    "summary_delivery_events.ad_id": 12345,
    "summary_delivery_events.impressions": 1786215,
    "summary_delivery_events.clicks": 494,
    "summary_delivery_events.ctr": 0.027656245188849,
    "summary_delivery_events.platform_cpm": 0.0437450245351204,
    "summary_delivery_events.search_term_cpm": 0,
    "summary_delivery_events.demographic_cpm": 0,
    "summary_delivery_events.context_cpm": 0,
    "summary_delivery_events.behavioral_cpm": 0,
    "summary_delivery_events.geo_cpm": 0.0198465990936142,
    "summary_delivery_events.segment_cpm": 0,
    "summary_delivery_events.media_cpm": 0.333410611824444,
    "summary_delivery_events.ecpm": 0.396905217457025,
    "summary_delivery_events.total_cust": 708.958053,
    "summary_delivery_events.ecpc": 1.43513775910931
  },
  {
    "summary_delivery_events.ad_name": "some other create.jpg",
    "summary_delivery_events.ad_id": 23456,
    "summary_delivery_events.impressions": 1224840,
    "summary_delivery_events.clicks": 718,
    "summary_delivery_events.ctr": 0.0586199013748735,
    "summary_delivery_events.platform_cpm": 0.141955520721074,
    "summary_delivery_events.search_term_cpm": 0,
    "summary_delivery_events.demographic_cpm": 0,
    "summary_delivery_events.context_cpm": 0,
    "summary_delivery_events.behavioral_cpm": 0,
    "summary_delivery_events.geo_cpm": 0.0645658094118415,
    "summary_delivery_events.segment_cpm": 0,
    "summary_delivery_events.media_cpm": 1.08382617484733,
    "summary_delivery_events.ecpm": 1.29027053982561,
    "summary_delivery_events.total_cust": 1580.374968,
    "summary_delivery_events.ecpc": 2.20107934261838
  },
  {
    "summary_delivery_events.ad_name": "one more creative.jpg",
    "summary_delivery_events.ad_id": 4567890,
    "summary_delivery_events.impressions": 1126128,
    "summary_delivery_events.clicks": 1269,
    "summary_delivery_events.ctr": 0.112687012488811,
    "summary_delivery_events.platform_cpm": 0.272197925990651,
    "summary_delivery_events.search_term_cpm": 0,
    "summary_delivery_events.demographic_cpm": 0,
    "summary_delivery_events.context_cpm": 0,
    "summary_delivery_events.behavioral_cpm": 0,
    "summary_delivery_events.geo_cpm": 0.618897423738687,
    "summary_delivery_events.segment_cpm": 0,
    "summary_delivery_events.media_cpm": 1.58427970710257,
    "summary_delivery_events.ecpm": 2.47549843001861,
    "summary_delivery_events.total_cust": 2787.728096,
    "summary_delivery_events.ecpc": 2.19679124980299
  }
  //many more creatives etc...
]

What about scheduling?

In many cases, you will want to retrieve data on a regular basis rather than using ad hoc snapshots. You can schedule reports via the UI but it is also possible via the API. The request below will create a schedule based on our same report template. It will use the default filters provided on the report model ID, or you can override with a filters object just like our snapshot. Finally you can use our webhook_urls field to get notified on when the reports have run. We will use the same report model ID 166773.
Request

curl -i -X POST -H "X-App-Key: [your-app-key]" -H "X-User-Key: [your-user-key]" \
  -H "Content-Type: application/json" \
  -d '{
      "scheduled_plan": {
          "enabled": true,
          "run_interval": "weekly",
          "on_day": 0
      },
      "destination_format": "json",
      "recipients": [
          "your_name@email.com"
      ],
        "webhook_urls": [
          "https://yourapp.com/endpoint"
        ],
      "filters": {
          "summary_delivery_events.event_date": "1 day"
        }
  }' \
  "https://app.simpli.fi/api/organizations/4968/report_center/reports/1667
  73/schedules/"

Response

{
  "schedules": [
    {
      "resource": "https://app.simpli.fi/api/organizations/4968/report_center/reports/166773/schedules/2452629",
      "id": 2452629,
      "enabled": true,
      "run_interval": "weekly",
      "on_day": "0",
      "destination_format": "json",
      "organization": "Innitech",
      "recipients": [
        "your_name@email.com"
      ],
      "webhook_urls": [
        "https://yourapp.com/endpoint"
      ],
      "downloads": [],
      "actions": [
        {
          "disable": {
            "href":"https://app.simpli.fi/api/organizations/4968/report_center/reports/166773/schedules/2452629/disable",
            "method": "GET"

          }
        }
      ]
    }
  ]
}

Now the report is scheduled. When the scheduled day for the report occurs, the scheduler will put the report into the queue as if you had made a snapshot. You will see the scheduled report in the list of snapshots above. You can retrieve the data the usual way, via a download link from the snapshot or when notified through the webhook.

    Note: If you get an empty report, like an empty array [] in json format or a blank file in CSV, that means there was no data for the time period you requested. 

Wrapping Up

There are many other options in our reporting and our API in general. If you have further questions about our reporting API, contact our helpdesk. Also, please ask questions and provide feedback about this document or our API in general through our API helpdesk: https://simplifi.atlassian.net/servicedesk/customer/portal/14
Resources

Resources are always returned as a collection even if there is only one result. In other words you'll always be dealing with an array of results.

Nested/associated Resources are included as a resources Array as part of the resource definition. There is typically more than one way to get to a resource. Typically the uri for the resource will always mirror how you got there. Sometimes we cheat a little and keep nested resources shallow. This happens for an AdFileType on an Ad.
Ad File Types

Curl example to get all ad file types:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/ad_file_types"

Response

{
  "ad_file_types": [
    {
      "resource": "https://app.simpli.fi/api/ad_file_types/1",
      "id": 1,
      "name": "Image"
    }
  ]
}

Ad Groups

Ad groups provide a way to organize the ads on a campaign by flights.

When creating or updating ad groups, the start_at and end_at values for flights can be in either the YYYY-MM-DD format, or the ISO 8601 format, for more precision. Returned values will always be in the ISO 8601 format.

To place an ad in an ad group, use the creative_group_id parameter when creating or updating an ad. Setting this value to null or omitting it during ad creation will place the ad in the default ad group, which has no flights and is not included when listing ad groups.
HTTP Methods Supported

    GET
    POST
    PUT
    DELETE

Listing All Ad Groups That Belong to a Campaign
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/697/creative_groups"

Response

{
  "creative_groups": [
    {
      "id": 1,
      "ad_count": 2,
      "campaign_id": 697,
      "name": "My Ad Group",
      "resource": "https://app.simpli.fi/api/creative_groups/1",
      "flights": [
        {
          "start_at": "2018-10-10T12:47:48-05:00",
          "end_at": "2018-10-10T18:47:48-05:00"
        },
        {
          "start_at": "2018-12-02T12:47:48-05:00",
          "end_at": null
        }
      ]
    },
    ... Not showing all ad groups in the output ...
  ]
}

Showing a Single Ad Group
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/creative_groups/1"

Response

{
  "creative_groups": [
    {
      "id": 1,
      "ad_count": 2,
      "campaign_id": 697,
      "name": "My Ad Group",
      "resource": "https://app.simpli.fi/api/creative_groups/1",
      "flights": [
        {
          "start_at": "2018-10-10T12:47:48-05:00",
          "end_at": "2018-10-10T18:47:48-05:00"
        },
        {
          "start_at": "2018-12-02T12:47:48-05:00",
          "end_at": null
        }
      ]
    }
  ]
}

Showing Ads for an Ad Group
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/creative_groups/1/ads"

Response

{
  "ads": [
    ... Ads are returned in the same format as the ads endpoint ...
  ]
}

Creating a New Ad Group
Request

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "My New Ad Group",
        "flights": [
          {
            "start_at": "2018-10-10T12:47:48-05:00",
            "end_at": "2018-10-10T18:47:48-05:00"
          },
          {
            "start_at": "2018-12-02",
            "end_at": null
          }
        ]
      }' \
  "https://app.simpli.fi/api/campaigns/697/creative_groups"

Response

{
  "creative_groups": [
    {
      "id": 2,
      "ad_count": 0,
      "campaign_id": 697,
      "name": "My New Ad Group",
      "resource": "https://app.simpli.fi/api/creative_groups/2",
      "flights": [
        {
          "start_at": "2018-10-10T12:47:48-05:00",
          "end_at": "2018-10-10T18:47:48-05:00"
        },
        {
          "start_at": "2018-12-02T00:00:00-05:00",
          "end_at": null
        }
      ]
    }
  ]
}

Updating an Existing Ad Group
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "A New Name for My Ad Group",
        "flights": [
          {
            "start_at": "2018-10-10T12:47:48-05:00",
            "end_at": "2018-10-10T18:47:48-05:00"
          }
        ]
      }' \
  "https://app.simpli.fi/api/creative_groups/2"

Response

{
  "creative_groups": [
    {
      "id": 2,
      "ad_count": 0,
      "campaign_id": 697,
      "name": "A New Name for My Ad Group",
      "resource": "https://app.simpli.fi/creative_groups/2",
      "flights": [
        {
          "start_at": "2018-10-10T12:47:48-05:00",
          "end_at": "2018-10-10T18:47:48-05:00"
        }
      ]
    }
  ]
}

Deleting an Ad Group
Request

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/creative_groups/2"

Response

The response will have status 204 upon successful delete.
Ad Placements

Curl example to get all ad placements:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/ad_placements"

Response

{
  "ad_placements": [
    {
      "resource": "https://app.simpli.fi/api/ad_placements/1",
      "id": 1,
      "name": "Both In-App and In-Browser"
    },
    {
      "resource": "https://app.simpli.fi/api/ad_placements/2",
      "id": 2,
      "name": "In-App Only"
    },
    {
      "resource": "https://app.simpli.fi/api/ad_placements/3",
      "id": 3,
      "name": "In-Browser Only"
    }
  ]
}

Ad Sizes

Curl example to get all ad sizes:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/ad_sizes"

Response

{
  "ad_sizes": [
    {
      "resource": "https://app.simpli.fi/api/ad_sizes/7",
      "id": 7,
      "name": "120x60",
      "width": 120,
      "height": 60,
      "allowed_audio_companion_size": false
    }
  ]
}

Ad Template Groups

Listing ad_template_groups for dynamic ads that belong to an organization.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/ad_template_groups"

Response

{
  "ad_template_groups": [
    {
      "resource": "http://app.simpli.fi/api/organizations/5787/ad_template_groups/11",
      "ad_templates_count": 6,
      "id": 11,
      "name": "Ad Template One",
      "feed_vertical_id": 1
    }
  ]
}

HTTP Methods Supported

    GET
    POST
    DELETE

Creating an Ad Template Group

The POST body should be formatted as JSON and use the following format. The POST is only supported when nested within an organization context. The template_zip field is the Base64 encoded contents of the zipfile containing the ad templates.
Dynamic Ad Feed Example

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
  "ad_template_group": {
      "name":"Ad Template Group One",
      "template_zip": "RW1wbG95ZWUgSUQsUGhvdG8gSUQsRkEjLEZBIE5hbWUsQnJhbmNoICAgICAs\nU3RyZWV0ICxDaXR5ICxTdGF0ZSAsWmlwQ29kZSAgICAgICxDb3VudHkgICAg\nICAgICAgICAgICxDb3VuLEVtYWlsLFRlbCBObyxETUFfY2QgLEdlbixDYW5f\n"
    }
  }' \
  "https://app.simpli.fi/api/organizations/5787/ad_template_groups"

Getting a Specific Ad Template Group

Example - get ad_template_group 11:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/ad_template_group/11"

The JSON returned:

{
  "ad_template_groups": [
    {
      "resource": "http://app.simpli.fi/api/organizations/5787/ad_template_groups/11",
      "id": 11,
      "name": "Ad Template One",
      "feed_vertical_id": 1,
      "uses_headline_1": true,
      "uses_headline_2": false,
      "uses_headline_3": false,
      "uses_tagline_1": true,
      "uses_tagline_2": false,
      "uses_tagline_3": false,
      "uses_cta_1": true,
      "uses_cta_2": false,
      "uses_cta_3": false,
      "uses_primary_color": true,
      "uses_secondary_color": true,
      "uses_tertiary_color": false,
      "uses_quaternary_color": false,
      "uses_quinary_color": false,
      "uses_logo": true
    }
  ]
}

Deleting an Ad Template Group

Example - delete the ad_template_group with id 11:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/ad_template_groups/11"

Addressable Targets

Listing addressable targets that belong to an organization.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/3/addresses"

Response

{
  "addresses": [
    {
      "id": 75834,
      "name": "Test3",
      "user_count": 0,
      "days_inactive": 0,
      "active": false,
      "organization_id": 3,
      "file_status_display": "Finished",
      "resource": "https://app.simpli.fi/api/addresses/75834"
    }
  ],
  "paging": {
    "page": 1,
    "size": 10,
    "total": 1
  }
}

HTTP Methods Supported

    GET
    POST
    PUT
    DELETE

Query String Parameters
"search_term"

The search_term query string parameter looks for matches against the name of the addressable target.

Example:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/3/addresses?search_term=hat"

Creating an Addressable List Target

The POST body should be formatted as JSON and use the following format.

The POST is only supported when nested within an organization context.

Creating an addressable target is a 2-step process:

    Create the Target with a name. The response will come with an upload_url value.
    Upload the CSV file via PUT to the upload_url. This will return a head only 200 on success.

This URL can be used at any time to replace the addresses associated with the addressable target.

Required headers are address, city, state and zip.

Optional headers include latitude and longitude.

Please limit file to no more than one million rows.

The match type can be specified and will default to everyone if not specified.

Everyone
    first_party_segment_score_filter_attributes: { segment_score_filter_id: 1 } 
Frequent
    first_party_segment_score_filter_attributes: { segment_score_filter_id: 2 } 
Infrequent
    first_party_segment_score_filter_attributes: { segment_score_filter_id: 3 } 

Request

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "address": {
          "name": "Test2",
          "first_party_segment_score_filter_attributes": { "segment_score_filter_id": 1 }
        }
      }' \
  "https://app.simpli.fi/api/organizations/3/addresses"

Response

{
  "addresses": [
    {
      "id": 75836,
      "name": "Test6",
      "user_count": 0,
      "days_inactive": 0,
      "active": false,
      "organization_id": 3,
      "file_status_cd": 0,
      "file_status_display": "Empty",
      "resource": "https://app.simpli.fi/api/addresses/75836"
      "upload_results": [
        {
          "total_parsed": 10,
          "matched": 12,
          "unmatched": 0,
          "key": "upload_1533739175217.csv",
          "process_time": "2018-08-08 14:39:44"
        }
      ]
    }
  ],
  "upload_url": "https://app.simpli.fi/api/organizations/3/addresses/75836/upload"
}

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  --data-binary '@/Path/To/CSV/File' \
  "https://app.simpli.fi/api/organizations/3/addresses/75836/upload"

Creating an Addressable Curation Target

The POST body should be formatted as JSON and use the following format.

The POST is only supported when nested within an organization context.

Creating an addressable curation target is a 2-step process:

    Create the Target with a name and valid match criteria.
    Send a curation request with the same match criteria to the Target (See Curating an Addressable Audience that Belongs to an Organization).

The match type can be specified and will default to everyone if not specified.

Everyone
    first_party_segment_score_filter_attributes: { segment_score_filter_id: 1 } 
Frequent
    first_party_segment_score_filter_attributes: { segment_score_filter_id: 2 } 
Infrequent
    first_party_segment_score_filter_attributes: { segment_score_filter_id: 3 } 

Parameters
"data"

The data parameter defines the criteria to match against. Supported keys:

    states
    metro_codes
    postal_codes
    congressional_districts
    geo_radii (Exclude not supported)
    land_uses
    demographics (Any / all supported)

Each supports an array of includes and excludes (Georadii only accepts includes). At least one location parameter (any from: state, metro code, postal code, congressional district, geo radii) is required.
States

Values are the two character state abbreviations.

Example to include parcel in Texas:

{
  "match_criteria": {
    "states": {
      "includes": ["TX"]
    }
  }
}

Example to exclude parcel in Texas:

{
  "match_criteria": {
    "states": {
      "excludes": ["TX"]
    }
  }
}

Geo Radii

Values are the latitude, longitude and radius (in meters). All parcels with centroids falling within the radius are selected.

Example to include parcels within 170 meters of -87.123, 43.456:

{
  "match_criteria": {
    "geo_radii": {
      "includes": [{
        "lat": 43.456,
        "lon": -87.123,
        "radius_meters": 170
      }]
    }
  }
}

Metro Codes

Values are the metro codes. See Geo Targets for a listing of values.

Example to include parcels in Tampa-St. Petersburg (Sarasota), FL:

{
  "match_criteria": {
    "metro_codes": {
      "includes": ["539"]
    }
  }
}

Land Use

Values are land use ids. See Land Uses for a listing of values.

Example to include households in apartment buildings:

{
  "match_criteria": {
    "land_uses": {
      "includes": [7]
    }
  }
}

Postal Codes

Values are the 5 digit postal codes. Only U.S. postal codes are supported at this time.

Example to include parcels in postal code 76102:

{
  "match_criteria": {
    "postal_codes": {
      "includes": ["76102"]
    }
  }
}

Congressional Districts

Values are the congressional district in an ST-CD format where ST is the two letter state abbreviation and CD is the two digit congressional district number. See Congressional Districts for a listing of values.

Example to include parcels in the 2nd or 11th Texas Congressional Districts:

{
  "match_criteria": {
    "congressional_districts": {
      "includes": ["TX-02", "TX-11"]
    }
  }
}

Demographics

See Demographics for a listing of values.

Example to exclude parcels having residents with a college education, include parcels with age groups 18-24 or 25-34, career minded, high school or some college:

{
  "match_criteria": {
    "demographics": {
      "excludes": ["edu_college"],
      "includes": {
        "all": [
          [{
            "any": ["age_group_01", "age_group_02"]
          }],
          [{
            "any": ["career_minded"]
          }, {
            "any": ["edu_high_school", "edu_some_college"]
          }]
        ]
      }
    }
  }
}

The demographics include key supports for additional behaviors. Any and all keys are supported and define how person records within a household are evaluated. The "outer" any/all determines how households are matched, with any person matching the provided criteria or all people in the household matching the criteria. The "inner" any/all determines if the person should match any or all the criteria in that group (e.g. all of these hobbies or any of these hobbies).
Request

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "address": {
          "name": "Test Curation",
          "first_party_segment_score_filter_attributes": {
            "segment_score_filter_id": 1
          },
          "first_party_segment_match_criteria_attributes": {
            "data": {
              "land_uses": {
                "excludes": [7]
              },
              "metro_codes": {
                "includes": ["539"]
              },
              "demographics": {
                "excludes": ["edu_college"],
                "includes": {
                  "all": [
                    [{
                      "any": ["age_group_01", "age_group_02"]
                    }],
                    [{
                      "any": ["career_minded"]
                    }, {
                      "any": ["edu_high_school", "edu_some_college"]
                    }]
                  ]
                }
              }
            }
          }
        }
      }' \
  "https://app.simpli.fi/api/organizations/3/addresses"

Response

{
  "addresses": [
    {
      "id": 79792,
      "name": "Test Curation",
      "user_count": 0,
      "days_inactive": 0,
      "active": false,
      "organization_id": 3,
      "file_status_cd": 0,
      "file_status_display": "Empty",
      "cluster_artifact_url": null,
      "cluster_tile_base": "https://geo-artifact.simpli.fi/clusters/4/",
      "parcel_tile_base": "https://sifi-tiles-prod.simpli.fi/tiles/segment_tiles/4/",
      "parcel_lat_lon_base": "https://sifi-tiles-prod.simpli.fi/tiles/parcel_lat_lon/",
      "match_stats": {
        "uploaded_address_count": 0,
        "matched_address_count": 0,
        "unmatched_address_count": 0,
        "percent_matched": "0%",
        "segment_version": 0,
        "status_type": null
      },
      "audience_type": "Curated*",
      "resource": "https://app.simpli.fi/api/addresses/75836",
      "match_criteria": {
        "land_uses": {
          "includes": [],
          "excludes": [7]
        },
        "metro_codes": {
          "includes": ["539"],
          "excludes": []
        },
        "demographics": {
          "excludes": ["edu_college"],
          "includes": {
            "any": [
              [{
                "any": ["age_group_01", "age_group_02"]
              }],
              [{
                "any": ["career_minded"]
              }, {
                "any": ["edu_high_school", "edu_some_college"]
              }]
            ]
          }
        },
        "congressional_districts": {
          "includes": [],
          "excludes": []
        },
        "geo_radii": {
          "includes": [],
          "excludes": []
        },
        "postal_codes": {
          "includes": [],
          "excludes": []
        },
        "states": {
          "includes": [],
          "excludes": []
        }
      },
      "match_type_id": 1,
      "recency_id": 4
    }
  ],
  "upload_url": "https://app.simpli.fi/api/organizations/3/addresses/75836/upload"
}

Getting a Specific Addressable Target

Example - get addressable target 75835:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/addresses/75835"

Response

{
  "addresses": [
    {
      "id": 75835,
      "name": "Test5",
      "user_count": 0,
      "days_inactive": 0,
      "active": false,
      "organization_id": 3,
      "file_status_display": "Empty",
      "resource": "https://app.simpli.fi/api/addresses/75835"
      "upload_results": [
        {
          "total_parsed": 10,
          "matched": 12,
          "unmatched": 0,
          "key": "upload_1533739175217.csv",
          "process_time": "2018-08-08 14:39:44"
        }
      ]
    }
  ],
  "upload_url": "https://app.simpli.fi/api/organizations/3/addresses/75835/upload"
}

Updating an Addressable Target

The only field which may be updated directly is name.

Example - update the name of the addressable target with id 75836:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "address": {
          "name":  "My Better Addressable Target Name"
        }
      }' \
  "https://app.simpli.fi/api/addresses/75836"

Deleting an Addressable Target

Deleting an addressable target is permanent.

Example - delete the addressable target with id 75836:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/addresses/75836"

Deleting Multiple Addressable Targets

Example - delete the addressable targets with id 75833 and 75834:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "ids": [75833, 75834]
      }'
  "https://app.simpli.fi/api/organizations/3/addresses/delete_many"

Curating an Addressable Audience that Belongs to an Organization

In order for your Addressable Curation Target to begin matching parcels, you must trigger a curation. To find the status of your curation, please use the addresses show endpoint or search for the address belonging to the organization by the name of the address.

A completed curation will return json in its upload_results parameter akin to:

"upload_results": [
  {
    "total_parsed": 0,
    "matched": 2390,
    "unmatched": 0,
    "key": "UNIQUE_KEY",
    "segment_version": null,
    "status_type": "curate",
    "process_time": "YYYY-MM-DD HH:MM:SS"
  }
]

Request

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/3/addresses/4/curate"

Response

A 2xx response code indicates success. Errors will be provided in the response if any issues arise processing the request.
Ads

Listing ads that belong to a campaign.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/697/ads"

Response

{
  "ads": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaigns/697/ads/1098",
      "id": 1098,
      "name": "image after all deleted",
      "status": "Active",
      "pacing": 100.0,
      "creative_group_id": 1,
      "click_tag_verified": false,
      "preview_tag": "<iframe src="//adspreview.simpli.fi/ads/development/697/1098/ad.html?sifitest=true&sifi_uid=&sifi_exchange_uid=&cb=9573207624&sifi=5825,697,1098,0,10,0,0,0,0,0,0,v,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,dalbid1,0,0,0,0,0,0,0,NoPC&request_id=42&dp_tmp=&sifi_kw=tv" width="160"  height="90" frameborder="0" marginwidth="0" marginheight="0"  scrolling="no"></iframe>",
      "target_url": "http://simpli.fi",
      "primary_creative": "img_160x88.png",
      "primary_creative_url": "https://adspreview.simpli.fi/ads/live/697/1098/0412c.jpg",
      "dynamic_ad_feed_id": 123,
      "feed_filter_id": null,
      "extra_html": null,
      "actions": [
        {
          "pause": {
            "href": "https://app.simpli.fi/api/organizations/8/campaigns/697/ads/1098/pause",
            "method": "POST"
          }
        },
        {
          "verify_click_tag": {
            "href": "https://app.simpli.fi/api/organizations/8/campaigns/697/ads/1098/verify_click_tag?cb=9573207624",
            "method": "POST"
          }
        }
      ],
      "resources": [
        {
          "ad_file_types": "https://app.simpli.fi/api/ad_file_types/1"
        },
        {
          "ad_sizes": "https://app.simpli.fi/api/ad_sizes/10"
        },
        {
          "ad_placements": "https://app.simpli.fi/api/ad_placements/1"
        },
        {
          "creative_groups": "https://app.simpli.fi/api/creative_groups/1"
        }
      ]
    }
  ]
}

HTTP Methods Supported

    GET
    POST
    PUT
    DELETE

Possible Statuses

The Ads resources has the following possible values for the status:

    Active
    Paused
    Deleted

Query String Params
Filter

You can pass a filter query string param to limit the result set by ad status. The status can be filtered by active or paused.

Example:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads?filter=status%3Dpaused"

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads?filter=status%3Dactive"

Include

You can include/nest in the response the following resources:

    AdFileTypes
    AdSizes
    AdPlacement

Example:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads?include=ad_file_types"

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/697/ads?include=ad_sizes"

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/697/ads?include=ad_sizes,ad_file_types,ad_placement"

Allow Deleted

Deleted ads are not included in the response by default. In order to include deleted ads pass the optional parameter allow_deleted with value true.

Ads that have been deleted for more than 6 months return a null preview_tag and primary_creative_url. The ad files are not kept more than 6 months after the ad is deleted.

Example:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads?allow_deleted=true"

Attributes Only

If attributes_only is set to true then only the attributes of ads will be included in the response and the lists of actions and resources will be omitted. This reduces the amount of data in the response. This parameter may also be applied when getting a single ad.

Example: ?attributes_only=true"
Ad Placement

If ad_placement_id is set to null then the ad will use the campaign ad placement settings. This is the default.
Creating an Ad

The POST body should be formatted as JSON and use the following format. The POST is only supported when nested within an Organization, Campaign context.

Note: All HTML5 ads are now validated upon POST in accordance with the IAB Specifications.
HTML example

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "ad": {
          "name": "My Advanced Ad",
          "ad_file_type_id": "4",
          "ad_size_id": "1",
          "ad_placement_id": 3,
          "target_url": "http://simpli.fi",
          "html": "<a href=\"http://www.simpli.fi\" target=\"_blank\">Simpli.fi</a>",
          "extra_html": "<div>This is some optional html</div>"
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads"

HTML5 example

HTML5 ads are uploaded as a .zip file. For example, given a file named "my-ad.zip" containing:

my-ad/
├── functionality.js
├── icon.svg
├── index.html
├── logo.jpg
└── styles.css

it can be uploaded as an HTML5 ad with a POST request with ad_file_type_id set to 9:

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
-H "Content-Type: multipart/form-data" \
-F "ad[name]=My html5 ad example" \
-F "ad[target_url]=https://simpli.fi" \
-F "ad[ad_file_type_id]=9" \
-F "ad[ad_size_id]=2" \
-F "ad[primary_creative]=@my-ad.zip;type=application/zip" \
"https://app.simpli.fi/api/organizations/8/campaigns/646/ads"

Image example

The POST Content-Type should be set to multipart/form-data.

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: multipart/form-data" \
  -F "ad[name]=My image ad example" \
  -F "ad[alt_text]=Alternate text 125 characters or less" \
  -F "ad[target_url]=http://simpli.fi" \
  -F "ad[pacing]=100" \
  -F "ad[ad_file_type_id]=1" \
  -F "ad[ad_size_id]=2" \
  -F "ad[primary_creative]=@a728x90.jpg;type=image/jpeg" \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads"

The ad[alt_text] field is an optional field which contains the text to be placed in the HTML alt attribute. The field accepts a string of text 125 characters or less in length.
Facebook example

Creating a Facebook ad is no longer supported.
Flash example

Creating a Flash ad is no longer supported.
Click-To-Call example

Creating a Click-To-Call ad is no longer supported.
Video example

This example shows how to create a video ad by uploading a video file to Simpli.fi. Third party impression and click tracking tags are supported. Third party VAST tags are not supported by this ad type.

The POST Content-Type should be set to multipart/form-data.

Unless at least one playback_method_id is included, all Playback Methods will be active. Refer to Playback Methods for details of the available ids.

Unless at least one video_ad_type_id is included, all Video Ad Types will be associated. Refer to Video Ad Types for details of the available ids.

The ad may still be created even if the video does not meet the recommended guidelines. A summary the video properties that were not met is returned in the warning_message field.

Third party impression tracking and click tracking are supported by the impression_tracking and click_tracking fields. These are optional fields that may each appear up to three times. Only one URL is supported per field. Each URL must begin with https://

Preferred Video Properties:

    Video format: mp4 (h.264 codec) Other formats: 3gp, avi, m4v, mov, or mpeg
    Dimensions: 768x576 px
    Video bit rate: 5.4 Mbps or higher
    Audio bit rate: 160 kbps or higher
    Max file size: 200 MB

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: multipart/form-data" \
  -F "ad[name]=My Video ad" \
  -F "ad[target_url]=http://simpli.fi" \
  -F "ad[ad_file_type_id]=6" \
  -F "ad[title]=Must be 25 chars or less" \
  -F "ad[playback_method_ids][]=1" \
  -F "ad[playback_method_ids][]=2" \
  -F "ad[video_ad_type_ids][]=3" \
  -F "ad[video_ad_type_ids][]=4" \
  -F "ad[impression_tracking][]=http://myvideoimpressiontracking.com" \
  -F "ad[click_tracking][]=http://myvideoclicktracking.com" \
  -F "ad[primary_creative]=@qwe_960x540_10sec.mov;type=video/quicktime"  \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/ads"

Third Party Video example

The video ad for a third party video ad is specified as a URL to a valid VAST tag. The VAST tag must contain a VAST 2.0 compliant ad or VPAID 2.0 compliant ad. The VPAID ad should be wrapped in a VAST tag. All third party tracking should be included in the VAST tag. Third party video ads do not upload a video file to Simpli.fi.

The POST Content-Type should be set to multipart/form-data.

Unless at least one playback_method_id is included, all Playback Methods will be active. Refer to Playback Methods for details of the available ids.

Unless at least one video_ad_type_id is included, all Video Ad Types will be associated. Refer to Video Ad Types for details of the available ids.

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: multipart/form-data" \
  -F "ad[name]=Mixpo video" \
  -F "ad[target_url]=http://www.simpli.fi" \
  -F "ad[ad_file_type_id]=7" \
  -F "ad[playback_method_ids][]=1" \
  -F "ad[playback_method_ids][]=2" \
  -F "ad[playback_method_ids][]=3" \
  -F "ad[video_ad_type_ids][]=1" \
  -F "ad[video_ad_type_ids][]=2" \
  -F "ad[video_ad_type_ids][]=3" \
  -F "ad[video_ad_type_ids][]=4" \
  -F "ad[third_party_vast_tag]=http://your_vast_tag_url" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/ads"

Creating dynamic ads

Dynamic ads can be created from an ad template group and a dynamic ad feed

Ad branding must be included for dynamic ads. Not all ad branding fields may be necessary for the template.

    dynamic_type_id - dynamic ad type
    feed_id - dynamic ad feed
    template_id - ad template group
    logo:{base64:} - Base64 encoded image file

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
  "ad": {
    "template_id":11,
    "dynamic_type_id":1,
    "default_url":"https://www.dynamic.com",
    "default_pacing":100,
    "feed_id":1016,
    "ad_branding":{
      "headline_1":"headline1",
      "headline_2":"headline2",
      "headline_3":"headline3",
      "tagline_1":"tagline1",
      "tagline_2":"tagline2",
      "tagline_3":"tagline3",
      "cta_1":"Call To Action1",
      "cta_2":"Call To Action2",
      "cta_3":"Call To Action3",
      "primary_color":"#c0c0c0",
      "secondary_color":"#c1c1c1",
      "tertiary_color":"#c2c2c2",
      "quaternary_color":"#c3c3c3",
      "quinary_color":"#c4c4c4",
      "logo":{
        "filetype":"image/png",
        "filename":"image.png",
        "base64":"iVBORw0KGgoAAAANSUhEUgAABdwAAAOeCAYAAAAZddI5AAAACXBIWXMAAC4j"
      }
    }
  }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads/create_from_template"

Updating the ad branding on a dynamic ad

The ad branding on a dynamic may be updated. This will create a new ad branding used by the ad.

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
  "ad_branding":{
    "headline_1":"headline1",
    "headline_2":"headline2",
    "headline_3":"headline3",
    "tagline_1":"tagline1",
    "tagline_2":"tagline2",
    "tagline_3":"tagline3",
    "cta_1":"Call To Action1",
    "cta_2":"Call To Action2",
    "cta_3":"Call To Action3",
    "primary_color":"#c0c0c0",
    "secondary_color":"#c1c1c1",
    "tertiary_color":"#c2c2c2",
    "quaternary_color":"#c3c3c3",
    "quinary_color":"#c4c4c4",
    "logo":{
      "filetype":"image/png",
      "filename":"image.png",
      "base64":"iVBORw0KGgoAAAANSUhEUgAABdwAAAOeCAYAAAAZddI5AAAACXBIWXMAAC4j"
    }
  }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads/82/update_ad_branding"

Creating native ads

Native ads can be created in a way similar to image ads, with some additional fields. An icon image can be specified, using the icon field, with a minimum size of 120x120 px. Optional fields available to native ads are title, body and call_to_action. These fields have 25, 90 and 15 character length limits, respectively. Native ads also carry size requirements other than those of image ads: their width must be within the range of 400..2400 and their ratio within the range of 1.88..1.94.

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: multipart/form-data" \
  -F "ad[name]=My native ad example" \
  -F "ad[alt_text]=Alternate text 125 characters or less" \
  -F "ad[target_url]=http://simpli.fi" \
  -F "ad[pacing]=100" \
  -F "ad[ad_file_type_id]=10" \
  -F "ad[ad_size_id]=2" \
  -F "ad[title]=title" \
  -F "ad[body]=body" \
  -F "ad[call_to_action]=call to action" \
  -F "ad[icon]=@icon.png;type=image/png" \
  -F "ad[primary_creative]=@a728x90.jpg;type=image/jpeg" \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads"

Getting an Ad

Example - get ad 963 for campaign 646:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads/963"

Alternative shorter syntax:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/ads/963"

The JSON returned:

{
  "ads": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaigns/646/ads/963",
      "id": 963,
      "name": "My image ad example",
      "status": "Active",
      "pacing": 100.0,
      "click_tag_verified": false,
      "preview_tag": "<iframe src=\"http://adspreview.simpli.fi/ads/646/963/ad.html?sifitest=true&sifi_uid=&sifi_exchange_uid=&cb=9453197521&sifi=5408,646,963,0,2,0,0,0,0,0,0,v,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,dalbid1,0,0,0,0,0,0,0,NoPC&request_id=42&dp_tmp=&sifi_kw=tv\" width=\"728\" height=\"90\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\"></iframe>",
      "target_url": "http://simpli.fi",
      "primary_creative": "a728x90.jpg",
      "primary_creative_url": "https://adspreview.simpli.fi/ads/live/646/963/0b143.jpg",
      "extra_html": null,
      "actions": [
        {
          "pause": {
            "href": "https://app.simpli.fi/api/organizations/8/campaigns/646/ads/963/pause",
            "method": "POST"
          }
        },
        {
          "verify_click_tag": {
            "href": "https://app.simpli.fi/api/organizations/8/campaigns/646/ads/963/verify_click_tag?cb=9453197521",
            "method": "POST"
          }
        }
      ],
      "resources": [
        {
          "ad_file_types": "https://app.simpli.fi/api/ad_file_types/1"
        },
        {
          "ad_sizes": "https://app.simpli.fi/api/ad_sizes/2"
        }
      ]
    }
  ]
}

Getting a List of Ads

Example - get ads 1 and 35, invalid ad 963 and non-permitted ad 760 for campaigns the user has access to:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/ads/bulk_ads?ids=963,1,35,760"

The JSON returned:

{
  "ads": [
    {
      "resource": "https://app.simpli.fi/api/organizations/5788/campaigns/3/ads/35",
      "id": 35,
      "name": "DotIcon.jpg",
      "status": "Active",
      "pacing": 100.0,
      "creative_group_id": null,
      "click_tag_verified": null,
      "preview_tag": "\u003ciframe src=\"//app.simpli.fi/ads/development/3/35/ad.html?sifitest=true\u0026sifi_uid=\u0026sifi_exchange_uid=\u0026cb=7538063051\u0026sifi=7003,3,35,0,27,0,0,0,0,0,0,v,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,dalbid1,0,0,0,0,0,0,0,NoPC,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5788\u0026request_id=42\u0026dp_tmp=\u0026sifi_kw=tv\" width=\"88\"  height=\"31\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"  scrolling=\"no\"\u003e\u003c/iframe\u003e",
      "target_url": "http://simpli.fi",
      "primary_creative": "DotIcon.jpg",
      "primary_creative_url": "https://adspreview.simpli.fi/ads/live/3/35/a1fe7.jpg",
      "alt_text": null,
      "extra_html": null,
      "actions": [
        {
          "pause": {
            "href": "https://app.simpli.fi/api/organizations/5788/campaigns/3/ads/35/pause",
            "method": "POST"
          }
        },
        {
          "verify_click_tag": {
            "href": "https://app.simpli.fi/api/organizations/5788/campaigns/3/ads/35/verify_click_tag?cb=7538063051",
            "method": "POST"
          }
        }
      ],
      "resources": [
        {
          "ad_file_types": "https://app.simpli.fi/api/ad_file_types/1"
        },
        {
          "ad_sizes": "https://app.simpli.fi/api/ad_sizes/27"
        }
      ]
    },
    {
      "resource": "https://app.simpli.fi/api/organizations/5788/campaigns/3/ads/1",
      "id": 1,
      "name": "testingnewname",
      "status": "Active",
      "pacing": 100.0,
      "creative_group_id": null,
      "click_tag_verified": null,
      "preview_tag": "\u003ciframe src=\"//app.simpli.fi/ads/development/3/1/ad.html?sifitest=true\u0026sifi_uid=\u0026sifi_exchange_uid=\u0026cb=6366189220\u0026sifi=7003,3,1,0,27,0,0,0,0,0,0,v,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,dalbid1,0,0,0,0,0,0,0,NoPC,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5788\u0026request_id=42\u0026dp_tmp=\u0026sifi_kw=tv\" width=\"88\"  height=\"31\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"  scrolling=\"no\"\u003e\u003c/iframe\u003e",
      "target_url": "http://simpli.fi",
      "primary_creative": "DotIcon.jpg",
      "primary_creative_url": "https://adspreview.simpli.fi/ads/live/3/1/a1fe7.jpg",
      "alt_text": null,
      "extra_html": null,
      "actions": [
        {
          "pause": {
            "href": "https://app.simpli.fi/api/organizations/5788/campaigns/3/ads/1/pause",
            "method": "POST"
          }
        },
        {
          "verify_click_tag": {
            "href": "https://app.simpli.fi/api/organizations/5788/campaigns/3/ads/1/verify_click_tag?cb=6366189220",
            "method": "POST"
          }
        }
      ],
      "resources": [
        {
          "ad_file_types": "https://app.simpli.fi/api/ad_file_types/1"
        },
        {
          "ad_sizes": "https://app.simpli.fi/api/ad_sizes/27"
        }
      ]
    }
  ],
  "not_valid_ad_ids": ["963"],
  "not_permitted_ad_ids": ["760"]
}

Preview Only

You can pass a preview_only query param to return only the preview URL for the requested ads.

Example - get ads 1 and 35, invalid ad 963 and non-permitted ad 760 for campaigns the user has access to:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/ads/bulk_ads?ids=963,1,35,760&preview_only=true"

The JSON returned:

{
  "ads": [
    {
      "id": 35,
      "name": "DotIcon.jpg",
      "preview_tag": "\u003ciframe src=\"//app.simpli.fi/ads/development/3/35/ad.html?sifitest=true\u0026sifi_uid=\u0026sifi_exchange_uid=\u0026cb=7538063051\u0026sifi=7003,3,35,0,27,0,0,0,0,0,0,v,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,dalbid1,0,0,0,0,0,0,0,NoPC,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5788\u0026request_id=42\u0026dp_tmp=\u0026sifi_kw=tv\" width=\"88\"  height=\"31\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"  scrolling=\"no\"\u003e\u003c/iframe\u003e"
    },
    {
      "id": 1,
      "name": "testingnewname",
      "preview_tag": "\u003ciframe src=\"//app.simpli.fi/ads/development/3/1/ad.html?sifitest=true\u0026sifi_uid=\u0026sifi_exchange_uid=\u0026cb=6366189220\u0026sifi=7003,3,1,0,27,0,0,0,0,0,0,v,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,dalbid1,0,0,0,0,0,0,0,NoPC,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5788\u0026request_id=42\u0026dp_tmp=\u0026sifi_kw=tv\" width=\"88\"  height=\"31\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"  scrolling=\"no\"\u003e\u003c/iframe\u003e"
    }
  ],
  "not_valid_ad_ids": ["963"],
  "not_permitted_ad_ids": ["760"]
}

Updating an Ad

The PUT body should use the same format as Create. The PUT is only supported when nested within an Organization context.
Bid Types

Curl example to get all bid types:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/bid_types"

Response

{
  "bid_types": [
    {
      "resource": "https://app.simpli.fi/api/bid_types/1",
      "id": 1,
      "name": "CPM"
    }
  ]
}

Browsers

Curl example to get all browsers:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/browsers"

Response

{
  "browsers": [
    {
      "resource": "https://app.simpli.fi/api/browsers/601",
      "id": 601,
      "name": "Firefox"
    }
  ]
}

Budget Plans

Listing budget_plans that belong to a campaign.

Only the appropriate budget/impressions fields will be present.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/2/budget_plans"

Response

{
  "budget_plans": [
    {
      "id": 12,
      "start_date": "2024-10-01",
      "end_date": "2024-10-31",
      "total_budget": 2500.00,
      "adjusted_budget": 2500.00,
      "spent_budget": 0.00,
      "total_impressions": 1000,
      "adjusted_impressions": 1000,
      "spent_impressions": 0,
      "available_rollover": true,
      "resource": "https://app.simpli.fi/api/budget_plans/12"
    },
    ... Not showing all budget plans in the output ...
    ... Only budget or impressions values will be shown ...
  ]
}

HTTP Methods Supported

    GET
    POST
    PUT
    DELETE

Creating a Budget Plan

The POST body should be formatted as JSON and use the following format. The POST is only supported when nested within a campaign context.
Budget Plan Example

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "start_date": "2024-11-01",
        "end_date": "2024-11-30",
        "total_budget": 25000,
        "total_impressions": 1000
      }' \
  "https://app.simpli.fi/api/campaigns/2/budget_plans"

Getting a Specific Budget Plan

Example - get budget_plan with id 12:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/budget_plans/12"

The JSON returned:

{
  "budget_plans": [
    {
      "id": 12,
      "start_date": "2024-10-01",
      "end_date": "2024-10-31",
      "total_budget": 2500.00,
      "adjusted_budget": 2500.00,
      "spent_budget": 0.00,
      "total_impressions": 1000,
      "adjusted_impressions": 1000,
      "spent_impressions": 0,
      "available_rollover": true,
      "resource": "https://app.simpli.fi/api/budget_plans/12"
    }
    ... Only budget or impressions values will be shown ...
  ]
}

Updating a Budget Plan

Example - update budget_plan with id 12:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "start_date": "2024-10-01",
        "end_date": "2024-10-31",
        "total_budget": 25000,
        "total_impressions": 1000
      }' \
  "https://app.simpli.fi/api/budget_plans/12"

Deleting a Budget Plan

Example - delete the budget_plan with id 12:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/budget_plans/12"

Rollover Budget Plan Unspent Budget/Impressions to Next Available Budget Plan

This will rollover any unspent budget/impressions from the budget plan to the next available budget plan.

Before rollover next...

{
  "budget_plans": [
    {
      "id": 12,
      "start_date": "2024-09-01",
      "end_date": "2024-09-30",
      "total_budget": 2500.00,
      "adjusted_budget": 2500.00,
      "spent_budget": 2000.00,
      "available_rollover": true,
      "resource": "https://app.simpli.fi/api/budget_plans/12"
    },
    {
      "id": 13,
      "start_date": "2024-10-01",
      "end_date": "2024-10-31",
      "total_budget": 1000.00,
      "adjusted_budget": 1000.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/13"
    },
    {
      "id": 14,
      "start_date": "2024-11-01",
      "end_date": "2024-11-30",
      "total_budget": 1000.00,
      "adjusted_budget": 1000.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/14"
    }
  ]
}

Example - rollover next budget_plan with id 12:
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/budget_plans/12/rollover_next"

Response

{
  "budget_plans": [
    {
      "id": 12,
      "start_date": "2024-09-01",
      "end_date": "2024-09-30",
      "total_budget": 2500.00,
      "adjusted_budget": 2000.00,
      "spent_budget": 2000.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/12"
    },
    {
      "id": 13,
      "start_date": "2024-10-01",
      "end_date": "2024-10-31",
      "total_budget": 1500.00,
      "adjusted_budget": 1500.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/13"
    },
    {
      "id": 14,
      "start_date": "2024-11-01",
      "end_date": "2024-11-30",
      "total_budget": 1000.00,
      "adjusted_budget": 1000.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/14"
    }
  ]
}

Rollover Budget Plan Unspent Budget/Impressions Evenly to Available Budget Plans

This will rollover any unspent budget/impressions from the budget plan evenly to available budget plans.

Before rollover even...

{
  "budget_plans": [
    {
      "id": 12,
      "start_date": "2024-09-01",
      "end_date": "2024-09-30",
      "total_budget": 2500.00,
      "adjusted_budget": 2500.00,
      "spent_budget": 2000.00,
      "available_rollover": true,
      "resource": "https://app.simpli.fi/api/budget_plans/12"
    },
    {
      "id": 13,
      "start_date": "2024-10-01",
      "end_date": "2024-10-31",
      "total_budget": 1000.00,
      "adjusted_budget": 1000.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/13"
    },
    {
      "id": 14,
      "start_date": "2024-11-01",
      "end_date": "2024-11-30",
      "total_budget": 1000.00,
      "adjusted_budget": 1000.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/14"
    }
  ]
}

Example - rollover even budget_plan with id 12:
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/budget_plans/12/rollover_even"

Response

{
  "budget_plans": [
    {
      "id": 12,
      "start_date": "2024-09-01",
      "end_date": "2024-09-30",
      "total_budget": 2500.00,
      "adjusted_budget": 2000.00,
      "spent_budget": 2000.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/12"
    },
    {
      "id": 13,
      "start_date": "2024-10-01",
      "end_date": "2024-10-31",
      "total_budget": 1250.00,
      "adjusted_budget": 1250.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/13"
    },
    {
      "id": 14,
      "start_date": "2024-11-01",
      "end_date": "2024-11-30",
      "total_budget": 1250.00,
      "adjusted_budget": 1250.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/14"
    }
  ]
}

Rollover Budget Plan Unspent Budget/Impressions to a New Budget Plan

This will rollover any unspent budget/impressions from the budget plan to a new budget plan.

Before rollover new...

{
  "budget_plans": [
    {
      "id": 12,
      "start_date": "2024-09-01",
      "end_date": "2024-09-30",
      "total_budget": 2500.00,
      "adjusted_budget": 2500.00,
      "spent_budget": 2000.00,
      "available_rollover": true,
      "resource": "https://app.simpli.fi/api/budget_plans/12"
    }
  ]
}

Example - rollover new budget_plan with id 12:
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/budget_plans/12/rollover_new"

Response

{
  "budget_plans": [
    {
      "id": 12,
      "start_date": "2024-09-01",
      "end_date": "2024-09-30",
      "total_budget": 2500.00,
      "adjusted_budget": 2000.00,
      "spent_budget": 2000.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/12"
    },
    {
      "id": 13,
      "start_date": "2024-10-09",
      "end_date": "2024-10-09",
      "total_budget": 500.00,
      "adjusted_budget": 500.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/13"
    }
  ]
}

Campaigns with Available Budget Plan Rollover

This will find campaigns under an organization that utilize budget plans and have available rollover.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/0/campaigns/with_available_rollover"

You may also set the query parameter children=true if you want to see campaigns for child organizations additionally.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/0/campaigns/with_available_rollover?children=true"

Response

{
  "campaigns": [
    {
      "id": 2,
      "name": "My best campaign yet!",
      "organization_id": 0,
      "remaining_budget": 6000.00,
      "actions": [
        {
          "rollover_next": {
            "href": "https://app.simpli.fi/api/campaigns/2/rollover_next",
            "method": "PUT"
          }
        },
        {
          "rollover_even": {
            "href": "https://app.simpli.fi/api/campaigns/2/rollover_even",
            "method": "PUT"
          }
        }
      ]
    }
  ]
}

Rollover All Budget Plans from a Campaign with Available Rollover to the Next Available Budget Plan

This will rollover any unspent budget/impressions from all the budget plans with available rollover to the next available budget plan.

Before campaign rollover next...

{
  "budget_plans": [
    {
      "id": 11,
      "start_date": "2024-08-01",
      "end_date": "2024-08-31",
      "total_budget": 3500.00,
      "adjusted_budget": 3500.00,
      "spent_budget": 3000.00,
      "available_rollover": true,
      "resource": "https://app.simpli.fi/api/budget_plans/11"
    },
    {
      "id": 12,
      "start_date": "2024-09-01",
      "end_date": "2024-09-30",
      "total_budget": 2500.00,
      "adjusted_budget": 2500.00,
      "spent_budget": 2000.00,
      "available_rollover": true,
      "resource": "https://app.simpli.fi/api/budget_plans/12"
    },
    {
      "id": 13,
      "start_date": "2024-10-01",
      "end_date": "2024-10-31",
      "total_budget": 1000.00,
      "adjusted_budget": 1000.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/13"
    },
    {
      "id": 14,
      "start_date": "2024-11-01",
      "end_date": "2024-11-30",
      "total_budget": 1000.00,
      "adjusted_budget": 1000.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/14"
    }
  ]
}

Example - campaign rollover next campaign with id 2:
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/2/rollover_next"

Response

{
  "budget_plans": [
    {
      "id": 11,
      "start_date": "2024-08-01",
      "end_date": "2024-08-31",
      "total_budget": 3500.00,
      "adjusted_budget": 3000.00,
      "spent_budget": 3000.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/11"
    },
    {
      "id": 12,
      "start_date": "2024-09-01",
      "end_date": "2024-09-30",
      "total_budget": 2500.00,
      "adjusted_budget": 2000.00,
      "spent_budget": 2000.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/12"
    },
    {
      "id": 13,
      "start_date": "2024-10-01",
      "end_date": "2024-10-31",
      "total_budget": 2000.00,
      "adjusted_budget": 2000.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/13"
    },
    {
      "id": 14,
      "start_date": "2024-11-01",
      "end_date": "2024-11-30",
      "total_budget": 1000.00,
      "adjusted_budget": 1000.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/14"
    }
  ]
}

Rollover All Budget Plans from a Campaign with Available Rollover Evenly to Available Budget Plans

This will rollover any unspent budget/impressions from all the budget plans with available rollover evenly to available budget plans.

Before campaign rollover even...

{
  "budget_plans": [
    {
      "id": 11,
      "start_date": "2024-08-01",
      "end_date": "2024-08-31",
      "total_budget": 3500.00,
      "adjusted_budget": 3500.00,
      "spent_budget": 3000.00,
      "available_rollover": true,
      "resource": "https://app.simpli.fi/api/budget_plans/11"
    },
    {
      "id": 12,
      "start_date": "2024-09-01",
      "end_date": "2024-09-30",
      "total_budget": 2500.00,
      "adjusted_budget": 2500.00,
      "spent_budget": 2000.00,
      "available_rollover": true,
      "resource": "https://app.simpli.fi/api/budget_plans/12"
    },
    {
      "id": 13,
      "start_date": "2024-10-01",
      "end_date": "2024-10-31",
      "total_budget": 1000.00,
      "adjusted_budget": 1000.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/13"
    },
    {
      "id": 14,
      "start_date": "2024-11-01",
      "end_date": "2024-11-30",
      "total_budget": 1000.00,
      "adjusted_budget": 1000.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/14"
    }
  ]
}

Example - campaign rollover even campaign with id 2:
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/2/rollover_even"

Response

{
  "budget_plans": [
    {
      "id": 11,
      "start_date": "2024-08-01",
      "end_date": "2024-08-31",
      "total_budget": 3500.00,
      "adjusted_budget": 3000.00,
      "spent_budget": 3000.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/11"
    },
    {
      "id": 12,
      "start_date": "2024-09-01",
      "end_date": "2024-09-30",
      "total_budget": 2500.00,
      "adjusted_budget": 2000.00,
      "spent_budget": 2000.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/12"
    },
    {
      "id": 13,
      "start_date": "2024-10-01",
      "end_date": "2024-10-31",
      "total_budget": 1500.00,
      "adjusted_budget": 1500.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/13"
    },
    {
      "id": 14,
      "start_date": "2024-11-01",
      "end_date": "2024-11-30",
      "total_budget": 1500.00,
      "adjusted_budget": 1500.00,
      "spent_budget": 0.00,
      "available_rollover": false,
      "resource": "https://app.simpli.fi/api/budget_plans/14"
    }
  ]
}

Campaign Addresses

The campaign_addresses are addressable targets that have been added to a campaign.
Requirements for Addressable Target Added to a Campaign

    The organization that the campaign belongs to must be authorized for the addressable target. A signed addressable geo-fencing addendum must be on file as a prerequisite to authorization.

Refer to the Addressable Targets for details of how to find the available addressable targets to add to a campaign as a retargeting segment.

Listing campaign_addresses for a campaign:
Request

curl -s -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/904/campaign_addresses"

Response

{
  "campaign_addresses": [
    {
      "resource": "https://app.simpli.fi/api/campaign_addresses/187",
      "id": 187,
      "campaign_id": 904,
      "address_id": 300987,
      "segment_type_id": 2,
      "warning_message": null
    },
    {
      "resource": "https://app.simpli.fi/api/campaign_addresses/188",
      "id": 188,
      "campaign_id": 904,
      "address_id": 309165,
      "segment_type_id": 2,
      "warning_message": null
    },
    ... Not showing all campaign addresses in the output ...
  ],
  "paging": {
    "page": 1,
    "size": 10,
    "total": 8
  }
}

The warning_message field contains details of any issues with the addressable targets in the campaign. The field is null if there are no issues.
HTTP Methods Supported

    GET
    PUT

Changes to Campaign Addressable Targets

The change endpoint is used for all modifications to the campaign_addresses. This includes adding, updating, and deleting the campaign_addresses on a campaign. It does not allow modification of the actual addressable target that is used by the campaign. The change endpoint allows bulk actions to be performed. Multiple campaign_addresses can be added, updated, or removed in one action.

The example payload below does the following:

    Add two addressable targets to the campaign.
        address_id 303405 is added. It is set with segment_target_type_id of 2 for 'Include' or 'Opt-in'.
        address_id 304595 is added.
    Remove campaign_addresses with ids 187 and 188. These are the campaign_address_ids not the address_id.
    Update campaign_address with id 190. The segment_target_type_id is changed to 2 for 'Include'.
    Set the segment_match_type field to any which means that if any of the addressable targets match a user it is considered a match. The site_retargeting_segments_match_type field is also a valid parameter in this case but it has been deprecated in favor of segment_match_type.

curl -s -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_first_party_segments": {
          "add": [
            {
              "address_id": 303405,
              "segment_target_type_id": 2
            },
            {
              "address_id": 304595,
              "segment_target_type_id": 2
            }
          ],
          "delete": [187, 188],
          "update": [
            {
              "id": 190,
              "segment_target_type_id": 2
            }
          ],
          "segment_match_type": "any"
        }
      }' \
  "https://app.simpli.fi/api/campaigns/904/campaign_addresses/change"

Response

{
  "summary": "4 Retargeting Segments Matching Any",
  "added": {
    "count": 2
  },
  "updated": {
    "count": 1
  },
  "deleted": {
    "count": 2
  },
  "segment_match_type": "any"
}

Updating the "segment_match_type" Field

This example updates the segment_match_type field to all which means that all of the retargeting addressable targets in the campaign must match the user to be considered a match.
Request

curl -s -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_first_party_segments": {
          "segment_match_type": "all"
        }
      }' \
  "https://app.simpli.fi/api/campaigns/904/campaign_addresses/change"

Response

{
  "summary": "4 Retargeting Segments Matching All",
  "added": {
    "count": 0
  },
  "updated": {
    "count": 0
  },
  "deleted": {
    "count": 0
  },
  "segment_match_type": "all"
}

Updating the "segment_match_type" Field with the Deprecated "site_retargeting_segments_match_type" Field

This example updates the segment_match_type field to any which means that at least one of the retargeting addressable targets in the campaign must match the user to be considered a match.
Request

curl -s -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_first_party_segments": {
          "site_retargeting_segments_match_type": "any"
        }
      }' \
  "https://app.simpli.fi/api/campaigns/904/campaign_addresses/change"

Response

{
  "summary": "4 Retargeting Segments Matching Any",
  "added": {
    "count": 0
  },
  "updated": {
    "count": 0
  },
  "deleted": {
    "count": 0
  },
  "segment_match_type": "any"
}

Only Adding Addressable Targets to the Campaign

This example adds three additional addressable targets.
Request

curl -s -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_first_party_segments": {
          "add": [
            {
              "address_id": 331186,
              "segment_target_type_id": 2
            },
            {
              "address_id": 334444,
              "segment_target_type_id": 2
            },
            {
              "address_id": 336971,
              "segment_target_type_id": 2
            }
          ]
        }
      }' \
  "https://app.simpli.fi/api/campaigns/904/campaign_addresses/change"

Response

{
  "summary": "22 Retargeting Segments Matching All",
  "added": {
    "count": 3
  },
  "updated": {
    "count": 0
  },
  "deleted": {
    "count": 0
  },
  "segment_match_type": "all"
}

Campaign Deals

To get all deals in a campaign, send a GET request with the organization and campaign ids.

Below is an example for organization id 8, campaign id 644.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/deals"

Response

The returned object has an identifiers property, the value of which is an array containing individual deal objects. Each deal object has an identifier property.

{
  "deals": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaigns/644/deals",
      "name": "Deals for My new campaign name",
      "count": 3,
      "identifiers": [
        {
          "identifier": "SOMEDEAL"
        },
        {
          "identifier": "ABIGGERDEAL"
        },
        {
          "identifier": "WHATEVER"
        }
      ]
    }
  ]
}

HTTP Methods Supported

    GET
    PUT
    DELETE

Updating Deals

To add deals to a campaign, send a PUT request containing a deals parameter--which accepts an array of deal identifiers. Deal identifiers are case sensitive and have validations around them to prevent invalid deals from being added.

Example validations:

    Cannot be a currency: 100.00
    Cannot contain newline or formatting characters like tabs
    Cannot be an IP address: 8.8.8.8
    Cannot be an IP address range: 8.8.8.8-9.9.9.9
    Cannot be the name of a deal in the Deal Library
    Cannot be a domain or website: subdomain.example.omega
    Cannot be a number in scientific notation: 4.62231E+02
    Cannot contain anything other than letters, numbers, dashes or periods
    Cannot be a number that is suffixed with three or more zeroes
    Cannot be a reverse domain: com.test.example
    cannot be prefixed with "fubotv.", "att." or "chromecast."
    Cannot end in .000 with three or more zeroes

Below is an example request to add three deals to a campaign:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "deals": [
          "DEAL4",
          "DEAL5",
          "DEAL6"
        ]
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/deals"

Below is an example request to add 3 deals to a campaign, two of which are invalid.

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "deals": [
          "bad%deal",
          "30052.00",
          "DEAL7"
        ]
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/deals"

Response

{
  "deals": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaigns/644/deals",
      "name": "Deals for My best campaign yet!",
      "count": 4,
      "identifiers": [
        {
          "identifier": "DEAL4"
        },
        {
          "identifier": "DEAL5"
        },
        {
          "identifier": "DEAL6"
        },
        {
          "identifier": "DEAL7"
        },
        {
          "identifier": "bad%deal",
          "error_messages": [
            "Identifier contains invalid characters. No special characters other than periods, dashes and underscores are allowed."
          ]
        },
        {
          "identifier": "30052.00",
          "error_messages": [
            "Identifier is a dollar amount which is not a valid deal identifier"
          ]
        }
      ]
    }
  ]
}

Below is an example request to add 3 deals to a campaign, all three of which are invalid.

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "deals": [
          "1.1.1.1",
          "http://test.example.com",
          "4.62231E+02"
        ]
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/deals"

Response

{
  "errors": [
    {
      "id": null,
      "identifier": "1.1.1.1",
      "error_messages": [
        "Identifier is an IP address which is not a valid identifier for a deal"
      ]
    },
    {
      "id": null,
      "identifier": "http://test.example.com",
      "error_messages": [
        "Identifier contains invalid characters. No special characters other than periods, dashes and underscores are allowed.",
        "Identifier looks like a website and is not a valid identifier for a deal"
      ]
    },
    {
      "id": null,
      "identifier": "4.62231E+02",
      "error_messages": [
        "Identifier contains standard scientific notation values",
        "Identifier contains invalid characters. No special characters other than periods, dashes and underscores are allowed."
      ]
    }
  ]
}

Deleting Deals

To delete specific deals from a campaign, send a DELETE request containing a deals parameter--which accepts an array of deal identifiers. Deal identifiers are case sensitive.

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "deals": [
          "DEAL4",
          "DEAL5"
        ]
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/deals"

To delete all deals in a campaign, send a DELETE request with query string all=true

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/deals?all=true"

Campaign Events

The campaign_events are event targets that have been added to a campaign.

Refer to Events for details of how to find the available Events to add to a campaign as a retargeting segment.

NOTE: The segment_type_id must be set to 1

Listing campaign_events for a campaign:
Request

curl -s -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/904/campaign_events"

Response

{
  "campaign_events": [
    {
      "resource": "https://app.simpli.fi/api/campaign_events/1",
      "id": 1,
      "campaign_id": 904,
      "segment_type_id": 1,
      "warning_message": null,
      "segment_target_type_id": 1,
      "event_id": 1
    }
  ],
  "paging": {
    "page": 1,
    "size": 10,
    "total": 1
  }
}

The warning_message field contains details of any issues with the events in the campaign. The field is null if there are no issues.
HTTP Methods Supported

    GET
    PUT

Changes to Campaign Events

The change endpoint is used for all modifications to the campaign_events. This includes adding, updating, and deleting the campaign_events on a campaign. It does not allow modification of the actual event that is used by the campaign. The change endpoint allows bulk actions to be performed. Multiple campaign_events can be added, updated, or removed in one action.

The example payload below does the following:

    Add two events to the campaign.
        event_id 123 is added. It is set with segment_target_type_id of 2 for 'Include' or 'Opt-in'.
        event_id 456 is added.
    Remove campaign_events with ids 789 and 987. These are the campaign_event_ids not the event_id.
    Update campaign_event with id 135. The segment_target_type_id is changed to 2 for 'Include'. Again, these are the campaign_event_ids not the event_id.
    Set the segment_match_type field to any which means that if any of the events match a user it is considered a match. The site_retargeting_segments_match_type field is also a valid parameter in this case but it has been deprecated in favor of segment_match_type.

curl -s -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_first_party_segments": {
          "add": [
            {
              "event_id": 123,
              "segment_target_type_id": 2,
              "segment_type_id": 1
            },
            {
              "event_id": 456,
              "segment_target_type_id": 2,
              "segment_type_id": 1
            }
          ],
          "delete": [789, 987],
          "update": [
            {
              "id": 135,
              "segment_target_type_id": 2
            }
          ],
          "segment_match_type": "any"
        }
      }' \
  "https://app.simpli.fi/api/campaigns/904/campaign_events/change"

Response

{
  "summary": "4 Retargeting Audiences Matching Any",
  "added": {
    "count": 2
  },
  "updated": {
    "count": 1
  },
  "deleted": {
    "count": 2
  },
  "segment_match_type": "any"
}

Updating the "segment_match_type" Field

This example updates the segment_match_type field to all which means that all of the retargeting event targets in the campaign must match the user to be considered a match.
Request

curl -s -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_first_party_segments": {
          "segment_match_type": "all"
        }
      }' \
  "https://app.simpli.fi/api/campaigns/904/campaign_events/change"

Response

{
  "summary": "4 Retargeting Audiences Matching All",
  "added": {
    "count": 0
  },
  "updated": {
    "count": 0
  },
  "deleted": {
    "count": 0
  },
  "segment_match_type": "all"
}

Updating the "segment_match_type" Field with the Deprecated "site_retargeting_segments_match_type" Field

This example updates the segment_match_type field to any which means that at least one of the retargeting event targets in the campaign must match the user to be considered a match.
Request

curl -s -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_first_party_segments": {
          "site_retargeting_segments_match_type": "any"
        }
      }' \
  "https://app.simpli.fi/api/campaigns/904/campaign_events/change"

Response

{
  "summary": "4 Retargeting Audiences Matching Any",
  "added": {
    "count": 0
  },
  "updated": {
    "count": 0
  },
  "deleted": {
    "count": 0
  },
  "segment_match_type": "any"
}

Only Adding Events to the Campaign

This example adds three additional events.
Request

curl -s -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_first_party_segments": {
          "add": [
            {
              "event_id": 123456,
              "segment_target_type_id": 2,
              "segment_type_id": 1
            },
            {
              "event_id": 1234567,
              "segment_target_type_id": 2,
              "segment_type_id": 1
            },
            {
              "event_id": 12345678,
              "segment_target_type_id": 2,
              "segment_type_id": 1
            }
          ]
        }
      }' \
  "https://app.simpli.fi/api/campaigns/904/campaign_events/change"

Response

{
  "summary": "22 Retargeting Audiences Matching All",
  "added": {
    "count": 3
  },
  "updated": {
    "count": 0
  },
  "deleted": {
    "count": 0
  },
  "segment_match_type": "all"
}

Campaign First Party Segment

The campaign_first_party_segments are first_party_segments that have been added to a campaign. When a first_party_segment is added to a campaign it is added as a retargeting segment or a conversion segment.
Requirements for First Party Segments Added to a Campaign:

    It must have at least one rule defined in order to add it as a retargeting segment or conversion segment.
    It must have at least one custom_value defined in order to add it as a conversion segment. The custom_values are not applicable to retargeting segments.
    It can be added to the campaign once as a retargeting or conversion segment. It cannot be added as both.
    The organization that the campaign belongs to must be authorized for the first_party_segment.

Refer to the First Party Segments for details of how to find the available first_party_segments to add to a campaign as a retargeting segment or conversion segment.

Listing campaign_first_party_segments for a campaign:
Request

curl -s -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/904/campaign_first_party_segments"

Response

{
  "campaign_first_party_segments": [
    {
      "resource": "https://app.simpli.fi/api/campaign_first_party_segments/187",
      "id": 187,
      "campaign_id": 904,
      "first_party_segment_id": 300987,
      "segment_type_id": 2,
      "warning_message": null
    },
    {
      "resource": "https://app.simpli.fi/api/campaign_first_party_segments/188",
      "id": 188,
      "campaign_id": 904,
      "first_party_segment_id": 309165,
      "segment_type_id": 2,
      "warning_message": null
    },
    ... Not showing all campaign first party segments in the output ...
  ],
  "paging": {
    "page": 1,
    "size": 10,
    "total": 8
  }
}

The warning_message field contains details of any issues with the first_party_segments in the campaign. These issues may include a first_party_segment that no longer has rules or a first_party_segment used for conversion that no longer has custom_values. The field is null if there are no issues.
HTTP Methods Supported

    GET
    PUT

Changes to Campaign First Party Segments

The change endpoint is used for all modifications to the campaign_first_party_segments. This includes adding, updating, and deleting the campaign_first_party_segments on a campaign. It does not allow modification of the actual first_party_segment that is used by the campaign. The change endpoint allows bulk actions to be performed. Multiple campaign_first_party_segments can be added, updated, or removed in one action.

The example payload below does the following:

    Add two first party segments to the campaign.
        first_party_segment_id 303405 is added as a retargeting segment. It is set with segment_target_type_id of 2 for 'Include' or 'Opt-in'.
        first_party_segment_id 304595 is added as a conversion segment.
    Remove campaign_first_party_segments with ids 187 and 188. These are the campaign_first_party_segment_ids not the first_party_segment_id.
    Updates campaign_first_party_segment with id 190. The segment_target_type_id is changed to 2 for 'Include'.
    Set the segment_match_type field to any which means that if any of the first_party_segments match a user it is considered a match. The site_retargeting_segments_match_type field is also a valid parameter in this case but it has been deprecated in favor of segment_match_type.

curl -s -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_first_party_segments": {
          "add": [
            {
              "first_party_segment_id": 303405,
              "segment_type_id": 1,
              "segment_target_type_id": 2
            },
            {
              "first_party_segment_id": 304595,
              "segment_type_id": 2
            }
          ],
          "delete": [194, 193, 192],
          "update": [
            {
              "id": 190,
              "segment_target_type_id": 2
            }
          ],
          "segment_match_type": "any"
        }
      }' \
  "https://app.simpli.fi/api/campaigns/904/campaign_first_party_segments/change"

Response

{
  "summary": "4 Retargeting Segments Matching Any, 1 Conversion Segment",
  "added": {
    "count": 2
  },
  "updated": {
    "count": 1
  },
  "deleted": {
    "count": 2
  },
  "segment_match_type": "any"
}

Updating the "segment_match_type" Field

This example updates the segment_match_type field to all which means that all of the retargeting first_party_segments in the campaign must match the user to be considered a match.
Request

curl -s -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_first_party_segments": {
          "segment_match_type": "all"
        }
      }' \
  "https://app.simpli.fi/api/campaigns/904/campaign_first_party_segments/change"

Response

{
  "summary": "4 Retargeting Segments Matching All, 1 Conversion Segment",
  "added": {
    "count": 0
  },
  "updated": {
    "count": 0
  },
  "deleted": {
    "count": 0
  },
  "segment_match_type": "all"
}

Updating the "segment_match_type" Field with the Deprecated "site_retargeting_segments_match_type" Field

This example updates the segment_match_type field to any which means that at least one of the retargeting first_party_segments in the campaign must match the user to be considered a match.
Request

curl -s -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_first_party_segments": {
          "site_retargeting_segments_match_type": "any"
        }
      }' \
  "https://app.simpli.fi/api/campaigns/904/campaign_first_party_segments/change"

Response

{
  "summary": "4 Retargeting Segments Matching All, 1 Conversion Segment",
  "added": {
    "count": 0
  },
  "updated": {
    "count": 0
  },
  "deleted": {
    "count": 0
  },
  "segment_match_type": "any"
}

Only adding "first_party_segments" to the campaign

This example adds three additional retargeting first_party_segments.

curl -s -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_first_party_segments": {
          "add": [
            {
              "first_party_segment_id": 331186,
              "segment_type_id": 1,
              "segment_target_type_id": 2
            },
            {
              "first_party_segment_id": 334444,
              "segment_type_id": 1,
              "segment_target_type_id": 2
            },
            {
              "first_party_segment_id": 336971,
              "segment_type_id": 1,
              "segment_target_type_id": 2
            }
          ]
        }
      }' \
  "https://app.simpli.fi/api/campaigns/904/campaign_first_party_segments/change"

Response

{
  "summary": "22 Retargeting Segments Matching All, 1 Conversion Segment",
  "added": {
    "count": 3
  },
  "updated": {
    "count": 0
  },
  "deleted": {
    "count": 0
  },
  "segment_match_type": "all"
}

Campaign Groups

Listing campaign_groups that belong to an organization.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/campaign_groups"

Response

{
  "campaign_groups": [
    {
      "resource": "https://app.simpli.fi/api/organizations/5787/campaign_groups/1016",
      "id": 1016,
      "name": "Group One",
      "total_budget": 100,
      "campaigns": [
        {
          "id": 223,
          "name": "Campaign One",
          "resource": "https://app.simpli.fi/api/organizations/5787/campaigns/223"
        }
      ]
    }
  ]
}

HTTP Methods Supported

    GET
    POST
    PUT
    DELETE

Creating a Campaign Group

The POST body should be formatted as JSON and use the following format. The POST is only supported when nested within an organization context. All fields are required.
Campaign Group Example

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_group": {
          "name": "Group One",
          "total_budget": 150
        }
      }' \
  "https://app.simpli.fi/api/organizations/5787/campaign_groups"

Getting a Specific Campaign Group

Example - get campaign_group 1018:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/campaign_groups/1018"

The JSON returned:

{
  "campaign_groups": [
    {
      "resource": "https://app.simpli.fi/api/organizations/5787/campaign_groups/1018",
      "id": 1018,
      "name": "Group One",
      "total_budget": 100,
      "campaigns": [
        {
          "id": 223,
          "name": "Campaign One",
          "resource": "https://app.simpli.fi/api/organizations/1018/campaigns/223"
        }
      ]
    }
  ]
}

Updating a Campaign Group

The feed can be updated by using the same JSON in a PUT request.

Example - put campaign_group 1018:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_group": {
          "name": "Group One",
          "total_budget": 150
        }
      }' \
  "https://app.simpli.fi/api/organizations/5787/campaign_groups/1018"

Deleting a Campaign Group

Example - delete the campaign_group with id 1018:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/campaign_groups/1018"

Adding Campaigns to a Campaign Group

Add campaigns by passing in an array of campaign ids in a PUT request. Will return an error if any of the campaigns are not found.

Example - add campaign 1234 to campaign_group with id 1018:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_ids": [1234]
      }' \
  "https://app.simpli.fi/api/organizations/5787/campaign_groups/1018/add_campaigns"

Remove Campaigns from a Campaign Group

Remove campaigns by passing in an array of campaign ids in a PUT request. Will return an error if any of the campaigns are not found.

Example - remove campaign 1234 from campaign_group with id 1018:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_ids": [1234]
      }' \
  "https://app.simpli.fi/api/organizations/5787/campaign_groups/1018/remove_campaigns"

Campaign Stats

Campaign Stats has several different outputs depending on the query string options given.
Query String Params
Optional settings

    start_date: "2011-01-01" (defaults to today, limited to 2 years ago)
    end_date: "2011-01-31" (defaults to today)
    by_day: true or false (defaults to false)
    by_campaign: true or false (defaults to false)
    by_ad: true or false (defaults to false)
    campaign_id: numeric id of a campaign

Paging

Example:
?page=2
Stats for All Campaigns Under the Organization
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaign_stats"

Response

{
  "campaign_stats": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaign_stats?end_date=2015-12-28&start_date=2015-12-28",
      "name": "Daily Stats | 2015-12-28",
      "impressions": 11237,
      "clicks": 15,
      "ctr": 0.0013348758565453413,
      "cpm": 0.983358547655068,
      "cpc": 0.736666666666667,
      "cpa": 0.1376666,
      "vcr": 0.15,
      "weighted_actions": 0.75,
      "total_spend": 11.05,
      "stat_date": "2015-12-28",
      "resources": [

      ]
    }
  ],
  "paging": {
    "page": 1,
    "size": 50,
    "total": 1
  }
}

Stats for All Campaigns Under the Organization Grouped by Campaign
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaign_stats?by_campaign=true"

Response

{
  "campaign_stats": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaign_stats?by_campaign=true&campaign_id=636&end_date=2016-07-27&start_date=2016-07-26",
      "name": "Daily Stats | Campaign 636 | 2016-07-26 - 2016-07-27",
      "impressions": 448,
      "clicks": 10,
      "ctr": 0.022321428571428572
      "cpm": 6.33928571428571,
      "cpc": 0.284,
      "cpa": 1.89333333333333,
      "vcr": 0.15,
      "weighted_actions": 0.75,
      "total_spend": 11.05,
      "campaign_id": 636,
      "stat_date": "2016-07-26",
      "resources": [
        {
          "campaigns": "https://app.simpli.fi/api/organizations/8/campaigns/636"
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

Stats for All Campaigns Under the Organization Grouped by Ad
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaign_stats?by_ad=true"

Response

{
  "campaign_stats": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaign_stats?by_ad=true&campaign_id=636&end_date=2015-12-28&start_date=2015-12-28",
      "name": "Daily Stats | Campaign 636 | Ad 640 | 2015-12-28",
      "impressions": 11237,
      "clicks": 15,
      "ctr": 0.0013348758565453413,
      "cpm": 0.983358547655068,
      "cpc": 0.736666666666667,
      "cpa": 0.366666666666667,
      "vcr": 0.15,
      "weighted_actions": 0.75,
      "total_spend": 11.05,
      "campaign_id": 636,
      "ad_id": 640,
      "stat_date": "2015-12-28",
      "resources": [
        {
          "ads": "https://app.simpli.fi/api/organizations/8/campaigns/636/ads/640"
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

Stats for a Specific Campaign
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaign_stats?campaign_id=644"

Response

{
  "campaign_stats": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaign_stats?campaign_id=636&end_date=2015-12-28&start_date=2015-12-28",
      "name": "Daily Stats | Campaign 636 | 2015-12-28",
      "impressions": 11237,
      "clicks": 15,
      "ctr": 0.0013348758565453413,
      "cpm": 0.983358547655068,
      "cpc": 0.736666666666667,
      "cpa": 0.366666666666667,
      "vcr": 0.15,
      "weighted_actions": 0.75,
      "total_spend": 11.05,
      "campaign_id": 636,
      "stat_date": "2015-12-28",
      "resources": [
        {
          "campaigns": "https://app.simpli.fi/api/organizations/8/campaigns/636"
        }
      ]
    }
  ],
  "paging": {
    "page": 1,
    "size": 50,
    "total": 0
  }
}

Stats for a Date Range
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaign_stats?start_date=2015-12-01&end_date=2015-12-31"

Response

{
  "campaign_stats": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaign_stats?end_date=2015-12-28&start_date=2015-12-01",
      "name": "Stats | 2015-12-01 - 2015-12-28",
      "impressions": 125711,
      "clicks": 164,
      "ctr": 0.0013045795515110054,
      "cpm": 0.983287063184606,
      "cpc": 0.753719512195122,
      "cpa": 1.675333333333333,
      "vcr": 0.15,
      "weighted_actions": 0.75,
      "total_spend": 123.61,
      "resources": [

      ]
    }
  ],
  "paging": {
    "page": 1,
    "size": 50,
    "total": 1
  }
}

Stats for a Specific Campaign and Date Range
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaign_stats?campaign_id=636&start_date=2015-12-01&end_date=2015-12-31"

Response

{
  "campaign_stats": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaign_stats?campaign_id=636&end_date=2015-12-28&start_date=2015-12-01",
      "name": "Stats | Campaign 636 | 2015-12-01 - 2015-12-28",
      "impressions": 23121,
      "clicks": 30,
      "ctr": 0.0012975217334890358,
      "cpm": 0.983521473984689,
      "cpc": 0.758,
      "cpa": 0.247,
      "vcr": 0.15,
      "weighted_actions": 0.75,
      "total_spend": 22.74,
      "campaign_id": 636,
      "resources": [
        {
          "campaigns": "https://app.simpli.fi/api/organizations/8/campaigns/636"
        }
      ]
    }
  ],
  "paging": {
    "page": 1,
    "size": 50,
    "total": 0
  }
}

Campaign Types

Curl example to get all campaign types:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaign_types"

Response

{
  "campaign_types": [
    {
      "resource": "https://app.simpli.fi/api/campaign_types/1",
      "id": 1,
      "name": "Search"
    }
  ]
}

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

Changes

The changes endpoint is used to retrieve a summary of all changes made to a campaign. By default all of the changes made to a campaign are returned. The changes can be filtered using the optional query string parameters start_date and end_date. Dates in the query string use the format: YYYY-MM-DD

If only start_date or end_date is included in the query string, then the missing date defaults to the current date.

Example - get all changes for campaign 644:

https://app.simpli.fi/api/organizations/8/campaigns/644/changes

Example - get changes for campaign 644 between October 18, 2014 and November 18, 2014:

https://app.simpli.fi/api/organizations/8/campaigns/644/changes?start_date=2014-10-18&end_date=2014-11-18

Example - get changes for campaign 644 on October 18, 2014:

https://app.simpli.fi/api/organizations/8/campaigns/644/changes?start_date=2014-10-18&end_date=2014-10-18

Example response:

{
  "changes": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaigns/644/changes/3203",
      "id": 3203,
      "name": "Brandon Aaron changed Website Filtering",
      "section": "Website Filtering",
      "who": "Brandon Aaron",
      "summary": "1 Blocklisted Website",
      "when": "2014-10-18"
    }
  ]
}

Comments

Campaign comments provide a handy way to keep notes or other miscellaneous data with a campaign. The text field can store a maximum of 4KB of data.
Requesting the Current Comments for a Campaign
GET Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://api.simpli.fi/api/campaigns/831/comments"

GET Response

{
  "comments": [
    {
      "resource": "https://api.simpli.fi/api/campaigns/831/comments/24",
      "id": 24,
      "text": "this is a comment about this campaign"
    }
  ]
}

Creating a Comment for a Campaign

Campaigns do not initially have comments associated with them. At this time, campaigns can have only one comment. The user key will need edit privileges for the campaign.
POST Request

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "comment": {
          "text": "this is a new comment"
        }
      }' \
  "https://api.simpli.fi/api/campaigns/831/comments"

POST Response

{
  "comments": [
    {
      "resource": "https://api.simpli.fi/api/campaigns/831/comments/24",
      "id": 24,
      "text": "this is a new comment"
    }
  ]
}

Updating a Comment for a Campaign

The user key will need edit privileges for the campaign that the comment belongs to.
PUT Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "comment": {
          "text": "this is a modified comment"
        }
      }' \
  "https://api.simpli.fi/api/comments/24"

PUT Response

{
  "comments": [
    {
      "resource": "https://api.simpli.fi/api/comments/24",
      "id": 24,
      "text": "this is a modified comment"
    }
  ]
}

Deleting a Comment for a Campaign

The user key will need edit privileges for the campaign that the comment belongs to. On success, no data is returned; the HTTP response code is set.
DELETE Request

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://api.simpli.fi/api/comments/24"

Congressional Districts

Curl example to get all congressional districts:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/congressional_districts"

Response

{
  "congressional_districts": [
    {
      "id": 101,
      "name": "Congressional District 1",
      "code": "AL-01",
      "state": "AL",
      "resource": "https://app.simpli.fi/api/congressional_districts/101"
    }, {
      "id": 102,
      "name": "Congressional District 2",
      "code": "AL-02",
      "state": "AL",
      "resource": "https://app.simpli.fi/api/congressional_districts/102"
    }
  ]
}

Curl example to get a single congressional district:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/congressional_district/101"

Response

{
  "congressional_districts": [
    {
      "id": 101,
      "name": "Congressional District 1",
      "code": "AL-01",
      "state": "AL",
      "resource": "https://app.simpli.fi/api/congressional_districts/101"
    }
  ]
}

HTTP Methods Supported

    GET

Contexts

Curl example to get all contexts:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/contexts"

Response

{
  "contexts": [
    ... Not showing all contexts in the output ...
    {
      "resource": "https://app.simpli.fi/api/contexts/201",
      "id": 201,
      "name": "Books & Literature",
      "category": "Arts & Entertainment"
    }
  ]
}

Custom Field Values

Custom field values allow you to set custom fields values on campaigns. You must first have defined custom fields.

{
  "custom_fields": {
    "Impression Goal": "555",
    "Is Spend Oriented?": null
  }
}

HTTP Methods Supported

    GET
    PUT

Retrieve All Custom Fields Values for Campaign

Custom fields can be obtained by sending a GET request for the specific campaign given an organization.

Custom fields not in use by the campaign will have a null value and id.

Example for organization 386828, campaign 9:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/386828/campaigns/9/custom_field_values"

Response

The response is simply a hash of the custom field values as shown below.

{
  "custom_fields": {
    "Impression Goal": "value",
    "Is Spend Oriented?": null
  }
}

Setting (Replacing) Custom Field Values for Campaign

The PUT is only supported when nested within an Organization context.

Example for organization 386828, campaign 9, setting Impression Goal to 559. Note that a custom field with a name of "Impression Goal" must exist for your organization. See Custom Fields for more information.
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "custom_fields": {
          "Impression Goal": "559"
        }
      }' \
  "https://app.simpli.fi/api/organizations/386828/campaigns/9/custom_field_values/replace"

Response

The response is simply a hash of the custom fields values for the campaign.

{
  "custom_fields": {
    "Impression Goal": "559",
    "Is Spend Oriented?": null
  }
}

You can set multiple values at once.

Example for setting both the Impression Goal and the Conversion Goal. Note that custom field names are not case sensitive when setting values.

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "custom_fields": {
          "Impression Goal": "559",
          "Conversion Goal": "700"
        }
      }' \
  "https://app.simpli.fi/api/organizations/386828/campaigns/9/custom_field_values/replace"

Custom Fields

{
  "custom_field": {
    "name": "My Custom Field",
    "field_type": "string"
  }
}

HTTP Methods Supported

    GET
    POST
    DELETE

Retrieve All Custom Fields for Your Organization

All of the custom fields can be obtained by sending a GET request for the specific organization.

Example for organization 386828:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/386828/custom_fields"

Response

The response is simply an array of custom fields as shown below.

[
  {
    "name": "Impression Goal",
    "id": 1
  },
  {
    "name": "Is Spend Oriented?",
    "id": 2
  }
]

Creating a Custom Field

The POST is only supported when nested within an Organization context.

The name field of the custom_field is limited to 255 characters.

Valid field_types include ["string", "integer", "currency", "boolean", "text", "datetime", "dropdown"]

    The string field_type supports a Custom Field Value up to 255 characters.
    The text field_type supports a Custom Field Value up to 10,000 characters.

Example for organization 386828:
Request

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "custom_field": {
          "name": "My field",
          "field_type": "string"
        }
      }' \
  "https://app.simpli.fi/api/organizations/386828/custom_fields"

Response

The response is simply an array of custom fields created.

[
  {
    "name": "My field",
    "id": 13
  }
]

Deleting a Custom Field

To delete a custom field, issue a DELETE request to /custom_fields/<id> where <id> is the id of the custom field. We're deleting custom field 13 below.

Example for organization 386828, custom field 13:
Request

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/386828/custom_fields/13"

Response

The response will have status 204 upon successful delete.
Demographics

Curl example to get all demographics:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/demographics"

Response

{
  "demographics": [
    {
      "id": 4,
      "name": "Female present",
      "field": "gender_female",
      "group": "Gender",
      "resource": "https://app.simpli.fi/api/demographics/4"
    }, {
      "id": 5,
      "name": "Male present",
      "field": "gender_male",
      "group": "Gender",
      "resource": "https://app.simpli.fi/api/demographics/5"
    }
  ]
}

Curl example to get a single demographic:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/demographic/4"

Response

{
  "demographics": [
    {
      "id": 4,
      "name": "Female present",
      "field": "gender_female",
      "group": "Gender",
      "resource": "https://app.simpli.fi/api/demographics/4"
    }
  ]
}

HTTP Methods Supported

    GET

Device Types

Device types determine which devices a campaign targets. Campaigns target all device types by default.
HTTP Methods Supported

    GET
    PUT
    DELETE

Listing All Available Device Types
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/device_types"

Response

{
  "device_types": [
    {
      "id": 1,
      "name": "CTV - All",
      "resource": "https://app.simpli.fi/api/device_types/1"
    },
    {
      "id": 2,
      "name": "CTV - Amazon",
      "resource": "https://app.simpli.fi/api/device_types/2"
    },
    ... Not showing all device types in the output ...
    {
      "id": 35,
      "name": "Mobile - All",
      "resource": "https://app.simpli.fi/api/device_types/35"
    },
    {
      "id": 36,
      "name": "Desktops and Laptops - All",
      "resource": "https://app.simpli.fi/api/device_types/36"
    },
    {
      "id": 37,
      "name": "Tablets - All",
      "resource": "https://app.simpli.fi/api/device_types/37"
    }
  ]
}

Listing All Device Types for a Campaign
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/697/device_types"

Response

{
  "device_types": [
    {
      "id": 1,
      "name": "CTV - All",
      "resource": "https://app.simpli.fi/api/device_types/1"
    },
    {
      "id": 35,
      "name": "Mobile - All",
      "resource": "https://app.simpli.fi/api/device_types/35"
    },
    {
      "id": 36,
      "name": "Desktops and Laptops - All",
      "resource": "https://app.simpli.fi/api/device_types/36"
    },
    {
      "id": 37,
      "name": "Tablets - All",
      "resource": "https://app.simpli.fi/api/device_types/37"
    }
  ]
}

Showing a Single Device Type
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/device_types/1"

Response

{
  "device_types": [
    {
      "id": 1,
      "name": "CTV - All",
      "resource": "https://app.simpli.fi/api/device_types/1"
    }
  ]
}

Updating the Device Types for a Campaign
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "device_type_ids": [2, 3, 36, 37]
      }' \
  "https://app.simpli.fi/api/campaigns/697/device_types"

Response

{
  "device_types": [
    {
      "id": 2,
      "name": "CTV - Amazon",
      "resource": "https://app.simpli.fi/api/device_types/2"
    },
    {
      "id": 3,
      "name": "CTV - Apple",
      "resource": "https://app.simpli.fi/api/device_types/3"
    },
    {
      "id": 36,
      "name": "Desktops and Laptops - All",
      "resource": "https://app.simpli.fi/api/device_types/36"
    },
    {
      "id": 37,
      "name": "Tablets - All",
      "resource": "https://app.simpli.fi/api/device_types/37"
    }
  ]
}

Resetting the Device Types for a Campaign
Request

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/697/device_types"

Response

The response will have status 204 upon successful reset
Domains

Get details of the domains (website_filtering) that have been applied to a campaign.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/domains"

Response

{
  "domains": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaigns/644/domains",
      "name": "Domains for My new campaign name",
      "org_blocklist_opt_out": false,
      "type": "Blocklist",
      "count": 4,
      "actions": [
        {
          "download": {
            "href": "https://app.simpli.fi/api/organizations/8/campaigns/644/domains/download",
            "method": "GET"
          }
        }
      ]
    }
  ]
}

HTTP Methods Supported

    GET
    PUT
    DELETE

Updating Domains Using a CSV

Additional domains can be added to a campaign using a PUT request with a CSV file containing domain names.

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -F "domain[csv]=@domains.csv" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/domains"

Where the file domains.csv has the following content:

http://www.csv.upload.1.pri
http://www.csv.upload.2.pri
http://www.csv.upload.3.pri
http://www.csv.upload.4.pri

The type of domains - allowlist or blocklist - is set by passing the list_type parameter along in the request. The valid values are Blocklist or Allowlist. The list_type parameter is not case sensitive. If the parameter is not included it will default to blocklist.

Example where the domains are set to allowlist:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -F "domain[csv]=@domains.csv" \
  -F "domain[list_type]=allowlist"\
  "https://app.simpli.fi/api/organizations/8/campaigns/644/domains"

The existing domains on the campaign can be replaced with a new set of domains by including the replace parameter with a value of true.

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -F "domain[csv]=@domains.csv" \
  -F "domain[replace]=true" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/domains"

The Organization Blocklist can be disabled by including the org_blocklist_opt_out parameter with a value of true.

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -F "domain[org_blocklist_opt_out]=true" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/domains"

The Organization Blocklist may also be disabled by including the deprecated org_blacklist_opt_out parameter with a value of true through the use of API versioning.

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2020-10-07" \
  -F "domain[org_blacklist_opt_out]=true" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/domains"

Updating Domains Using an Array of Domain Names

Additional domains can be added to a campaign using a PUT request with an array of domain names. It is an alternative to passing domain names in a CSV file. If both a CSV file and array of domain names is passed, the CSV file will take precedence.

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "domain": {
          "names": [
            "http://www.example.com",
            "http://www.example2.com",
            "http://www.example3.com"
          ]
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/domains"

The array of names format supports the same list_type and replace options as the CSV format.

Replacing existing domains on the campaign:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "domain": {
          "names": [
            "http://www.example.com",
            "http://www.example2.com",
            "http://www.example3.com"
          ],
          "replace": true
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/domains"

Setting the domains to allowlist:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "domain": {
          "names": [
            "http://www.example.com",
            "http://www.example2.com",
            "http://www.example3.com"
          ],
          "list_type": "allowlist"
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/domains"

Deleting Domains

A delete request is used to remove all domains from the campaign.

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/domains"

Deprecated Domain Fields

The Domains resource supports responding with deprecated fields through the use of -H "X-Api-Version: YYYY-MM-DD".

Example of receiving the deprecated org_blacklist_opt_out and type: "Blacklist" fields from the index endpoint.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2020-10-07" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/domains"

Response

{
  "domains": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaigns/644/domains",
      "name": "Domains for My new campaign name",
      "org_blacklist_opt_out": false,
      "type": "Blacklist",
      "count": 4,
      "actions": [
        {
          "download": {
            "href": "https://app.simpli.fi/api/organizations/8/campaigns/644/domains/download",
            "method": "GET"
          }
        }
      ]
    }
  ]
}

Dynamic Ad Feeds

Listing dynamic_ad_feeds that belong to an organization.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/dynamic_ad_feeds"

Response

{
  "dynamic_ad_feeds": [
      {
        "resource": "http://app.simpli.fi/api/organizations/0/dynamic_ad_feeds/1016",
        "id": 1016,
        "name": "Feed One",
        "feed_vertical_id": 1,
        "organization_id": 0,
        "item_count": 10,
        "remote_feed_id": null,
        "remote_feed_type": null
      }
    ]
}

HTTP Methods Supported

    GET
    POST
    PUT
    DELETE

Creating a Dynamic Ad Feed

The POST body should be formatted as JSON and use the following format. The POST is only supported when nested within an organization context. The csv field is the Base64 encoded contents of a feed csv. The campaign_id is only required if geo fence data is present. Geo fences will be created on this campaign if the feed contains latitude and longitude information.
Dynamic Ad Feed Example

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
  "dynamic_ad_feed": {
      "name":"Feed One",
      "campaign_id": 15,
      "csv": "RW1wbG95ZWUgSUQsUGhvdG8gSUQsRkEjLEZBIE5hbWUsQnJhbmNoICAgICAs\nU3RyZWV0ICxDaXR5ICxTdGF0ZSAsWmlwQ29kZSAgICAgICxDb3VudHkgICAg\nICAgICAgICAgICxDb3VuLEVtYWlsLFRlbCBObyxETUFfY2QgLEdlbixDYW5f\n"
    }
  }' \
  "https://app.simpli.fi/api/organizations/5787/dynamic_ad_feeds"

Getting a Specific Dynamic Ad Feed

Example - get dynamic_ad_feed 1018:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/dynamic_ad_feed/1018"

The JSON returned:

{
  "dynamic_ad_feeds": [
    {
      "resource": "http://app.simpli.fi/api/organizations/5787/dynamic_ad_feeds/1018",
      "id": 1018,
      "name": "Feed One",
      "feed_vertical_id": 1,
      "organization_id": 0,
      "item_count": 10
    }
  ]
}

Updating a Dynamic Ad Feed

The feed can be updated by using the same JSON in a PUT request.

Example - put dynamic_ad_feed 1018:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
  "dynamic_ad_feed": {
      "name":"Feed One",
      "campaign_id": 15,
      "csv": "RW1wbG95ZWUgSUQsUGhvdG8gSUQsRkEjLEZBIE5hbWUsQnJhbmNoICAgICAs\nU3RyZWV0ICxDaXR5ICxTdGF0ZSAsWmlwQ29kZSAgICAgICxDb3VudHkgICAg\nICAgICAgICAgICxDb3VuLEVtYWlsLFRlbCBObyxETUFfY2QgLEdlbixDYW5f\n"
    }
  }' \
  "https://app.simpli.fi/api/organizations/5787/dynamic_ad_feeds/1018"

Deleting a Dynamic Ad Feed

Example - delete the dynamic_ad_feed with id 1018:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/dynamic_ad_feeds/1018"

Dynamic Ad Types

Curl example to get all dynamic ad types:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/dynamic_ad_types"

Response

{
  "dynamic_ad_types": [
    {
      "resource": "https://app.simpli.fi/api/dynamic_ad_types/1",
      "id": 1,
      "name": "Keyword"
    }
  ]
}

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

Feed Filters

Curl example to get all feed filters:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/feed_filters"

Response

{
  "feed_filters": [
    {
      "resource": "http://www.example.com/api/feed_filters/1",
      "id": 1,
      "feed_vertical_id": 1,
      "name": "Condition New",
      "filter": "condition:new",
      "tip": "Filter feed to items with condition set to new"
    }
  ]
}

Curl example to get all feed filters for a given vertical:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{ "feed_vertical_id":1 }'
  "https://app.simpli.fi/api/feed_filters"

Response

{
  "feed_filters": [
    {
      "resource": "http://www.example.com/api/feed_filters/1",
      "id": 1,
      "feed_vertical_id": 1,
      "name": "Condition New",
      "filter": "condition:new",
      "tip": "Filter feed to items with condition set to new"
    }
  ]
}

First Party Segment Custom Values

Listing first party segment custom values (conversions) that belong to a first_party_segment.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/first_party_segments/105234/first_party_segment_custom_values"

Response

{
  "first_party_segment_custom_values": [
    {
      "resource": "https://app.simpli.fi/api/first_party_segment_custom_values/1034947",
      "id": 1034947,
      "first_party_segment_id": 105234,
      "segment_custom_value_type_id": 2
    }
  ]
}

HTTP Methods Supported

    GET
    POST
    PUT
    DELETE

Creating a First Party Segment Custom Value

The first_party_segment_custom_value resources are used for conversion. A first_party_segment must have at least one first_party_segment_custom_value in order to be used as a conversion segment in a campaign.
Creating a First Party Segment Custom Value for 'Purchase/Sale'

{
  "first_party_segment_custom_values": [
    {
      "resource": "https://app.simpli.fi/api/first_party_segment_custom_values/1034948",
      "id": 1034948,
      "first_party_segment_id": 105234,
      "segment_custom_value_type_id": 1
    }
  ]
}

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "first_party_segment_custom_value": {
          "segment_custom_value_type_id":  4
        }
      }' \
  "https://app.simpli.fi/api/first_party_segments/105234/first_party_segment_custom_values"

Getting a Specific First Party Segment Custom Value

Example - get first_party_segment_custom_value 1034949:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/first_party_segment_custom_values/1034949"

The JSON returned:

{
  "first_party_segment_custom_values": [
    {
      "resource": "https://app.simpli.fi/api/first_party_segment_custom_values/1034949",
      "id": 1034949,
      "first_party_segment_id": 105234,
      "segment_custom_value_type_id": 4
    }
  ]
}

Deleting a First Party Segment Custom Value

Deleting a first_party_segment_custom_value is permanent. Deleting a first_party_segment_custom_value may result in conversions no longer be tracked for any campaign using the first_party_segment that the the custom_value belongs to.

Example - delete the first_party_segment_custom_value with id 1034949:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/first_party_segment_custom_values/1034949"

First Party Segment Rules

Listing first_party_segment_rules that belong to a first_party_segment.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/first_party_segments/105234/first_party_segment_rules"

Response

{
  "first_party_segment_rules": [
    {
      "resource": "https://app.simpli.fi/api/first_party_segment_rules/1105090",
      "id": 1105090,
      "domain": "example.com",
      "segment_url_match_type_id": 1,
      "match_pattern": "prize",
      "has_feed": true,
      "has_data": false,
      "first_party_segment_captures_attributes": []
    },
    {
      "resource": "https://app.simpli.fi/api/first_party_segment_rules/1105091",
      "id": 1105091,
      "domain": "example.com",
      "segment_url_match_type_id": 2,
      "match_pattern": "/sign_up",
      "has_feed": true,
      "has_data": false,
      "first_party_segment_captures_attributes": []
    },
    {
      "resource": "https://app.simpli.fi/api/first_party_segment_rules/1105092",
      "id": 1105092,
      "domain": "example.com",
      "segment_url_match_type_id": 2,
      "match_pattern": "/products",
      "has_feed": true,
      "has_data": true,
      "first_party_segment_captures_attributes": [
        {
          "id": 47,
          "first_party_segment_capture_data_id": 1,
          "first_party_segment_capture_location_id": 2,
          "first_party_segment_capture_trigger_id": 1,
          "match_string": "id",
          "dynamic_ad_feed_id": 32,
          "dynamic_ad_feed_column": "id"
        }
      ]
    }
  ],
  "paging": {
    "page": 1,
    "size": 25,
    "total": 3
  }
}

HTTP Methods Supported

    GET
    POST
    PUT
    DELETE

Creating a First Party Segment Rule

The create request for a first_party_segment_rule must be nested within a first_party_segment.

Guidelines for the first party segment rules are:
Adding Domains

When entering domains for the websites you would like to retarget, if you enter the root domain (e.g. example.com), we will also match the common www subdomain (e.g. www.example.com). Conversely, if you enter www, we will also match the root domain. The root domain will not match with any other subdomains. Every other subdomain must be entered separately.
Capturing Data In a Rule And Tying it to Dynamic Ads

Rules may have associated first_party_segment_capture_attributes, which can be used to capture additional data when the user is added to the segment when the rule matches.

At this time, only one capture is supported, and the following properties must be present and set to the correct values:

    first_party_segment_capture_data_id must be set to 1.
    first_party_segment_capture_trigger_id must be set to 1.
    dynamic_ad_feed_column must be set to id.

Additionally, the match_string, dynamic_ad_feed_id, and first_party_segment_capture_location_id must have valid values, while an id must be supplied for updating existing captures.
Description of Capture Fields

    id: The id of the first_party_segment_capture. Used for updating and deleting. Leave blank for creating a new capture.

    first_party_segment_capture_location_id: Where the capture value is located. Acceptable options are 1 (for values contained in the URL Path) and 2 (for values contained in a query parameter).

    match_string: The variable name or regex pattern used for extracting the capture value.

    dynamic_ad_feed_id: Captures enable data to be associated with dynamic ad feeds. To enable this, a capture must specify both the feed that the capture is tied to, as well as which column in the feed the captured value corresponds to.

    The feed must already exist within the Simpli.fi platform to use this feature.

    dynamic_ad_feed_column: The column in the dynamic ad feed that contains values that map to the captured value. At this time, the only supported value for this field is id.

    first_party_segment_capture_data_id: The type of data collected. At this time, the only supported value is id.

    first_party_segment_capture_trigger_id: The action that triggers the data capture. The only supported value is 1, which means "Page Visit".

Contains Rule

The contains rule type will fire when the entered value matches anywhere in the target user's URI (after the domain).

A rule with domain: 'example.com', segment_url_match_type_id: 1, and match_pattern: 'items'

Will match:

    http://example.com/items
    http://example.com?q=more_items
    http://example.com#lots-of-items-here

Will NOT match:

    http://example.com/item

Exactly Matches Rule

Just as it sounds, the exactly matches rule type will fire when the entered value exactly matches the target user's URI.

A rule with domain: 'example.com', segment_url_match_type_id: 2, and match_pattern: '/products/item?id=1234'

Will only match:

    http://example.com/products/item?id=1234

Wildcard Selector

The wildcard selector * is not supported for Exactly Matches.
Match Homepage

To match your website's homepage, select the exactly matches rule type and leave the value field blank.
Create a First Party Segment Rule with a 'contains' Match Pattern

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "first_party_segment_rule": {
          "domain":  "example.com",
          "match_pattern": "trees",
          "segment_url_match_type_id": 1
        }
      }' \
  "https://app.simpli.fi/api/first_party_segments/105229/first_party_segment_rules"

Starts With Rule

A "Starts With" Rule applies the match_pattern to the beginning of the referer's path.

A rule with domain: 'example.com', segment_url_match_type_id: 3, and match_pattern: 'items'

Will match:

    http://example.com/items
    http://example.com/items/35
    http://example.com/items/35/edit
    http://example.com/items/35#edit
    http://example.com/items?id=35

Will NOT match:

    http://example.com/item
    http://example.com?q=more_items
    http://example.com#lots-of-items-here

Ends With Rule

An "Ends With" Rule applies the match_pattern to the end of the referer's path. Note that this does not account for any query parameters or fragments.

A rule with domain: 'example.com', segment_url_match_type_id: 4, and match_pattern: 'items'

Will match:

    http://example.com/items
    http://example.com/inventory/items
    http://example.com/inventory/items?q=search

Will NOT match:

    http://example.com/item
    http://example.com?q=more_items
    http://example.com#lots-of-items-here
    http://example.com/items/35
    http://example.com/items?id=35
    http://example.com/items.html

Create a First Party Segment Rule with an 'exactly matches' Match Pattern

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "first_party_segment_rule": {
          "domain":  "example.com",
          "match_pattern": "/schedule?day=yesterday",
          "segment_url_match_type_id": 1
        }
      }' \
  "https://app.simpli.fi/api/first_party_segments/105229/first_party_segment_rules"

Getting a Specific First Party Segment Rule

Example - get first_party_segment_rule 1105094:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/first_party_segment_rules/1105094"

The JSON returned:

{
  "first_party_segment_rules": [
    {
      "resource": "https://app.simpli.fi/api/first_party_segment_rules/1105094",
      "id": 1105094,
      "domain": "example.com",
      "segment_url_match_type_id": 1,
      "match_pattern": "/schedule?day=yesterday",
      "has_feed": false,
      "has_data": true,
      "first_party_segment_captures_attributes": []
    }
  ]
}

Updating a First Party Segment Rule

Example - update the name of first_party_segment_rule with id 1105094:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "first_party_segment_rule": {
          "match_pattern": "/schedule?day=tomorrow"
        }
      }' \
  "https://app.simpli.fi/api/first_party_segment_rules/1105094"

Deleting a First Party Segment Rule

Deleting a first_party_segment_rule is permanent. Deleting a first_party_segment_rule can adversely affect the performance of any campaign using the first_party_segment that the the rule belongs to.

Example - delete the first_party_segment_rule with id 105235:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/first_party_segment_rules/1105094"

First Party Segments

Listing first_party_segments that belong to an organization.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/first_party_segments"

Response

{
  "first_party_segments": [
    {
      "resource": "https://app.simpli.fi/api/first_party_segments/300510",
      "id": 300510,
      "name": "ORG_5787 blue_100510",
      "user_count": 4096,
      "days_inactive": 35,
      "active": false,
      "organization_id": 5787,
      "has_rules": true,
      "has_custom_values": true,
      "activity": [],
      "last_activity": "Not yet seen",
      "company_wide": false,
      "custom_values_enabled": true,
      "resources": [
        {
          "first_party_segment_rules": "https://app.simpli.fi/api/first_party_segments/300510/first_party_segment_rules"
        },
        {
          "first_party_segment_custom_values": "https://app.simpli.fi/api/first_party_segments/300510/first_party_segment_custom_values"
        },
        {
          "first_party_segment_tags": "https://app.simpli.fi/api/first_party_segments/300510/organization_tags"
        },
        {
          "changes": "https://app.simpli.fi/api/first_party_segments/300510/changes"
        }
      ]
    },
    ... Not showing all first party segments in the output ...
  ],
  "paging": {
    "page": 1,
    "size": 10,
    "total": 2908,
    "next": "https://app.simpli.fi/api/organizations/5787/first_party_segments?page=2"
  }
}

HTTP Methods Supported

    GET
    POST
    PUT
    DELETE

Query String Params
"search_term"

The search_term query string param looks for matches against the name of the first_party_segment.

Example:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/first_party_segments?search_term=hat"

"has_rules"

The has_rules query string param can be used to limit results to first_party_segments that have first_party_segment_rules (e.g. 'has_rules=true'), or do not have first_party_segment_rules (e.g. 'has_rules=false').

Example:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/first_party_segments?has_rules=true"

"has_custom_values"

The has_custom_values query string param can be used to limit results to first_party_segments that have first_party_segment_custom_values (e.g. 'has_custom_values=true') or do not have first_party_segment_rules (e.g. 'has_custom_values=false').

Example:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/first_party_segments?has_custom_values=true"

"segment_type"

Filter the results by how the first_party_segment can be used in a campaign. Valid values are retargeting or conversion. The first_party_segments returned meet all the criteria for the requested type.

Example

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/first_party_segments?segment_type=conversion"

Available First Party Segment

The available endpoint will return all first_party_segments that an organization may use in campaigns. These include the first_party_segments owned by the organization and first_party_segments owned by another organization, a first_party_segment_provider. The results for each first_party_segment only includes the publicly available fields. Details of first_party_segment_rules, first_party_segment_custom_values and first_party_segment_tags are not returned.

The query string parameters defined above may be used with the available endpoint.

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/first_party_segments/available"

Creating a First Party Segment

The POST body should be formatted as JSON and use the following format. The POST is only supported when nested within an organization context.

    Refer to First Party Segment Rules for details of the requirements for first_party_segment_rules
    Refer to First Party Segment Custom Values for details of the requirements for first_party_segment_custom_values
    Refer to Organization Tags for details on first_party_segment_tags. However, note that a first_party_segment cannot be created without at least one associated first_party_segment_tag id.

First Party Segment with Rules, Custom Values and Tags Example

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "first_party_segment": {
          "name":  "My First Segment",
          "custom_values_enabled": true,
          "company_wide": false,
          "first_party_segment_rules": [
            {
              "domain": "http://example.com",
              "match_pattern": "prize",
              "segment_url_match_type_id": 1
            },
            {
              "domain": "http://example.com",
              "match_pattern": "/sign_up",
              "segment_url_match_type_id": 2
            },
            {
              "domain": "http://example.com",
              "match_pattern": "/welcome",
              "segment_url_match_type_id": 2
            }
          ],
          "first_party_segment_custom_values": [
            {
              "segment_custom_value_type_id": 2
            }
          ],
          "first_party_segment_tags": [11, 23]
        }
      }' \
  "https://app.simpli.fi/api/organizations/5787/first_party_segments"

First Party Segment Without Rules or Custom Values Example

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "first_party_segment": {
          "name":  "My Example Segment",
          "custom_values_enabled": true,
          "company_wide": false,
          "first_party_segment_tags": [11]
        }
      }' \
  "https://app.simpli.fi/api/organizations/5787/first_party_segments"

Getting a Specific First Party Segment

Example - get first_party_segment 105234:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/first_party_segments/105234"

The JSON returned:

{
  "first_party_segments": [
    {
      "resource": "https://app.simpli.fi/api/first_party_segments/105234",
      "id": 105234,
      "name": "My First Segment",
      "user_count": 0,
      "days_inactive": 0,
      "active": false,
      "organization_id": 5787,
      "has_rules": true,
      "has_custom_values": true,
      "activity": [],
      "last_activity": "Not yet seen",
      "company_wide": false,
      "custom_values_enabled": true,
      "resources": [
        {
          "first_party_segment_rules": "https://app.simpli.fi/api/first_party_segments/105234/first_party_segment_rules"
        },
        {
          "first_party_segment_custom_values": "https://app.simpli.fi/api/first_party_segments/105234/first_party_segment_custom_values"
        },
        {
          "first_party_segment_tags": "https://app.simpli.fi/api/organizations/423/organization_tags?first_party_segment_id=105234"
        }
      ]
    }
  ]
}

Updating a First Party Segment

The only fields which may be updated directly are name, custom_values_enabled and company_wide. Update the first_party_segment_tags by passing in an array of tag ids you want associated with the segment. It will replace the segment's current set of existing tag associations. Passing an empty array or nil will leave its current set of tag associations unaffected. The first_party_segment_rules must be updated using the first_party_segment_rules endpoint. The first_party_segment_custom_values must be updated using the first_party_segment_custom_values endpoint.

Example - update the name of first_party_segment with id 105235:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "first_party_segment": {
          "name":  "My Better Segment Name",
          "custom_values_enabled": false,
          "company_wide": true,
          "first_party_segment_tags": [11, 23]
        }
      }' \
  "https://app.simpli.fi/api/first_party_segments/105235"

Deleting a First Party Segment

Deleting a first_party_segment is permanent. Deleting a first_party_segment can adversely affect the performance of any campaign using that first_party_segment. You will not be able to delete a first_party_segment currently in use by an active campaign. It must be removed from the campaign first.

Example - delete the first_party_segment with id 105235:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/first_party_segments/105226"

Example - attempt to delete the first_party_segment with id 21356 and the name "Test Segment" which is in use by an active campaign with a company_id of 92356 and id of 316772:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/first_party_segments/21356"

The JSON returned:

{
  "errors": [
    {
      "message": "The Test Segment (id: 21356) audience is currently being used by campaigns, remove the audience from:"
      "campaign_error_urls": [
        "https://app.simpli.fi/organizations/92356/campaigns/316772/edit"
      ]
    }
  ]
}

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

IP Ranges

Get the IP ranges for a campaign.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/831/ip_ranges"

Response

{
  "ip_ranges": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaigns/831/ip_ranges",
      "name": "IP Ranges for My best campaign yet! (9)",
      "count": 5,
      "actions": [
        {
          "download": {
            "href": "https://app.simpli.fi/api/organizations/8/campaigns/831/ip_ranges/download",
            "method": "GET"
          }
        }
      ]
    }
  ]
}

Updating IP Ranges

IP ranges can be set on a campaign by uploading a CSV file with the IP ranges. The IP ranges uploaded in the CSV will overwrite any IP ranges that are already assigned to the campaign. Attempting to add IP ranges to a geo optimized type campaign will result in an error with no IP ranges being added.
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: multipart/form-data" \
  -F "ip_range[csv]=@ip_ranges.csv;type=text/csv" \
  "https://app.simpli.fi/api/organizations/8/campaigns/831/ip_ranges"

Where the file ip_ranges.csv has IP ranges in the format:

192.168.4.4,192.168.4.4
192.168.5.0,192.168.5.12

Or dash delimited:

192.168.4.4 - 192.168.4.4
192.168.5.0 - 192.168.5.12

New IP ranges can be appended to existing ones within a campaign, instead of overwriting them, by setting the append parameter to true:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: multipart/form-data" \
  -F "ip_range[csv]=@ip_ranges.csv;type=text/csv" \
  -F "ip_range[append]=true" \
  "https://app.simpli.fi/api/organizations/8/campaigns/831/ip_ranges"

Keywords

Get the keywords for a campaign.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/keywords"

Response

{
  "keywords": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaigns/644/keywords",
      "name": "Keywords for My new campaign name",
      "count": 5,
      "count_with_individual_bids": 1,
      "actions": [
        {
          "download": {
            "href": "https://app.simpli.fi/api/organizations/8/campaigns/644/keywords/download",
            "method": "GET"
          }
        }
      ]
    }
  ]
}

HTTP Methods Supported

    GET
    PUT
    DELETE

Updating Keywords

The PUT is a little different for keywords since it is a file upload. The Content-Type needs to be multipart/form-data.

By default a PUT replaces all of the keywords in the campaign with the keywords from the PUT request. In order to edit the max_bid of existing keywords or to add additional keywords to a campaign the form field keyword[append] with value true must be included in the request.

Example output of the request to replace keywords:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -F "keyword[csv]=@keywords.csv" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/keywords"

Where the file keywords.csv has the following content:

one,0.75
two
three,1.21

Example of the request that appends keywords:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -F "keyword[csv]=@keywords.csv" \
  -F "keyword[append]=true" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/keywords"

Land Uses

Curl example to get all land uses:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/land_uses"

Response

{
  "land_uses": [{
    "id": 1,
    "name": "SFR",
    "resource": "https://app.simpli.fi/api/land_uses/1"
  },
  {
    "id": 2,
    "name": "Residential (NEC)",
    "resource": "https://app.simpli.fi/api/land_uses/2"
  }]
}

Curl example to get a single land use:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/land_uses/1"

Response

{
  "land_uses": [{
    "id": 1,
    "name": "SFR",
    "resource": "https://app.simpli.fi/api/land_uses/1"
  }]
}

HTTP Methods Supported

    GET

Markup Rate Types

Curl example to get all markup rate types:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/markup_rate_types"

Response

{
  "markup_rate_types": [{
    "resource": "https://app.simpli.fi/api/markup_rate_types/1",
    "id": 1,
    "description": "by CPM"
  }, {
    "resource": "https://app.simpli.fi/api/markup_rate_types/2",
    "id": 2,
    "description": "by Percent (media)"
  }, {
    "resource": "https://app.simpli.fi/api/markup_rate_types/3",
    "id": 3,
    "description": "by Percent (spend)"
  }]
}

Media Types

Get a list of available media types.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/media_types"

Response

{
  "media_types": [
    {
      "resource": "https://app.simpli.fi/api/media_types/1",
      "id": 1,
      "name": "Display",
    },
    {
      "resource": "https://app.simpli.fi/api/media_types/2",
      "id": 2,
      "name": "Video",
    }
  ]
}

Multi Campaign Keywords

This endpoint allows a group of keywords to be added to multiple campaigns in a single request. An optional max bid may be specified per keyword. Keywords added via this endpoint will be escaped if necessary. Existing or invalid keywords will not be added to the campaigns, however the max bid will apply to existing keywords if passed. If a max bid is specified as an empty string the existing max bid value for the relevant campaign keywords will be cleared.
HTTP Methods Supported

    POST

Adding Keywords to a Group of Campaigns

Curl example:

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "campaign_ids": [1, 2],
        "keywords": [
            {"name": "keyword"},
            {"name": "a keyword with max bid", "max_bid": 1.75},
            {"name": "clearing max bid on an existing keyword", "max_bid": ""}
        ]
      }' \
  "https://app.simpli.fi/api/campaigns/bulk/keywords"

Response:

{
    "summary": "Added 3 keywords to 2 campaigns",
    "keywords_added": {
        "1": 2,
        "2": 2
    }
}

OBA Providers

Get a list of available OBA Providers.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/oba_providers"

Response

{
  "oba_providers": [
    {
      "resource": "https://app.simpli.fi/api/oba_providers/1",
      "id": 1,
      "name": "Truste",
    },
    {
      "resource": "https://app.simpli.fi/api/oba_providers/3",
      "id": 3,
      "name": "OBA Compliance already present",
    }
  ]
}

Operating Systems

These determine which operating systems a campaign targets. Campaigns target all operating systems by default.
HTTP Methods Supported

    GET
    PUT
    DELETE

Listing All Available Operating Systems
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/operating_systems"

Response

{
  "operating_systems": [
    {
      "id": 1,
      "name": "All",
      "resource": "https://app.simpli.fi/api/operating_systems/1"
    },
    {
      "id": 2,
      "name": "Android All Versions",
      "resource": "https://app.simpli.fi/api/operating_systems/2"
    },
    {
      "id": 3,
      "name": "Chrome OS All Versions",
      "resource": "https://app.simpli.fi/api/operating_systems/3"
    },
    {
      "id": 4,
      "name": "iOS All Versions",
      "resource": "https://app.simpli.fi/api/operating_systems/4"
    },
    {
      "id": 5,
      "name": "Linux All Versions",
      "resource": "https://app.simpli.fi/api/operating_systems/5"
    },
    {
      "id": 6,
      "name": "macOS All Versions",
      "resource": "https://app.simpli.fi/api/operating_systems/6"
    },
    {
      "id": 7,
      "name": "Windows All Versions",
      "resource": "https://app.simpli.fi/api/operating_systems/7"
    },
    {
      "id": 8,
      "name": "Android 4.x (Ice Cream Sandwich, Jelly Bean & KitKat)",
      "resource": "https://app.simpli.fi/api/operating_systems/8"
    },
    ... Not showing all operating systems in the output ...
  ]
}

Listing All Operating Systems for a Campaign
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/697/operating_systems"

Response

{
  "operating_systems": [
    {
      "id": 29,
      "name": "Windows 7",
      "resource": "https://app.simpli.fi/api/operating_systems/29"
    },
    {
      "id": 30,
      "name": "Windows 8",
      "resource": "https://app.simpli.fi/api/operating_systems/30"
    },
    {
      "id": 31,
      "name": "Windows 10",
      "resource": "https://app.simpli.fi/api/operating_systems/31"
    },
    {
      "id": 32,
      "name": "Android 10.x",
      "resource": "https://app.simpli.fi/api/operating_systems/32"
    },
    {
      "id": 33,
      "name": "iOS 13",
      "resource": "https://app.simpli.fi/api/operating_systems/33"
    },
    {
      "id": 34,
      "name": "macOS 10.15 (Catalina)",
      "resource": "https://app.simpli.fi/api/operating_systems/34"
    }
  ]
}

Showing a Single Operating System
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/operating_systems/1"

Response

{
  "operating_systems": [
    {
      "id": 1,
      "name": "All",
      "resource": "https://app.simpli.fi/api/operating_systems/1"
    }
  ]
}

Updating the Operating Systems for a Campaign

The All operating system id can only be passed in by itself and the <OS Name> - All Versions operating system ids can not be passed in alongside any of their child versions.
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "operating_system_ids": [29, 30, 31, 32, 33, 34]
      }' \
  "https://app.simpli.fi/api/campaigns/2/operating_systems"

Response

{
  "operating_systems": [
    {
      "id": 29,
      "name": "Windows 7",
      "resource": "https://app.simpli.fi/api/operating_systems/29"
    },
    {
      "id": 30,
      "name": "Windows 8",
      "resource": "https://app.simpli.fi/api/operating_systems/30"
    },
    {
      "id": 31,
      "name": "Windows 10",
      "resource": "https://app.simpli.fi/api/operating_systems/31"
    },
    {
      "id": 32,
      "name": "Android 10.x",
      "resource": "https://app.simpli.fi/api/operating_systems/32"
    },
    {
      "id": 33,
      "name": "iOS 13",
      "resource": "https://app.simpli.fi/api/operating_systems/33"
    },
    {
      "id": 34,
      "name": "macOS 10.15 (Catalina)",
      "resource": "https://app.simpli.fi/api/operating_systems/34"
    }
  ]
}

Resetting the Operating Systems for a Campaign
Request

This is equivalent to updating the campaign with the All operating system id.

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/697/operating_systems"

Response

The response will have status 204 upon successful reset.
Organization Domain Blocklists

Organization domain blocklists apply by default to all campaigns assigned to that organization and its descendants. Campaigns can be opted out of the organization domain blocklist on an individual basis.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/organization_blocklists"

Response

{
  "organization_blocklists": [
    {
      "domain_count": 4,
      "resource": "https://app.simpli.fi/api/organizations/8/organization_blocklists",
      "resources": [
        {
          "download": {
            "href": "https://app.simpli.fi/api/organizations/8/organization_blocklists/download",
            "method": "GET"
          }
        },
        {
          "add": {
            "href": "https://app.simpli.fi/api/organizations/8/organization_blocklists/add",
            "method": "PUT"
          }
        },
        {
          "remove": {
            "href": "https://app.simpli.fi/api/organizations/8/organization_blocklists/remove",
            "method": "PUT"
          }
        },
        {
          "delete_all": {
            "href": "https://app.simpli.fi/api/organizations/8/organization_blocklists",
            "method": "DELETE"
          }
        }
      ]
    }
  ]
}

Downloading the Blocklist
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/organization_blocklists/download"

Response

The download action returns all of the organization blocklist domains in CSV format. In order to include associated information for blocklisted domains (id, organization, created date) pass the optional parameter full with value true.
Adding Domains to the Blocklist

Additional domains can be added to a campaign using a PUT request. The domains to be added to the campaign are uploaded using a CSV file.
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -F "csv_file=@domains.csv" \
  "https://app.simpli.fi/api/organizations/8/organization_blocklists/add"

Where the file domains.csv has the following content:

http://www.csv.upload.1.pri
http://www.csv.upload.2.pri

Using json:
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "domains": [
          "http://www.json.upload.1.pri",
          "http://www.json.upload.2.pri"
        ]
      }' \
  "https://app.simpli.fi/api/organizations/8/organization_blocklists/add"

Response

{
  "added": 2
}

Deleting Specific Domains from the Blocklist

A PUT request is used to remove specific domains from the organization blocklist. The blocklist item id is found in the first column of the download CSV.
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "blocklist_item_ids": [1234, 2345]
      }' \
  "https://app.simpli.fi/api/organizations/8/organization_blocklists/remove"

Response

{
  "removed": 2
}

Deleting All Domains from the Blocklist

A DELETE request is used to remove all domains from the organization blocklist.
Request

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/organization_blocklists"

Deprecated Organization Domain Blocklist Fields

The Organization Domain Blocklist resource supports responding with deprecated fields through the use of -H "X-Api-Version: YYYY-MM-DD".

Example of receiving the deprecated organization_blacklist resource while also using the fallback endpoint.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2020-10-07" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/organization_blacklists/download"

Response

{
  "organization_blacklists": [
    {
      "domain_count": 4,
      "resource": "https://app.simpli.fi/api/organizations/8/organization_blacklists",
      "resources": [
        {
          "download": {
            "href": "https://app.simpli.fi/api/organizations/8/organization_blacklists/download",
            "method": "GET"
          }
        },
        {
          "add": {
            "href": "https://app.simpli.fi/api/organizations/8/organization_blacklists/add",
            "method": "PUT"
          }
        },
        {
          "remove": {
            "href": "https://app.simpli.fi/api/organizations/8/organization_blacklists/remove",
            "method": "PUT"
          }
        },
        {
          "delete_all": {
            "href": "https://app.simpli.fi/api/organizations/8/organization_blacklists",
            "method": "DELETE"
          }
        }
      ]
    }
  ]
}

Deprecated Download File Name

The Organization Domain Blocklist resource supports responding with a deprecated file name for the blocklist download via -H "X-Api-Version: YYYY-MM-DD".

Example of receiving the deprecated organization_blacklist resource while also using the fallback endpoint.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2020-10-07" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/organization_blacklists"

Response

The response will have the headers "Content-Disposition": "attachment; filename=\"test-organization-blacklist.csv\"" assuming that the name of the referenced organization is "Test Organization". The filename will change depending on the name of the organization.
Organization Tags

Curl example to get the tags for an organization:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/organization_tags"

Response

{
  "organization_tags": [
    {
      "resource": "https://app.simpli.fi/api/organization_tags/6191",
      "id": 6191,
      "organization_id": 5787,
      "description": "Place the JavaScript tag before the ending </body> tag of all pages of your website",
      "tag": "<script async src='https://tag.simpli.fi/sifitag/0e01d3e0-bb3b-0133-4585-320019372b80'></script>",
      "allow_user_matching": true
    }
  ]
}

Query String Params
"first_party_segment_id"

The first_party_segment_id query string param retrieves the tags associated with a specific first_party_segment.

Example:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/organization_tags?first_party_segment_id=105234"

Creating a Tag

The POST body should be formatted as JSON and use the following format. The POST is only supported when nested within an organization context.

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "My Best Tag Yet",
        "allow_user_matching": false
      }' \
  "https://app.simpli.fi/api/organizations/5787/organization_tags"

Updating a Tag

Updates can be accomplished using a PUT request. The only allowed values are name and allow_user_matching.

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "New Tag Name",
        "allow_user_matching": true
      }' \
  "https://app.simpli.fi/api/organizations/5787/organization_tags/123"

Organizations

Organizations represent an entity that may run Campaigns. They are arranged in relation to each other in a tree structure according to the ancestry property of the Organization.

All Organizations to which a user has access are returned in pages of 100 by default. Results may be filtered by providing a combination of the following query string parameters: ancestry, name, name_like, custom_id, custom_id_like and searchTerm.

The returned results will match all of the given query strings.

The name and custom_id query strings perform exact matches to the "name" and "custom_id" fields, respectively.

The name_like and custom_id_like query strings perform similarity matches to the "name" and "custom_id" fields, respectively.

You may sort the results according to the sortColumn parameter and pass sortOrder to determine the order of the sort: "asc" for ascending, "desc" for descending.

Curl example to get the index of organizations:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2018-06-14" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations"

Response

{
  "organizations": [
    {
      "id": 5786,
      "name": "An Organization",
      "custom_id": "",
      "ancestry": "0",
      "public_key": "4321asdfJKL",
      "website": null,
      "created_at": "2018-02-09T10:04:47.721-06:00",
      "updated_at": "2018-02-09T10:04:47.791-06:00",
      "resource": "https://app.simpli.fi/api/organizations/5786",
      "resources": [
        {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/5786/ad_template_groups"
        },
        {
          "audiences": "https://app.simpli.fi/api/organizations/5786/audiences"
        },
        {
          "campaign_stats": "https://app.simpli.fi/api/organizations/5786/campaign_stats"
        },
        {
          "campaigns": "https://app.simpli.fi/api/organizations/5786/campaigns"
        },
        {
          "custom_fields": "https://app.simpli.fi/api/organizations/5786/custom_fields"
        },
        {
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/5786/dynamic_ad_feeds"
        },
        {
          "first_party_segments": "https://app.simpli.fi/api/organizations/5786/first_party_segments"
        },
        {
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/5786/first_party_segment_providers"
        },
        {
          "keyword_categories": "https://app.simpli.fi/api/organizations/5786/keyword_categories"
        },
        {
          "organization_tags": "https://app.simpli.fi/api/organizations/5786/organization_tags"
        },
        {
          "report_center_reports": "https://app.simpli.fi/api/organizations/5786/report_center/reports"
        },
        {
          "segment_tags": "https://app.simpli.fi/api/organizations/5786/segment_tags"
        },
        {
          "organization_blocklists": "https://app.simpli.fi/api/organizations/5786/organization_blocklists"
        }
      ]
    },
    {
      "id": 3813,
      "name": "A Company",
      "custom_id": "",
      "ancestry": "0/5786",
      "public_key": "JKLasdf0",
      "website": null,
      "created_at": "2018-02-06T16:29:50.891-06:00",
      "updated_at": "2018-02-08T09:23:23.226-06:00",
      "resource": "https://app.simpli.fi/api/organizations/3813",
      "resources": [
        {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/3813/ad_template_groups"
        },
        {
          "audiences": "https://app.simpli.fi/api/organizations/3813/audiences"
        },
        {
          "campaign_stats": "https://app.simpli.fi/api/organizations/3813/campaign_stats"
        },
        {
          "campaigns": "https://app.simpli.fi/api/organizations/3813/campaigns"
        },
        {
          "custom_fields": "https://app.simpli.fi/api/organizations/3813/custom_fields"
        },
        {
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/3813/dynamic_ad_feeds"
        },
        {
          "first_party_segments": "https://app.simpli.fi/api/organizations/3813/first_party_segments"
        },
        {
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/3813/first_party_segment_providers"
        },
        {
          "keyword_categories": "https://app.simpli.fi/api/organizations/3813/keyword_categories"
        },
        {
          "organization_tags": "https://app.simpli.fi/api/organizations/3813/organization_tags"
        },
        {
          "report_center_reports": "https://app.simpli.fi/api/organizations/3813/report_center/reports"
        },
        {
          "segment_tags": "https://app.simpli.fi/api/organizations/3813/segment_tags"
        },
        {
          "organization_blocklists": "https://app.simpli.fi/api/organizations/3813/organization_blocklists"
        }
      ]
    },
    {
      "id": 6000,
      "name": "An Organization",
      "custom_id": "cliX1 ",
      "ancestry": "0/5786/3813",
      "public_key": "asdfJKL0",
      "website": null,
      "created_at": "2018-02-06T16:29:51.064-06:00",
      "updated_at": "2018-02-08T09:22:22.685-06:00",
      "resource": "https://app.simpli.fi/api/organizations/6000",
      "resources": [
        {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/6000/ad_template_groups"
        },
        {
          "audiences": "https://app.simpli.fi/api/organizations/6000/audiences"
        },
        {
          "campaign_stats": "https://app.simpli.fi/api/organizations/6000/campaign_stats"
        },
        {
          "campaigns": "https://app.simpli.fi/api/organizations/6000/campaigns"
        },
        {
          "custom_fields": "https://app.simpli.fi/api/organizations/6000/custom_fields"
        },
        {
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/6000/dynamic_ad_feeds"
        },
        {
          "first_party_segments": "https://app.simpli.fi/api/organizations/6000/first_party_segments"
        },
        {
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/6000/first_party_segment_providers"
        },
        {
          "keyword_categories": "https://app.simpli.fi/api/organizations/6000/keyword_categories"
        },
        {
          "organization_tags": "https://app.simpli.fi/api/organizations/6000/organization_tags"
        },
        {
          "report_center_reports": "https://app.simpli.fi/api/organizations/6000/report_center/reports"
        },
        {
          "segment_tags": "https://app.simpli.fi/api/organizations/6000/segment_tags"
        },
        {
          "organization_blocklists": "https://app.simpli.fi/api/organizations/6000/organization_blocklists"
        }
      ]
    }
  ],
  "paging": {
    "page": 1,
    "size": 100,
    "total": 3
  }
}

For versions before 2018-06-14, the resources were returned in a single hash. This was changed to match other endpoints, to be parsed in the same format. Below is an example using the older format.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2018-06-13" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations"

Response

{
  "organizations": [
    {
      "id": 5786,
      "name": "An Organization",
      "custom_id": "",
      "ancestry": "0",
      "public_key": "4321asdfJKL",
      "website": null,
      "created_at": "2018-02-09T10:04:47.721-06:00",
      "updated_at": "2018-02-09T10:04:47.791-06:00",
      "resource": "https://app.simpli.fi/api/organizations/5786",
      "resources": {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/5786/ad_template_groups",
          "audiences": "https://app.simpli.fi/api/organizations/5786/audiences",
          "campaign_stats": "https://app.simpli.fi/api/organizations/5786/campaign_stats",
          "campaigns": "https://app.simpli.fi/api/organizations/5786/campaigns",
          "custom_fields": "https://app.simpli.fi/api/organizations/5786/custom_fields",
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/5786/dynamic_ad_feeds",
          "first_party_segments": "https://app.simpli.fi/api/organizations/5786/first_party_segments",
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/5786/first_party_segment_providers",
          "keyword_categories": "https://app.simpli.fi/api/organizations/5786/keyword_categories",
          "organization_tags": "https://app.simpli.fi/api/organizations/5786/organization_tags",
          "report_center_reports": "https://app.simpli.fi/api/organizations/5786/report_center/reports",
          "segment_tags": "https://app.simpli.fi/api/organizations/5786/segment_tags",
          "organization_blocklists": "https://app.simpli.fi/api/organizations/5786/organization_blocklists"
      }
    },
    {
      "id": 3813,
      "name": "A Company",
      "custom_id": "",
      "ancestry": "0/5786",
      "public_key": "JKLasdf0",
      "website": null,
      "created_at": "2018-02-06T16:29:50.891-06:00",
      "updated_at": "2018-02-08T09:23:23.226-06:00",
      "resource": "https://app.simpli.fi/api/organizations/3813",
      "resources": {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/3813/ad_template_groups",
          "audiences": "https://app.simpli.fi/api/organizations/3813/audiences",
          "campaign_stats": "https://app.simpli.fi/api/organizations/3813/campaign_stats",
          "campaigns": "https://app.simpli.fi/api/organizations/3813/campaigns",
          "custom_fields": "https://app.simpli.fi/api/organizations/3813/custom_fields",
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/3813/dynamic_ad_feeds",
          "first_party_segments": "https://app.simpli.fi/api/organizations/3813/first_party_segments",
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/3813/first_party_segment_providers",
          "keyword_categories": "https://app.simpli.fi/api/organizations/3813/keyword_categories",
          "organization_tags": "https://app.simpli.fi/api/organizations/3813/organization_tags",
          "report_center_reports": "https://app.simpli.fi/api/organizations/3813/report_center/reports",
          "segment_tags": "https://app.simpli.fi/api/organizations/3813/segment_tags",
          "organization_blocklists": "https://app.simpli.fi/api/organizations/3813/organization_blocklists"
      }
    },
    {
      "id": 6000,
      "name": "An Organization",
      "custom_id": "cliX1 ",
      "ancestry": "0/5786/3813",
      "public_key": "asdfJKL0",
      "website": null,
      "created_at": "2018-02-06T16:29:51.064-06:00",
      "updated_at": "2018-02-08T09:22:22.685-06:00",
      "resource": "https://app.simpli.fi/api/organizations/6000",
      "resources": {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/6000/ad_template_groups",
          "audiences": "https://app.simpli.fi/api/organizations/6000/audiences",
          "campaign_stats": "https://app.simpli.fi/api/organizations/6000/campaign_stats",
          "campaigns": "https://app.simpli.fi/api/organizations/6000/campaigns",
          "custom_fields": "https://app.simpli.fi/api/organizations/6000/custom_fields",
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/6000/dynamic_ad_feeds",
          "first_party_segments": "https://app.simpli.fi/api/organizations/6000/first_party_segments",
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/6000/first_party_segment_providers",
          "keyword_categories": "https://app.simpli.fi/api/organizations/6000/keyword_categories",
          "organization_tags": "https://app.simpli.fi/api/organizations/6000/organization_tags",
          "report_center_reports": "https://app.simpli.fi/api/organizations/6000/report_center/reports",
          "segment_tags": "https://app.simpli.fi/api/organizations/6000/segment_tags",
          "organization_blocklists": "https://app.simpli.fi/api/organizations/6000/organization_blocklists"
      }
    }
  ],
  "paging": {
    "page": 1,
    "size": 100,
    "total": 3
  }
}

Special Format for a Single Organization

For versions before 2018-06-14, using GET for an organization ID returned a single organization hash, instead of an array containing a single hash. This is no longer the case; the current version returns a format identical to the index, with only one organization in the array. It also had a single resource hash, instead of an array of hashes. This was changed to match other API endpoints. Below is an example using the older format.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2018-06-13" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/6000"

Response

{
  "id": 6000,
  "name": "An Organization",
  "custom_id": "cliX1 ",
  "ancestry": "0/5786/3813",
  "public_key": "asdfJKL0",
  "website": null,
  "created_at": "2018-02-06T16:29:51.064-06:00",
  "updated_at": "2018-02-08T09:22:22.685-06:00",
  "resource": "https://app.simpli.fi/api/organizations/6000",
  "resources": {
      "ad_template_groups": "https://app.simpli.fi/api/organizations/6000/ad_template_groups",
      "audiences": "https://app.simpli.fi/api/organizations/6000/audiences",
      "campaign_stats": "https://app.simpli.fi/api/organizations/6000/campaign_stats",
      "campaigns": "https://app.simpli.fi/api/organizations/6000/campaigns",
      "custom_fields": "https://app.simpli.fi/api/organizations/6000/custom_fields",
      "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/6000/dynamic_ad_feeds",
      "first_party_segments": "https://app.simpli.fi/api/organizations/6000/first_party_segments",
      "first_party_segment_providers": "https://app.simpli.fi/api/organizations/6000/first_party_segment_providers",
      "keyword_categories": "https://app.simpli.fi/api/organizations/6000/keyword_categories",
      "organization_tags": "https://app.simpli.fi/api/organizations/6000/organization_tags",
      "report_center_reports": "https://app.simpli.fi/api/organizations/6000/report_center/reports",
      "segment_tags": "https://app.simpli.fi/api/organizations/6000/segment_tags",
      "organization_blocklists": "https://app.simpli.fi/api/organizations/6000/organization_blocklists"
  }
}

The children of an Organization are the organization's direct descendants.

Curl example to get the children of an organization:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2018-06-14" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5786/children"

Response

{
  "organizations": [
    {
      "id": 3813,
      "name": "A Company",
      "custom_id": "",
      "ancestry": "0/5786",
      "public_key": "JKLasdf0",
      "website": null,
      "created_at": "2018-02-06T16:29:50.891-06:00",
      "updated_at": "2018-02-08T09:23:23.226-06:00",
      "resource": "https://app.simpli.fi/api/organizations/3813",
      "resources": [
        {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/3813/ad_template_groups"
        },
        {
          "audiences": "https://app.simpli.fi/api/organizations/3813/audiences"
        },
        {
          "campaign_stats": "https://app.simpli.fi/api/organizations/3813/campaign_stats"
        },
        {
          "campaigns": "https://app.simpli.fi/api/organizations/3813/campaigns"
        },
        {
          "custom_fields": "https://app.simpli.fi/api/organizations/3813/custom_fields"
        },
        {
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/3813/dynamic_ad_feeds"
        },
        {
          "first_party_segments": "https://app.simpli.fi/api/organizations/3813/first_party_segments"
        },
        {
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/3813/first_party_segment_providers"
        },
        {
          "keyword_categories": "https://app.simpli.fi/api/organizations/3813/keyword_categories"
        },
        {
          "organization_tags": "https://app.simpli.fi/api/organizations/3813/organization_tags"
        },
        {
          "report_center_reports": "https://app.simpli.fi/api/organizations/3813/report_center/reports"
        },
        {
          "segment_tags": "https://app.simpli.fi/api/organizations/3813/segment_tags"
        },
        {
          "organization_blocklists": "https://app.simpli.fi/api/organizations/3813/organization_blocklists"
        }
      ]
    }
  ],
  "paging": {
    "page": 1,
    "size": 100,
    "total": 1
  }
}

For versions before 2018-06-14, the resources were returned in a single hash. This was changed to match other endpoints, to be parsed in the same format. Below is an example using the older format.

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2018-06-13" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5786/children"

Response

{
  "organizations": [
    {
      "id": 3813,
      "name": "A Company",
      "custom_id": "",
      "ancestry": "0/5786",
      "public_key": "JKLasdf0",
      "website": null,
      "created_at": "2018-02-06T16:29:50.891-06:00",
      "updated_at": "2018-02-08T09:23:23.226-06:00",
      "resource": "https://app.simpli.fi/api/organizations/3813",
      "resources": {
        "ad_template_groups": "https://app.simpli.fi/api/organizations/3813/ad_template_groups",
        "audiences": "https://app.simpli.fi/api/organizations/3813/audiences",
        "campaign_stats": "https://app.simpli.fi/api/organizations/3813/campaign_stats",
        "campaigns": "https://app.simpli.fi/api/organizations/3813/campaigns",
        "custom_fields": "https://app.simpli.fi/api/organizations/3813/custom_fields",
        "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/3813/dynamic_ad_feeds",
        "first_party_segments": "https://app.simpli.fi/api/organizations/3813/first_party_segments",
        "first_party_segment_providers": "https://app.simpli.fi/api/organizations/3813/first_party_segment_providers",
        "keyword_categories": "https://app.simpli.fi/api/organizations/3813/keyword_categories",
        "organization_tags": "https://app.simpli.fi/api/organizations/3813/organization_tags",
        "report_center_reports": "https://app.simpli.fi/api/organizations/3813/report_center/reports",
        "segment_tags": "https://app.simpli.fi/api/organizations/3813/segment_tags",
        "organization_blocklists": "https://app.simpli.fi/api/organizations/3813/organization_blocklists"
      }
    }
  ],
  "paging": {
    "page": 1,
    "size": 100,
    "total": 1
  }
}

The descendants of an Organization include all of the organization's descendants.

Curl example to get the descendants of an organization:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2018-06-14" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5786/descendants"

Response

{
  "organizations": [
    {
      "id": 3813,
      "name": "A Company",
      "custom_id": "",
      "ancestry": "0/5786",
      "public_key": "JKLasdf0",
      "website": null,
      "created_at": "2018-02-06T16:29:50.891-06:00",
      "updated_at": "2018-02-08T09:23:23.226-06:00",
      "resource": "https://app.simpli.fi/api/organizations/3813",
      "resources": [
        {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/3813/ad_template_groups"
        },
        {
          "audiences": "https://app.simpli.fi/api/organizations/3813/audiences"
        },
        {
          "campaign_stats": "https://app.simpli.fi/api/organizations/3813/campaign_stats"
        },
        {
          "campaigns": "https://app.simpli.fi/api/organizations/3813/campaigns"
        },
        {
          "custom_fields": "https://app.simpli.fi/api/organizations/3813/custom_fields"
        },
        {
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/3813/dynamic_ad_feeds"
        },
        {
          "first_party_segments": "https://app.simpli.fi/api/organizations/3813/first_party_segments"
        },
        {
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/3813/first_party_segment_providers"
        },
        {
          "keyword_categories": "https://app.simpli.fi/api/organizations/3813/keyword_categories"
        },
        {
          "organization_tags": "https://app.simpli.fi/api/organizations/3813/organization_tags"
        },
        {
          "report_center_reports": "https://app.simpli.fi/api/organizations/3813/report_center/reports"
        },
        {
          "segment_tags": "https://app.simpli.fi/api/organizations/3813/segment_tags"
        },
        {
          "organization_blocklists": "https://app.simpli.fi/api/organizations/3813/organization_blocklists"
        }
      ]
    },
    {
      "id": 6000,
      "name": "An Organization",
      "custom_id": "cliX1 ",
      "ancestry": "0/5786/3813",
      "public_key": "asdfJKL0",
      "website": null,
      "created_at": "2018-02-06T16:29:51.064-06:00",
      "updated_at": "2018-02-08T09:22:22.685-06:00",
      "resource": "https://app.simpli.fi/api/organizations/6000",
      "resources": [
        {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/6000/ad_template_groups"
        },
        {
          "audiences": "https://app.simpli.fi/api/organizations/6000/audiences"
        },
        {
          "campaign_stats": "https://app.simpli.fi/api/organizations/6000/campaign_stats"
        },
        {
          "campaigns": "https://app.simpli.fi/api/organizations/6000/campaigns"
        },
        {
          "custom_fields": "https://app.simpli.fi/api/organizations/6000/custom_fields"
        },
        {
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/6000/dynamic_ad_feeds"
        },
        {
          "first_party_segments": "https://app.simpli.fi/api/organizations/6000/first_party_segments"
        },
        {
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/6000/first_party_segment_providers"
        },
        {
          "keyword_categories": "https://app.simpli.fi/api/organizations/6000/keyword_categories"
        },
        {
          "organization_tags": "https://app.simpli.fi/api/organizations/6000/organization_tags"
        },
        {
          "report_center_reports": "https://app.simpli.fi/api/organizations/6000/report_center/reports"
        },
        {
          "segment_tags": "https://app.simpli.fi/api/organizations/6000/segment_tags"
        },
        {
          "organization_blocklists": "https://app.simpli.fi/api/organizations/6000/organization_blocklists"
        }
      ]
    }
  ],
  "paging": {
    "page": 1,
    "size": 100,
    "total": 2
  }
}

For versions before 2018-06-14, the resources were returned in a single hash. This was changed to match other endpoints, to be parsed in the same format. Below is an example using the older format.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2018-06-13" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5786/descendants"

Response

{
  "organizations": [
    {
      "id": 3813,
      "name": "A Company",
      "custom_id": "",
      "ancestry": "0/5786",
      "public_key": "JKLasdf0",
      "website": null,
      "created_at": "2018-02-06T16:29:50.891-06:00",
      "updated_at": "2018-02-08T09:23:23.226-06:00",
      "resource": "https://app.simpli.fi/api/organizations/3813",
      "resources": {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/3813/ad_template_groups",
          "audiences": "https://app.simpli.fi/api/organizations/3813/audiences",
          "campaign_stats": "https://app.simpli.fi/api/organizations/3813/campaign_stats",
          "campaigns": "https://app.simpli.fi/api/organizations/3813/campaigns",
          "custom_fields": "https://app.simpli.fi/api/organizations/3813/custom_fields",
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/3813/dynamic_ad_feeds",
          "first_party_segments": "https://app.simpli.fi/api/organizations/3813/first_party_segments",
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/3813/first_party_segment_providers",
          "keyword_categories": "https://app.simpli.fi/api/organizations/3813/keyword_categories",
          "organization_tags": "https://app.simpli.fi/api/organizations/3813/organization_tags",
          "report_center_reports": "https://app.simpli.fi/api/organizations/3813/report_center/reports",
          "segment_tags": "https://app.simpli.fi/api/organizations/3813/segment_tags",
          "organization_blocklists": "https://app.simpli.fi/api/organizations/3813/organization_blocklists"
      }
    },
    {
      "id": 6000,
      "name": "An Organization",
      "custom_id": "cliX1 ",
      "ancestry": "0/5786/3813",
      "public_key": "asdfJKL0",
      "website": null,
      "created_at": "2018-02-06T16:29:51.064-06:00",
      "updated_at": "2018-02-08T09:22:22.685-06:00",
      "resource": "https://app.simpli.fi/api/organizations/6000",
      "resources": {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/6000/ad_template_groups",
          "audiences": "https://app.simpli.fi/api/organizations/6000/audiences",
          "campaign_stats": "https://app.simpli.fi/api/organizations/6000/campaign_stats",
          "campaigns": "https://app.simpli.fi/api/organizations/6000/campaigns",
          "custom_fields": "https://app.simpli.fi/api/organizations/6000/custom_fields",
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/6000/dynamic_ad_feeds",
          "first_party_segments": "https://app.simpli.fi/api/organizations/6000/first_party_segments",
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/6000/first_party_segment_providers",
          "keyword_categories": "https://app.simpli.fi/api/organizations/6000/keyword_categories",
          "organization_tags": "https://app.simpli.fi/api/organizations/6000/organization_tags",
          "report_center_reports": "https://app.simpli.fi/api/organizations/6000/report_center/reports",
          "segment_tags": "https://app.simpli.fi/api/organizations/6000/segment_tags",
          "organization_blocklists": "https://app.simpli.fi/api/organizations/6000/organization_blocklists"
      }
    }
  ],
  "paging": {
    "page": 1,
    "size": 100,
    "total": 2
  }
}

Paging

Example:
?page=2&sortColumn=name&sortOrder=desc

The number of organizations returned on each page can be specified with the size parameter. The maximum value permitted is 10000.

Example:
?size=50

Paging parameters also work for the children and descendants endpoints.
Ancestry

Example:
?ancestry=0/5786
Name Search

Get a list of organizations with the given query string in their name. searchTerm is an alias of name_like.

Exact match example:
?name=foo

Similarity match example:
?name_like=foo
Custom ID Search

Get a list of organizations with the given query string in their custom_id field.

Exact match example:
?custom_id=abc123

Similarity match example:
?custom_id_like=abc123
Complex Example

Search name by similarity, sorted by "created_at", in descending order:
?name_like=foo&sortColumn=created_at&sortOrder=desc
Attributes Only

If attributes_only is set to true then only the attributes of campaigns will be included in the response and the lists of resources will be omitted. This reduces the amount of data in the response. This parameter may also be applied when getting a single organization.

Example: ?attributes_only=true"
HTTP Methods Supported

    GET
    POST
    PUT

Creating an Organization

The POST body should be formatted as JSON and use the following format.

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "organization": {
          "name": "My New Organization",
          "parent_id": "5786",
          "custom_id": "<Put your organization identifier here or omit this optional field>"
        }
      }' \
  "https://app.simpli.fi/api/organizations"

Receiving Deprecated Organization Blocklist URL Resources

The organizations resource supports returning a resources object for individual organizations that contains the deprecated organization_blacklist resource along with the deprecated version of its URL.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2020-10-08" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations"

Response

{
  "organizations": [
    {
      "id": 5786,
      "name": "An Organization",
      "custom_id": "",
      "ancestry": "0",
      "public_key": "4321asdfJKL",
      "website": null,
      "created_at": "2018-02-09T10:04:47.721-06:00",
      "updated_at": "2018-02-09T10:04:47.791-06:00",
      "resource": "https://app.simpli.fi/api/organizations/5786",
      "resources": [
        {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/5786/ad_template_groups"
        },
        {
          "audiences": "https://app.simpli.fi/api/organizations/5786/audiences"
        },
        {
          "campaign_stats": "https://app.simpli.fi/api/organizations/5786/campaign_stats"
        },
        {
          "campaigns": "https://app.simpli.fi/api/organizations/5786/campaigns"
        },
        {
          "custom_fields": "https://app.simpli.fi/api/organizations/5786/custom_fields"
        },
        {
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/5786/dynamic_ad_feeds"
        },
        {
          "first_party_segments": "https://app.simpli.fi/api/organizations/5786/first_party_segments"
        },
        {
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/5786/first_party_segment_providers"
        },
        {
          "keyword_categories": "https://app.simpli.fi/api/organizations/5786/keyword_categories"
        },
        {
          "organization_tags": "https://app.simpli.fi/api/organizations/5786/organization_tags"
        },
        {
          "report_center_reports": "https://app.simpli.fi/api/organizations/5786/report_center/reports"
        },
        {
          "segment_tags": "https://app.simpli.fi/api/organizations/5786/segment_tags"
        },
        {
          "organization_blacklists": "https://app.simpli.fi/api/organizations/5786/organization_blacklists"
        }
      ]
    },
    {
      "id": 3813,
      "name": "A Company",
      "custom_id": "",
      "ancestry": "0/5786",
      "public_key": "JKLasdf0",
      "website": null,
      "created_at": "2018-02-06T16:29:50.891-06:00",
      "updated_at": "2018-02-08T09:23:23.226-06:00",
      "resource": "https://app.simpli.fi/api/organizations/3813",
      "resources": [
        {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/3813/ad_template_groups"
        },
        {
          "audiences": "https://app.simpli.fi/api/organizations/3813/audiences"
        },
        {
          "campaign_stats": "https://app.simpli.fi/api/organizations/3813/campaign_stats"
        },
        {
          "campaigns": "https://app.simpli.fi/api/organizations/3813/campaigns"
        },
        {
          "custom_fields": "https://app.simpli.fi/api/organizations/3813/custom_fields"
        },
        {
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/3813/dynamic_ad_feeds"
        },
        {
          "first_party_segments": "https://app.simpli.fi/api/organizations/3813/first_party_segments"
        },
        {
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/3813/first_party_segment_providers"
        },
        {
          "keyword_categories": "https://app.simpli.fi/api/organizations/3813/keyword_categories"
        },
        {
          "organization_tags": "https://app.simpli.fi/api/organizations/3813/organization_tags"
        },
        {
          "report_center_reports": "https://app.simpli.fi/api/organizations/3813/report_center/reports"
        },
        {
          "segment_tags": "https://app.simpli.fi/api/organizations/3813/segment_tags"
        },
        {
          "organization_blacklists": "https://app.simpli.fi/api/organizations/3813/organization_blacklists"
        }
      ]
    },
    {
      "id": 6000,
      "name": "An Organization",
      "custom_id": "cliX1 ",
      "ancestry": "0/5786/3813",
      "public_key": "asdfJKL0",
      "website": null,
      "created_at": "2018-02-06T16:29:51.064-06:00",
      "updated_at": "2018-02-08T09:22:22.685-06:00",
      "resource": "https://app.simpli.fi/api/organizations/6000",
      "resources": [
        {
          "ad_template_groups": "https://app.simpli.fi/api/organizations/6000/ad_template_groups"
        },
        {
          "audiences": "https://app.simpli.fi/api/organizations/6000/audiences"
        },
        {
          "campaign_stats": "https://app.simpli.fi/api/organizations/6000/campaign_stats"
        },
        {
          "campaigns": "https://app.simpli.fi/api/organizations/6000/campaigns"
        },
        {
          "custom_fields": "https://app.simpli.fi/api/organizations/6000/custom_fields"
        },
        {
          "dynamic_ad_feeds": "https://app.simpli.fi/api/organizations/6000/dynamic_ad_feeds"
        },
        {
          "first_party_segments": "https://app.simpli.fi/api/organizations/6000/first_party_segments"
        },
        {
          "first_party_segment_providers": "https://app.simpli.fi/api/organizations/6000/first_party_segment_providers"
        },
        {
          "keyword_categories": "https://app.simpli.fi/api/organizations/6000/keyword_categories"
        },
        {
          "organization_tags": "https://app.simpli.fi/api/organizations/6000/organization_tags"
        },
        {
          "report_center_reports": "https://app.simpli.fi/api/organizations/6000/report_center/reports"
        },
        {
          "segment_tags": "https://app.simpli.fi/api/organizations/6000/segment_tags"
        },
        {
          "organization_blacklists": "https://app.simpli.fi/api/organizations/6000/organization_blacklists"
        }
      ]
    }
  ],
  "paging": {
    "page": 1,
    "size": 100,
    "total": 3
  }
}

Ads of Campaigns of an Organization

Returns ads of campaigns of an organization.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/123/ads?size=1&page=1&attributes_only=true"

Response

{
  "ads": [
    {
      "resource": "https://app.simpli.fi/api/organizations/123/campaigns/6/ads/1",
      "id": 1,
      "name": "my-great-ad.png",
      "status": "Active",
      "pacing": 100.0,
      "creative_group_id": null,
      "click_tag_verified": false,
      "preview_tag": "<iframe src="//app.simpli.fi/ads/live/6/1/ad.html?sifitest=true&sifi_uid=&sifi_exchange_uid=&cb=7950895796&sifi=7614,6,1,0,63,0,0,0,0,0,0,v,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,dalbid1,0,0,0,0,0,0,0,NoPC,0,0,0,0,0,0,0,0,0,0,0,0,0,0,123&request_id=42&dp_tmp=&sifi_kw=tv" width="840"  height="400" frameborder="0" marginwidth="0" marginheight="0"  scrolling="no"></iframe>",
      "created_at": "2020-11-02T16:50:52.412-06:00",
      "updated_at": "2020-12-01T13:45:14.202-06:00",
      "target_url": "https://mywebsite.com/great",
      "primary_creative": "my-great-ad.png",
      "primary_creative_url": "https://adspreview.simpli.fi/ads/live/6/1/54771.png",
      "alt_text": null,
      "extra_html": null
    }
  ],
  "paging": {
    "page": 1,
    "size": 1,
    "total": 1
  }
}

Parameters

size
    Set page size (maximum page size is 2500). 
page
    Select page of results. 
attributes_only
    If true then only the direct attributes of ads are returned. Defaults to false. 
descendants
    If true then ads of campaigns belonging to descendant organizations are included. Defaults to false. 
include_deleted
    If true then ads marked as deleted are also returned. Defaults to false. 
ads_filter
    CGI-escaped filter string that works just like the filters for the ads and campaigns endpoints. 

Possible filters: status, created_at and updated_at

For example, to get only currently active ads we would escape:
ads_filter=status=active as ads_filter=status%3Dactive

For example, to get current active ads created more recently than 2020-06-01 we would escape:
ads_filter=status=active;created_at>2020-06-01 as ads_filter=status%3Dactive%3Bcreated_at%3E2020-06-01
Playback Methods

Playback Methods are only used by video ads.

Get a list of available playback methods.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/playback_methods"

Response

{
  "playback_methods": [
    ... Not showing all playback methods in the output ...
    {
      "resource": "https://app.simpli.fi/api/playback_methods/1",
      "id": 1,
      "name": "auto-play sound on"
    }
  ]
}

Postal Codes

Get a list of the postal codes assigned to a campaign.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/postal_codes"

Response

{
  "postal_codes": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaigns/644/postal_codes",
      "name": "Postal codes for My new campaign name",
      "count": 2,
      "actions": [
        {
          "download": {
            "href": "https://app.simpli.fi/api/organizations/8/campaigns/644/postal_codes/download",
            "method": "GET"
          }
        }
      ],
      "postal_codes": [
        {
          "postal_code": "76102",
          "country_code": "USA"
        },
        {
          "postal_code": "76103",
          "country_code": "USA"
        }
      ]
    }
  ]
}

HTTP Methods Supported

    GET

The download action returns all of the campaign postal codes in CSV format.
Recencies

Get a list of available recencies.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/recencies"

Response

{
  "recencies": [
    ... Not showing all recencies in the output ...
    {
      "resource": "https://app.simpli.fi/api/recencies/1",
      "id": 1,
      "name": "1 month"
    }
  ]
}

Report Center - Filter Expressions

String

Matches in string filters depend on the case_sensitive setting in your model file, and on whether your dialect supports case-sensitivity. For example, if case_sensitive is enabled in your model, the expression FOO will not match the word "food". If case_sensitive is not enabled, or if your dialect does not support case-sensitivity, the expression FOO will match the word "food".
Example 	Description
FOO 	is equal to 'FOO', exactly
FOO, BAR 	is equal to either 'FOO' or 'BAR', exactly
%FOO% 	contains 'FOO', matches 'buffoon' and 'fast food'
FOO% 	starts with 'FOO', matches 'foolish' and 'food' but not 'buffoon' or 'fast food'
%FOO 	ends with 'FOO', matches 'buffoo' and 'fast foo' but not 'buffoon' or 'fast food'
F%OD 	starts with an 'F' and ends with 'OD', matches 'fast food'
EMPTY 	string is empty (has zero characters) or is null (no value)
NULL 	value is null (when it is used as part of a LookML filter expression, place NULL in quotes, as shown on the filters documentation page)
-FOO 	is not equal to 'FOO' (is any value except 'FOO'), matches 'pizza', 'trash', 'fun' but not 'foo'
\-FOO, -BAR 	is not equal to either 'FOO' or 'BAR', matches any value except 'FOO' and 'BAR'
-%FOO% 	doesn't contain 'FOO', does not match 'buffoon' or 'fast food'
-FOO% 	doesn't start with 'FOO', does not match 'foolish' or 'food'
-%FOO 	doesn't end with 'FOO', does not match 'buffoo' or 'fast foo'
-EMPTY 	string is not empty (has at least one character)
-NULL 	value of column is not null (when it is used as part of a LookML filter expression, place -NULL in quotes, as shown on the filters documentation page)
FOO%, BAR 	starts with 'FOO' or is 'BAR' exactly, matches 'food' and matches 'bar' but not 'barfood'
FOO%, -FOOD 	starts with 'FOO' but is not 'FOOD'
_ UF 	has any single character followed by 'UF', matches 'buffoon'

Including Special Characters in String Filters

Note these rules for including special characters in string filters:

    To include ", or %, or _, prefix with the escape character, ^. For example: ^", or ^%, or ^_.
    To include a leading ^_, escape it as ^-. This is only necessary if the - character is the leading character; you do not need to escape a - character if it is inside the string.
    To include ^, escape it as ^^.
    To include a comma in a regular UI string filter, prefix the comma with a backslash character, \. For example: Santa Cruz\, CA
    To include a comma with the matches (advanced) option in a filter, prefix the comma with the escape character, ^. For example: Santa Cruz^, CA.


Date and Time

Looker date filtering allows for English phrases to be used instead of SQL date functions.

Basic structure of date and time filters

For the following examples:

    {n} is an integer.
    {interval} is a time increment such as hours, days, weeks, or months.

    The phrasing you use determines whether the {interval} will include partial time periods or only complete time periods. For example, the expression 3 days includes the current, partial day as well as the prior two days. The expression 3 days ago for 3 days includes the previous three complete days and excludes the current, partial day. See the Relative Dates section for more information.
    {time} can specify a time formatted as either YYYY-MM-DD HH:MM:SS or YYYY/MM/DD HH:MM:SS, or a date formatted as either YYYY-MM-DD or YYYY/MM/DD. When using the form YYYY-MM-DD, be sure to include both digits for the month and day, for example, 2016-01. Truncating a month or day to a single digit is interpreted as an offset, not a date. For example, 2016-1 is interpreted as 2016 minus one year, or 2015.

These are all the possible combinations of date filters:
Combination 	Example 	Notes
this {interval} 	this month 	You can use this week, this month, this quarter, this year, Note that "this day" is not supported. If you want to get data from the current day, you can use today.
{n} {interval} 	3 days 	
{n} {interval} ago 	3 days ago 	
{n} {interval} ago for {n} {interval} 	3 months ago for 2 days 	
before {n} {interval} ago 	before 3 days ago 	
before {time} 	before 2018-01-01 12:00:00 	before is not inclusive of the time you specify. The expression before 2018-01-01 will return data from all dates before 2018-01-01, but it will not return data from 2018-01-01.
after {time} 	after 2018-10-05 	after is inclusive of the time you specify. So, the expression after 2018-10-05 will return data from 2018-10-05 and all dates later than 2018-10-05.
{time} to {time} 	2018-05-18 12:00:00 to 2018-05-18 14:00:00 	The initial time value is inclusive. The latter time value is not. So the expression 2018-05-18 12:00:00 to 2018-05-18 14:00:00 will return data with the time "2018-05-18 12:00:00" through "2018-05-18 13:59:59".
this {interval} to {interval} 	this year to second 	The beginning of each interval is used. For example, the expression this year to second returns data from the beginning of the year the query is run through to the beginning of the second the query is run. this week to day returns data from the beginning of the week the query is run through to the beginning of the day the query is run.
today 	today 	
yesterday 	yesterday 	
tomorrow 	tomorrow 	
next {week, month, quarter, fiscal quarter, year, fiscal year} 	next week 	The next keyword is unique in that it requires one of the intervals listed above and will not work with other intervals.
{n} {interval} from now 	3 days from now 	
{n} {interval} from now for {n} {interval} 	3 days from now for 2 weeks 	

Date filters can also be combined together:

    To get OR logic: Type multiple conditions into the same filter, separated by commas. For example, today, 7 days ago means "today or 7 days ago".
    To get AND logic: Type your conditions, one by one, into multiple date or time filters. For example, you could put after 2014-01-01 into a Created Date filter, then put before 2 days ago into a Created Time filter. This would mean "January 1st, 2014 and after, and before 2 days ago".


Absolute dates

Absolute date filters use the specific date values to generate query results. These are useful when creating queries for specific date ranges.
Example 	Description
2018/05/29 	sometime on 2018/05/29
2018/05/10 for 3 days 	from 2018/05/10 00:00:00 through 2018/05/12 23:59:59
after 2018/05/10 	2018/05/10 00:00:00 and after
before 2018/05/10 	before 2018/05/10 00:00:00
2018/05 	within the entire month of 2018/05
2018/05 for 2 months 	within the entire months of 2018/05 and 2018/06
2018/05/10 05:00 for 5 hours 	from 2018/05/10 05:00:00 through 2018/05/10 09:59:59
2018/05/10 for 5 months 	from 2018/05/10 00:00:00 through 2018/10/09 23:59:59
2018 	entire year of 2018 (2018/01/01 00:00:00 through 2018/12/31 23:59:59)
FY2018 	entire fiscal year starting in 2018 (if your Looker developers have specified that your fiscal year starts in April then this is 2018/04/01 00:00 through 2019/03/31 23:59)
FY2018-Q1 	first quarter of the fiscal year starting in 2018 (if your Looker developers have specified that your fiscal year starts in April then this is 2018/04/01 00:00:00 through 2018/06/30 23:59:59)

Relative dates

Relative date filters allow you to create queries with rolling date values relative to the current date. These are useful when creating queries that update each time you run the query.

For all the examples below, assume today is Friday, 2018/05/18 18:30:02. Weeks start on Monday unless you change that setting with week_start_day.
Seconds
Example 	Description
1 second 	the current second (2018/05/18 18:30:02)
60 seconds 	60 seconds ago for 60 seconds (2018/05/18 18:29:02 through 2018/05/18 18:30:01)
60 seconds ago for 1 second 	60 seconds ago for 1 second (2018/05/18 18:29:02)
Minutes
Example 	Description
1 minute 	the current minute (2018/05/18 18:30:00 through 18:30:59)
60 minutes 	60 minutes ago for 60 minutes (2018/05/18 17:31:00 through 2018/05/18 18:30:59)
60 minutes ago for 1 minute 	60 minutes ago for 1 minute (2018/05/18 17:30:00 through 2018/05/18 17:30:59)
Hours
Example 	Description
1 hour 	the current hour (2018/05/18 18:00 through 2018/05/18 18:59)
24 hours 	the same hour of day that was 24 hours ago for 24 hours (2018/05/17 19:00 through 2018/05/18 18:59)
24 hours ago for 1 hour 	the same hour of day that was 24 hours ago for 1 hour (2018/05/17 18:00 until 2018/05/17 18:59)
Days
Example 	Description
today 	the current day (2018/05/18 00:00 through 2018/05/18 23:59)
2 days 	all of yesterday and today (2018/05/17 00:00 through 2018/05/18 23:59)
1 day ago 	just yesterday (2018/05/17 00:00 until 2018/05/17 23:59)
7 days ago for 7 days 	the last complete 7 days (2018/05/11 00:00 until 2018/05/17 23:59)
today for 7 days 	the current day, starting at midnight, for 7 days into the future (2018/05/18 00:00 until 2018/05/24 23:59)
last 3 days 	2 days ago through the end of the current day (2018/05/16 00:00 until 2018/05/18 23:59)
7 days from now 	7 days in the future (2018/05/25 00:00 until 2018/05/25 23:59)
Weeks
Example 	Description
1 week 	top of the current week going forward (2018/05/14 00:00 through 2018/05/20 23:59)
this week 	top of the current week going forward (2018/05/14 00:00 through 2018/05/20 23:59)
before this week 	anytime until the top of this week (before 2018/05/14 00:00)
after this week 	anytime after the top of this week (2018/05/14 00:00 and later)
next week 	the following Monday going forward 1 week (2018/05/21 00:00 through 2018/05/27 23:59)
2 weeks 	a week ago Monday going forward (2018/05/07 00:00 through 2018/05/20 23:59)
last week 	synonym for "1 week ago"
1 week ago 	a week ago Monday going forward 1 week (2018/05/07 00:00 through 2018/05/13 23:59)
Months
Example 	Description
1 month 	the current month (2018/05/01 00:00 through 2018/05/31 23:59)
this month 	synonym for "0 months ago" (2018/05/01 00:00 through 2018/05/31 23:59)
2 months 	the past two months (2018/04/01 00:00 through 2018/05/31 23:59)
last month 	all of 2018/04
2 months ago 	all of 2018/03
before 2 months ago 	all time before 2018/03/01
next month 	all of 2018/06
2 months from now 	all of 2018/07
6 months from now for 3 months 	2018/11 through 2019/01
Quarters
Example 	Description
1 month 	the current quarter (2018/04/01 00:00 through 2018/06/30 23:59)
this quarter 	synonym for "0 quarters ago" (2018/04/01 00:00 through 2018/06/30 23:59)
2 quarters 	the past two quarters (2018/01/01 00:00 through 2018/06/30 23:59)
last quarter 	all of Q1 (2018/01/01 00:00 through 2018/03/31 23:59)
2 quarters ago 	all of Q4 of last year (2017/010/01 00:00 through 2017/12/31 23:59)
before 2 quarters ago 	all time before Q4 of last year
next quarter 	all of the following quarter (2018/07/01 00:00 through 2018/09/30 23:59)
2018-07-01 for 1 quarter 	all of Q3 (2018/07/01 00:00 through 2018/09/30 23:59)
2018-Q4 	all of Q4 (2018/10/01 00:00 through 2018/12/31 23:59)
Years
Example 	Description
1 year 	all of the current year (2018/01/01 00:00 through 2018/12/31 23:59)
this year 	all of the current year (2018/01/01 00:00 through 2018/12/31 23:59)
next year 	all of the following year (2019/01/01 00:00 through 2019/12/31 23:59)
2 years 	the past two years (2017/01/01 00:00 through 2018/12/31 23:59)
last year 	all of 2017
2 years ago 	all of 2016

Boolean

Filtering on true or false type values in Looker requires you to know what type of true or false value you're interacting with.
Example 	Description
yes or Yes 	

field evaluates to true

for type: yesno dimensions use lowercase, for filters parameters (like those used in a measure or used in an always_filter ) use uppercase
no or No 	

field evaluates to false

for type: yesno dimensions use lowercase, for filters parameters (like those used in a measure or used in an always_filter ) use uppercase
TRUE 	field contains true (for fields that contain Boolean database values)
FALSE 	field contains false (for fields that contain Boolean database values)

Number

Filters on numbers support both natural language expressions (for example, 3 to 10) and relational operators (for example, >20). Looker supports the OR operator to express multiple filter ranges (for example, 3 to 10 OR 30 to 100). The AND operator can be used to express numeric ranges with relational operators (for example, >=3 AND <=10) to specify a range. Filters on numbers can also use algebraic interval notation to filter numeric fields.

The syntax for numeric filter expressions using NOT may not be intuitive. The examples below show how to use it.
Example 	Description
5 	is exactly 5
NOT 5
<>5
!=5 	is any value but exactly 5
1, 3, 5, 7 	is one of the values 1, 3, 5, or 7, exactly
NOT 66, 99, 4 	is not one of the values 66, 99, or 4, exactly
1, NOT 2 	is neither 1 nor 2
1, NOT 2, >100 	is neither 1, nor 2, nor greater than 100
5, NOT 6, NOT 7 	is 5, is not 6 or 7
5.5 to 10
>=5.5 AND <=10 	is 5.5 or greater but also 10 or less
NOT 3 to 80.44
<3 OR >80.44 	is less than 3 or greater than 80.44
1 to
>=1 	is 1 or greater
to 10
<=10 	is 10 or less
>10 AND <=20 OR 90 	is greater than 10 and less than or equal to 20, or is 90 exactly
>=50 AND <=100 OR >=500 AND <=1000 	is between 50 and 100, inclusive, or between 500 and 1000, inclusive
NULL 	has no data in it (when it is used as part of a LookML filter expression, place NULL in quotes)
NOT NULL 	has some data in it (when it is used as part of a LookML filter expression, place NOT NULL in quotes)
(1, 7) 	interpreted as 1 < x < 7 where the endpoints are not included. While this notation resembles an ordered pair, in this context it refers to the interval upon which you are working.
[5, 90] 	interpreted as 5 <= x <= 90 where the endpoints are included
(12, 20] 	interpreted as 12 < x <= 20 where 12 is not included, but 20 is included
[12, 20) 	interpreted as 12 <= x < 20 where 12 is included, but 20 is not included
(500, inf) 	interpreted as x > 500 where 500 is not included and infinity is always expressed as being "open" (not included). inf may be omitted and the example may be written as (500,)
(-inf, 10] 	interpreted as x <= 10 where 10 is included and infinity is always expressed as being "open" (not included). inf may be omitted and the example may be written as (,10]
[0,9],[20,29] 	the numbers between 0 and 9 inclusive or 20 to 29 inclusive
[0,10],20 	0 to 10 inclusive or 20
NOT (3,12) 	interpreted as x < 3 and x > 12
NOT 10,[1,5) 	all numbers except 10, and except 1 up to but not including 5

Location

Location filter expressions are based on latitude and longitude, but can accept some natural language to define boxes and circles within which to limit a search.
Example 	Description
36.97, -122.03 	location is exactly at latitude 36.97, longitude 122.03
40 miles from 36.97, -122.03 	location is within 40 miles of latitude 36.97, longitude -122.03
inside box from 72.33, -173.14 to 14.39, -61.70 	location is within a box whose northwest corner is at latitude 72.33, longitude -173.14, and whose southeast corner is at latitude 14.39, longitude -61.70
NOT NULL
-NULL 	location has both a non-null latitude and a non-null longitude (when it is used as part of a LookML filter expression, place NOT NULL or -NULL in quotes)
NULL 	location has a null latitude, or a null longitude, or both are null (when it is used as part of a LookML filter expression, place NULL in quotes)

Supported units of measurement

To filter in an area around a certain location, you can use these units:

    Meters
    Feet
    Kilometers
    Miles

Singular units of measurement are not supported. For example, filtering for a one-mile radius should be written within 1 miles of 36.97, -122.03
Report Center - Report Schedules

List all schedules for a report for the current organization.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/"

You may also set the query parameter children=true if you want to see all the schedules for a report.

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules?children=true"

Response

{
  "schedules": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/4555",
      "id": 4555,
      "enabled": true,
      "run_interval": "weekly",
      "on_day": 1,
      "destination_format": "json",
      "organization": "Leapfrog",
      "recipients": [
        "your_name@email.com"
      ],
      "webhook_urls": [
        "https://yourapp.com/endpoint"
      ],
      "actions": [
        {
          "disable": {
            "href": "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/4555/disable",
            "method": "GET"
          }
        }
      ]
    }
  ]
}

HTTP Methods Supported

    GET
    POST
    PUT
    DELETE

Show all the available scheduled report downloads

Show the details of a report schedule.

Scheduled reports are only available for 7 days.

If not downloaded,

    daily schedules will be disabled after 14 days
    weekly schedules will be disabled after 4 weeks
    monthly schedules will be disabled after 3 months

Schedules that have been disabled for more than 3 months will be automatically deleted.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/4555"

Response

{
  "schedules": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/4555",
      "id": 4555,
      "enabled": true,
      "run_interval": "weekly",
      "on_day": 1,
      "destination_format": "json",
      "organization": "Leapfrog",
      "recipients": [
        "your_name@email.com"
      ],
      "webhook_urls": [
        "https://yourapp.com/endpoint"
      ],
      "downloads": [
        {
          "date": "05/02/2017",
          "status": "success",
          "download_link": "https://app.simpli.fi/report_center/reports/36205/schedules/4555/download?code=1f7b4cac64b514ecb7424f74a307dbd8bdfb6b71"
        },
        {
          "date": "05/01/2017",
          "status": "success",
          "download_link": null
        }
      ],
      "actions": [
        {
          "disable": {
            "href": "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/4555/disable",
            "method": "GET"
          }
        }
      ]
    }
  ]
}

Creating a Report Schedule

The POST body should be formatted as JSON and use the following format.

Supported values for the run_interval attribute: daily, weekly or monthly.

When weekly, supported values for the optional on_day attribute: 0 - 6 (Sunday - Saturday). Default: 1.

When monthly, supported values for the optional on_day attribute: 1 - 31. Default: 1.

Supported values for the destination_format attribute: csv or json.

require_results is now always set to false, and no longer required in the parameters.

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
      	"scheduled_plan": {
          "enabled": true,
          "run_interval": "weekly",
          "on_day": 0
      	},
      	"destination_format": "json",
      	"recipients": [
          "your_name@email.com"
      	],
        "webhook_urls": [
          "https://yourapp.com/endpoint"
        ]
      }' \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/"

Updating a Report Schedule

The POST body should be formatted as JSON and use the following format.

Supported values for the run_interval attribute: daily, weekly or monthly.

When weekly, supported values for the optional on_day attribute: 0 - 6 (Sunday - Saturday). Default: 1.

When monthly, supported values for the optional on_day attribute: 1 - 31. Default: 1.

Supported values for the destination_format attribute: csv or json.

require_results is now always set to false, and no longer required in the parameters.

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
      	"scheduled_plan": {
          "enabled": true,
          "run_interval": "monthly",
          "on_day": 15
      	},
      	"destination_format": "json",
      	"recipients": [
          "your_name@email.com"
      	],
        "webhook_urls": [
          "https://yourapp.com/endpoint"
        ]
      }' \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/4555"

Deleting a Report Schedule

Example:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/4555"

Downloading a Scheduled Report

The code query parameter is required and specific to a downloadable report.

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/4555/download?code=1f7b4cac64b514ecb7424f74a307dbd8bdfb6b71"

Enable a Scheduled Report

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/4555/enable"

Disable a Scheduled Report

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/4555/disable"

Deprecated Report Center - Report Schedules

The Report Center - Report Schedules resource supports responding with all schedules through the use of -H "X-Api-Version: YYYY-MM-DD".

Example of receiving the deprecated schedules resource to receive all schedules for a report.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-Api-Version: 2021-04-15" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/"

Response

{
  "schedules": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/4555",
      "id": 4555,
      "enabled": true,
      "run_interval": "weekly",
      "on_day": 1,
      "destination_format": "json",
      "organization": "Leapfrog",
      "recipients": [
        "your_name@email.com"
      ],
      "webhook_urls": [
        "https://yourapp.com/endpoint"
      ],
      "actions": [
        {
          "disable": {
            "href": "https://app.simpli.fi/api/organizations/8/report_center/reports/36205/schedules/4555/disable",
            "method": "GET"
          }
        }
      ]
    },
    {
      "resource": "https://app.simpli.fi/api/organizations/16/report_center/reports/36205/schedules/6501",
      "id": 6501,
      "enabled": true,
      "run_interval": "weekly",
      "on_day": 1,
      "destination_format": "json",
      "organization": "Big Bear",
      "recipients": [
        "your_name@email.com"
      ],
      "webhook_urls": [
        "https://yourapp.com/endpoint"
      ],
      "actions": [
        {
          "disable": {
            "href": "https://app.simpli.fi/api/organizations/16/report_center/reports/36205/schedules/6501/disable",
            "method": "GET"
          }
        }
      ]
    }
  ]
}

Report Center - Report Snapshots
All Snapshots

Show the snapshots that have been created in the last 7 days.

Snapshots are only available for 7 days.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/27739/schedules/snapshots"

Response

{
  "snapshots": [
    {
      "id": 2,
      "date": "03/23/2017",
      "status": "success",
      "download_link": null
    },
    {
      "id": 1,
      "date": "05/08/2017",
      "status": "success",
      "download_link": "https://app.simpli.fi/api/organizations/8/report_center/reports/27739/schedules/download_snapshot?code=6ab7f11cc268c462373ea61e4f64f7e51541af17"
    }
  ]
}

Creating a Report Snapshot

This is an asynchronous action that is used to run the report based on the report template.

The POST body should be formatted as JSON and use the following format.

Supported values for the destination_format attribute: csv or json.

The filters attribute will apply the filters on the report model snapshot. Please refer to the current/available fields on the report model, using the name attribute for the filter key. Refer to Filter Expressions.

require_results is now always set to false, and no longer required in the parameters.
Request

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
      	"scheduled_plan": {
      	},
      	"destination_format": "json",
      	"recipients": [
          "your_name@email.com"
      	],
        "webhook_urls": [
          "https://yourapp.com/endpoint"
        ],
        "filters": {
          "summary_delivery_events.event_date": "7 days ago for 7 days"
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/27739/schedules/create_snapshot"

Response

{
  "snapshots": [
    {
      "id": 3,
      "date": "09/01/2017",
      "status": "in_progress",
      "download_link": null
    }
  ]
}

Show Snapshot

Show the snapshot based on the id.

Snapshots are only available for 7 days.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/27739/schedules/snapshots/1"

Response

{
  "snapshots": [
    {
      "id": 1,
      "date": "05/08/2017",
      "status": "success",
      "download_link": "https://app.simpli.fi/report_center/reports/27739/schedules/download_snapshot?code=6ab7f11cc268c462373ea61e4f64f7e51541af17"
    }
  ]
}

Downloading a Snapshot

The code query parameter is required and specific to a report snapshot.

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/report_center/reports/27739/schedules/download_snapshot?code=6ab7f11cc268c462373ea61e4f64f7e51541af17"

Report Center - Reports

Get a list of your public and private reports.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports?page=2&size=20"

Response

{
  "reports": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/report_center/reports/35265",
      "id": 35053,
      "title": "Account Conversion by Campaign",
      "private": true,
      "owner": "Your Name",
      "organization_name": null,
      "actions": [
        {
          "duplicate_report": {
            "href": "https://app.simpli.fi/api/organizations/8/report_center/reports/35265/duplicate_report",
            "method": "POST"
          }
        },
        {
          "move_to_public": {
            "href": "https://app.simpli.fi/api/organizations/8/report_center/reports/35265/move_to_public",
            "method": "POST"
          }
        },
        {
          "move_to_private": {
            "href": "https://app.simpli.fi/api/organizations/8/report_center/reports/35265/move_to_private",
            "method": "POST"
          }
        }
      ]
    }
  ],
  "paging": {
    "page": 2,
    "size": 20,
    "total": 160,
    "next": "https://app.simpli.fi/api/organizations/8/report_center/reports?page=3&size=20",
    "previous": "https://app.simpli.fi/api/organizations/8/report_center/reports?page=1&size=20"
  }
}

HTTP Methods Supported

    GET
    POST
    PUT
    DELETE

Query String Params
Access

You can limit the reports returned by Report Access status:

    all
    public
    private

Example:
?access=private
Pagination

You can limit the reports returned by page. The parameters are optional. Without them, the system will attempt to fetch all reports and may time out. Consider always using them if you are fetching more than 50 items.

The page parameter is the page you are requesting. The size sets the items per page. For example, if there are 102 reports and size is set to 50, then there are 3 pages that can be fetched. Page 1 will contain the first 50 results, page 2 the next 50 and page 3 will contain the last 2.

The max size is 50.

    page
    size

Example:
?page=2&size=20
Report Model Templates

These are the Report Model Templates used for Report Model creation.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/templates"

Response

{
  "templates": [
    {
      "template_id": 11621,
      "category": "Ad/Campaign Reporting",
      "title": "Account Conversion by Campaign",
      "description": null
    },
    {
      "template_id": 11890,
      "category": "Ad/Campaign Reporting",
      "title": "Account Conversion by Campaign by Day",
      "description": null
    },
    ... Not showing all templates in the output ...
  ]
}

Creating a Report Model

The POST body should be formatted as JSON and use the following format.

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "template_id": 11621
      }' \
  "https://app.simpli.fi/api/organizations/8/report_center/reports"

Showing a Report Model

Retrieves the details of a report model.

The filters attribute shows all the current filters on the report template. Refer to Filter Expressions.

The current_fields attribute shows all the current fields that will be shown on the report.

The available_fields attribute shows all the available fields that can be added to the report.

The show_totals attribute indicates whether there is a totals row at the end of the report.

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/35265"

Response

{
  "reports": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/report_center/reports/35265",
      "id": 35265,
      "title": "Account Conversion by Campaign",
      "private": true,
      "owner": "Your Name",
      "organization_name": null,
      "locked": false,
      "filters": {
        "cost_events.event_date": "1 days ago for 1 days"
      },
      "current_fields": [
        {
          "category": "dimension",
          "label": "Campaign Campaign Name",
          "label_short": "Campaign Name",
          "name": "dim_campaign.campaign_name",
          "type": "string"
        },
        ... Not showing all current fields ...
      ],
      "available_fields": [
        {
          "category": "dimension",
          "label": "Ad Ad File Type",
          "label_short": "Ad File Type",
          "name": "dim_ad.ad_file_reporting_type",
          "type": "string"
        },
        ... Not showing all available fields ...
      ],
      "show_totals": false,
      "actions": [
        {
          "duplicate_report": {
            "href": "https://app.simpli.fi/api/organizations/8/report_center/reports/35265/duplicate_report",
            "method": "POST"
          }
        },
        {
          "move_to_public": {
            "href": "https://app.simpli.fi/api/organizations/8/report_center/reports/35265/move_to_public",
            "method": "POST"
          }
        },
        {
          "move_to_private": {
            "href": "https://app.simpli.fi/api/organizations/8/report_center/reports/35265/move_to_private",
            "method": "POST"
          }
        }
      ]
    }
  ]
}

Updating a Report Model

The PUT body should be formatted as JSON and use the following format.

The fields attribute will update the fields on the report model. Please refer to the current/available fields on the report model, using the name attribute to construct the array. The system will automatically group dimensions and measures together so please keep this in mind when ordering the array.

The filters attribute will update the filters on the report model. Please refer to the current/available fields on the report model, using the name attribute for the filter key. Refer to Filter Expressions.

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "title": "Account Conversion by Campaign - Updated",
        "fields": [
          "summary_delivery_events.campaign_id",
          "dim_campaign.campaign_name"
        ],
        "filters": {
          "summary_delivery_events.event_date": "7 days ago for 7 days"
        }
      }' \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/35265"

Deleting a Report Model

Example:

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/35265"

Duplicating a Report Model

The POST body should be formatted as JSON and use the following format.

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "title": "Account Conversion by Campaign - Duplicate"
      }' \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/35265/duplicate_report"

Moving a Report Model to Public

The POST body should be formatted as JSON and use the following format.

The with_desc attribute controls whether you would like the report to be visible to the descendants of the organization. It accepts a boolean true or false.

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "org_id": 8,
        "with_desc": false
      }' \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/35265/move_to_public"

Moving a Report Model to Private

The POST body should be formatted as JSON and use the following format.

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{}' \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/35265/move_to_private"

Locking a Report

Locking a report prevents any changes to the report attributes.

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/35265/lock_report"

Unlocking a Report

Unlocking a report allows changes to the report attributes.

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/reports/35265/unlock_report"

Report Center - Templates

Get a list of the Report Model Templates used for Report Model creation.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/templates"

Response

{
  "templates": [
    {
      "template_id": 11621,
      "category": "Ad/Campaign Reporting",
      "title": "Account Conversion by Campaign",
      "description": null
    },
    {
      "template_id": 11890,
      "category": "Ad/Campaign Reporting",
      "title": "Account Conversion by Campaign by Day",
      "description": null
    },
    ... Not showing all templates in the output ...
  ]
}

Showing a Template

Retrieve the details of a report template.

The current_fields attribute shows all the current fields that will be shown on the report.

The available_fields attribute shows all the available fields that can be added to the report.

The show_totals attribute indicates whether there is a totals row at the end of the report.

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/report_center/templates/11621"

Response

{
  "templates": [
    {
      "template_id": 11621,
      "category": "Ad/Campaign Reporting",
      "title": "Account Conversion by Campaign",
      "description": null,
      "current_fields": [
        {
          "category": "dimension",
          "label": "Campaign Campaign Name",
          "label_short": "Campaign Name",
          "name": "dim_campaign.campaign_name",
          "type": "string"
        },
        ... Not showing all current fields ...
      ],
      "available_fields": [
        {
          "category": "dimension",
          "label": "Ad Ad File Type",
          "label_short": "Ad File Type",
          "name": "dim_ad.ad_file_reporting_type",
          "type": "string"
        },
        ... Not showing all available fields ...
      ],
      "show_totals": false,
    }
  ]
}

Report Center - Webhook Notifications

Receive notifications at a webhook url when reports have been generated. When a report is available for download, a POST request will be sent to the webhook url(s) defined on the Report Center Schedule. The request to the defined endpoint will be formatted as JSON. The format depends on whether the report is a scheduled report or a snapshot.

Scheduled reports will send webhook notifications in the following format:

{
  "report_id": 1234,
  "schedule_id": 4567,
  "download_link": "https://app.simpli.fi/report_center/reports/1234/schedules/4567/download?code=6a5e838b3cb1373b7dc5a89f667bb4bcf56ad320",
  "report_filename": "Ad_Position_Performance_By_Ad_2017-01-01T0000.csv"
}

Snapshots will send webhook notifications in the following format:

{
  "report_id": 1234,
  "snapshot_id": 6789,
  "download_link": "https://app.simpli.fi/report_center/reports/1234/schedules/download_snapshot?code=6a5e838b3cb1373b7dc5a89f667bb4bcf56da253",
  "report_filename": "Ad_Position_Performance_By_Ad_2017-01-01T0000.csv"
}

Retail Markups

NOTE: The Retail Markups endpoint can only edit, create, and delete campaign retail markups at this time. You can list, show, and toggle both campaign and organization markups.

Listing retail_markups that belong to a campaign. This includes organization and campaign retail markups.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/25742/retail_markups"

Response

{
  "retail_markups": [{
    "id": 135,
    "effective_date": "2019-11-07",
    "markup": 1.0,
    "name": "My New Name",
    "third_party_markup": false,
    "markup_rate_type_id": 1,
    "expire_date": null,
    "enabled": true,
    "expired": false,
    "campaign_id": 25742,
    "resource": "https://app.simpli.fi/api/campaigns/25742/retail_markups/135",
    "actions": {
      "disable": {
        "href": "https://app.simpli.fi/api/campaigns/25742/retail_markups/135/disable",
        "method": "POST"
      },
      "delete": {
        "href": "https://app.simpli.fi/api/campaigns/25742/retail_markups/135",
        "method": "DELETE"
      }
    }
  }, {
    "id": 131,
    "effective_date": "2019-09-26",
    "markup": 1.0,
    "name": "markup name",
    "third_party_markup": false,
    "markup_rate_type_id": 1,
    "expire_date": "2020-09-30",
    "enabled": true,
    "expired": false,
    "organization_id": 3155,
    "resource": "https://app.simpli.fi/api/campaigns/25742/retail_markups/131",
    "actions": {
      "disable": {
        "href": "https://app.simpli.fi/api/campaigns/25742/retail_markups/131/disable",
        "method": "POST"
      }
    }
  }]
}

HTTP Methods Supported

    GET
    POST
    PUT
    DELETE

Creating a Campaign Retail Markup
Request

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "retail_markup": {
          "name": "My New Name create",
          "markup": 1.0,
          "markup_rate_type_id": 1,
          "effective_date": "2019-11-07"
        }
      }' \
  "https://app.simpli.fi/api/campaigns/25742/retail_markups"

Getting a Specific Retail Markup

Example - get retail markup 135:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/25742/retail_markups/135"

Response

{
  "retail_markups": [{
    "id": 135,
    "effective_date": "2019-11-07",
    "markup": 1.0,
    "name": "My New Name again2",
    "third_party_markup": false,
    "markup_rate_type_id": 1,
    "expire_date": null,
    "enabled": true,
    "expired": false,
    "campaign_id": 25742,
    "resource": "https://app.simpli.fi/api/campaigns/25742/retail_markups/135",
    "actions": {
      "disable": {
        "href": "https://app.simpli.fi/api/campaigns/25742/retail_markups/135/disable",
        "method": "POST"
      },
      "delete": {
        "href": "https://app.simpli.fi/api/campaigns/25742/retail_markups/135",
        "method": "DELETE"
      }
    }
  }]
}

Updating a Campaign Retail Markup

Only campaign retail markups can be updated with the API at this time.

Example - update the name of the retail markup with id 135:
Request

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "retail_markup": {
          "name": "My New Name"
        }
      }'
  "https://app.simpli.fi/api/campaigns/467907/retail_markups/135"

Toggling a Retail Markup on a Campaign

Both organization and campaign markups can be toggled on or off. This can be done with one of the following: enable or disable.

Example - toggle on the retail markup with id 135:
Request

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/467907/retail_markups/135/enable"

Example - toggle off the retail markup with id 135:
Request

curl -i -X POST -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/467907/retail_markups/135/disable"

Deleting a Campaign Retail Markup

Only campaign retail markups can be deleted with the API at this time.

Example - delete the retail markup with id 135:
Request

curl -i -X DELETE -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/campaigns/467907/retail_markups/135"

Response

The response will have status 204 upon successful delete.
Segment Custom Value Types

Curl example to get all segment custom value types:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/segment_custom_value_types"

Response

{
  "segment_custom_value_types": [
    {
      "resource": "https://app.simpli.fi/api/segment_custom_value_types/1",
      "id": 1,
      "name": "Purchase/Sale"
    }
  ]
}

Segment Target Types

Curl example to get all segment target types:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/segment_target_types"

Response

{
  "segment_target_types": [
    {
      "resource": "https://app.simpli.fi/api/segment_target_types/1",
      "id": 1,
      "name": "Exclude"
    }
  ]
}

Segment Types

Curl example to get all segment types:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/segment_types"

Response

{
  "segment_types": [
    {
      "resource": "https://app.simpli.fi/api/segment_types/1",
      "id": 1,
      "name": "Retargeting"
    }
  ]
}

Segment Url Match Types

Curl example to get all segment url match types:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/segment_url_match_types"

Response

{
  "segment_url_match_types": [
    {
      "resource": "https://app.simpli.fi/api/segment_url_match_types/1",
      "id": 1,
      "name": "contains"
    }
  ]
}

Simplifi Managed Deals

Managed Deals represent an entity that relates to Deals via the identifier value. They are managed by Simplifi internally and can be added to campaigns via the Campaign Deals API reference.

All Managed Deals to which a user has access are returned in pages of 10,000 by default. To filter results, pass any combination of the below query string parameters to the filters parameter.

The returned results will match all given query strings. For parameters that accept string values, those strings are case-sensitive. Array-based filters are inclusive with no weighting.
Query String Parameter 	Description 	Example
name 	Returns all managed deals containing the passed name string exactly 	?filters%5Bname%5D=GreatDeal
identifier 	Returns all managed deals containing the passed identifier string exactly 	?filters%5Bidentifier%5D=SCR-PMP-00094
sensitive 	Returns only sensitive managed deals 	?filters%5Bnot_sensitive%5D=false
not_sensitive 	Returns only not-sensitive managed deals 	?filters%5Bnot_sensitive%5D=true
statuses 	Accepts one or both of the following values: ["Active", "Inactive"] 	?filters%5Bstatuses%5D%5B%5D=Active
floor_price 	The floor_price query string requires an object like so: { "operator": 0, "base_value": 0.5 } to perform a search for managed deals that have a floor price equal to $0.5. In order to run a "between" query you will need to pass a comp_value key: { "operator": 4, "base_value": 0.5, "comp_value": 1.5 }

Valid values for the operator key are as follows:

    0 corresponds to equal to
    2 corresponds to less than
    3 corresponds to greater than
    4 corresponds to between

	?filters%5Bfloor_price%5D%5Bbase_value%5D=0.1&filters%5Bfloor_price%5D%5Bcomp_value%5D=0.9&filters%5Bfloor_price%5D%5Boperator%5D=4
ad_sizes 	The ad_sizes query string should be an array of objects with one or more valid ad size id values. [{ "id": 1 },{ "id": 2 }] Returns managed deals that specify an ad size of "250x300" and "90x728" 	?filters%5Bad_sizes%5D%5B%5D%5Bid%5D=1&filters%5Bad_sizes%5D%5B%5D%5Bid%5D=2
categories 	Returns all managed deals with categories containing one or more of the passed string(s): ["Business", "Financial"] 	?filters%5Bcategories%5D%5B%5D=Business&filters%5Bcategories%5D%5B%5D=Financial
ott_inventory_types 	Returns all managed deals with OTV/CTV content of the duration type(s) specified by the passed string(s) ["FEP", "Long Form"]

Valid values for ott_inventory_types key are:

    FEP
    Long Form
    Short Form

	?filters%5Bott_inventory_types%5D%5B%5D=FEP&filters%5Bott_inventory_types%5D%5B%5D=Long%20Form
publishers 	Returns all managed deals with publishers containing one or more of the passed string(s): ["Genericon", "DIRECTV stream"] 	?filters%5Bpublishers%5D%5B%5D=Genericon&filters%5Bpublishers%5D%5B%5D=DIRECTV%20stream
media_types 	Returns all managed deals with media_types containing one or more of the passed string(s): ["Audio", "Video"] 	?filters%5Bmedia_types%5D%5B%5D=Audio&filters%5Bmedia_types%5D%5B%5D=Video
device_types 	Returns all managed deals with device_types containing one or more of the passed string(s): ["Mobile", "Tablets"] 	?filters%5Bdevice_types%5D%5B%5D=Mobile&filters%5Bdevice_types%5D%5B%5D=Tablets
Sorting

Sort results by specifying the sort_column and sort_dir (direction). Direction values are asc (ascending), or desc (descending).

?sort_col=name&sort_dir=desc&filters%5Bstatuses%5D%5B%5D=Active

Size

Specify the number of results to return per page (default is 10,000) with the size parameter.

?size=100&filters%5Bcategories%5D%5B%5D=Business

Paging

Return a specific page of results with the page parameter, which accepts an integer.

?size=100&page=2&filters%5Bcategories%5D%5B%5D=Business

Complex Example

Search by media type of "Display" with categories "Business" and "Financial", with the publisher "Genericon", and sorted by name descending.

?sort_col=name&sort_dir=desc&filters%5Bcategories%5D%5B%5D=Business&filters%5Bcategories%5D%5B%5D=Financial&filters%5Bmedia_types%5D%5B%5D%5Bname%5D=Display&filters%5Bpublishers%5D%5B%5D=Genericon

Attributes Only

If attributes_only is set to true, then only the attributes of one or more managed deals will returned. The lists of resources will be omitted from the response, reducing the response size.

?attributes_only=true&filters%5Bname%5D=GreatDeal

HTTP Methods Supported

    GET

Getting all managed deals to which a user has access:
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/deals"

Response

{
  "deals": [
    {
      "id": 2185,
      "name": "Discovery+ - OTT / CTV",
      "status": "Active",
      "publishers": ["Discovery+"],
      "categories": ["DIY", "Entertainment", "Food", "History", "Lifestyle", "Science", "Spanish", "Travel"],
      "ott_inventory_types": ["FEP"],
      "floor_min": 32.0,
      "floor_max": 32.0,
      "platform_wide": true,
      "supply_plan_url": null,
      "sensitive": false,
      "ad_sizes": []
      "device_types": [
        {
          "device_type": {
            "id": 1,
            "name": "Connected TV",
            "created_at": "2018-09-27 12:31:25.178206000 -0500",
            "updated_at": "2018-11-07 08:36:40.934729000 -0600"
          }
        },
        {
          "device_type": {
            "id": 2,
            "name": "Mobile",
            "created_at": "2019-04-02 13:56:03.483360000 -0500",
            "updated_at": "2019-04-02 13:56:03.483360000 -0500"
          }
        },
        {
          "device_type": {
            "id": 3,
            "name": "Desktops and Laptops",
            "created_at": "2019-04-02 13:56:03.487240000 -0500",
            "updated_at": "2019-04-02 13:56:03.487240000 -0500
          }
        },
        {
          "device_type": {
            "id": 4,
            "name": "Tablets",
            "created_at": "2019-04-02 13:56:03.490418000 -0500",
            "updated_at": "2019-04-02 13:56:03.490418000 -0500"
          }
        }
      ]
      "media_types": [
        {
          "media_type": {
            "id": 2,
            "name": "Video",
            "created_at": "2015-06-08 15:01:28.592184000 -0500",
            "updated_at": "2015-06-08 15:01:28.592184000 -0500"
          }
        }
      ]
      "organization_id": 0
      "created_at": "2022-08-25T16:18:44.463871000-0500",
      "updated_at": "2022-08-25T16:18:44.463871000-0500",
      "resource": "https://app.simpli.fi/api/deals/2185",
      "identifier": "SCR-PMP-00094",
      "retail_cost": "N/A"
      "resources": [
        {
          "ad_sizes": "https://app.simpli.fi/api/ad_sizes"
        },
        {
          "device_types": "https://app.simpli.fi/api/device_types"
        },
        {
          "media_types": "https://app.simpli.fi/api/media_types"
        }
      ]
    },
    {
      "id": 2184,
      "name": "DIRECTV stream - OTT / CTV - NFL",
      "status": "Active",
      "publishers": ["DIRECTV stream"],
      "categories": ["Live Sports"],
      "ott_inventory_types": ["FEP"],
      "floor_min": 40.0,
      "floor_max": 40.0,
      "platform_wide": true,
      "supply_plan_url": null,
      "sensitive": false,
      "ad_sizes": []
      "device_types": [
        {
          "device_type": {
            "id": 1,
            "name": "Connected TV",
            "created_at": "2018-09-27 12:31:25.178206000 -0500",
            "updated_at": "2018-11-07 08:36:40.934729000 -0600"
          }
        },
        {
          "device_type": {
            "id": 2,
            "name": "Mobile",
            "created_at": "2019-04-02 13:56:03.483360000 -0500",
            "updated_at": "2019-04-02 13:56:03.483360000 -0500"
          }
        },
        {
          "device_type": {
            "id": 3,
            "name": "Desktops and Laptops",
            "created_at": "2019-04-02 13:56:03.487240000 -0500",
            "updated_at": "2019-04-02 13:56:03.487240000 -0500
          }
        },
        {
          "device_type": {
            "id": 4,
            "name": "Tablets",
            "created_at": "2019-04-02 13:56:03.490418000 -0500",
            "updated_at": "2019-04-02 13:56:03.490418000 -0500"
          }
        }
      ]
      "media_types": [
        {
          "media_type": {
            "id": 2,
            "name": "Video",
            "created_at": "2015-06-08 15:01:28.592184000 -0500",
            "updated_at": "2015-06-08 15:01:28.592184000 -0500"
          }
        }
      ]
      "organization_id": 0
      "created_at": "2022-08-25T16:18:18.760216000-0500",
      "updated_at": "2022-08-25T16:18:44.463871000-0500",
      "resource": "https://app.simpli.fi/api/deals/2184",
      "identifier": "DIR-SIM-00007",
      "retail_cost": 32.06493575536007
      "resources": [
        {
          "ad_sizes": "https://app.simpli.fi/api/ad_sizes"
        },
        {
          "device_types": "https://app.simpli.fi/api/device_types"
        },
        {
          "media_types": "https://app.simpli.fi/api/media_types"
        }
      ]
    },
    ...
  ],
  "paging": {
    "page": 1,
    "size": 100,
    "total": 2185
  }
}

Downloading Simplifi Managed Deals

Downloading a CSV of managed deals can use the same filters, page size and sort options as the index method to return managed deals specific to your parameters.

Below is an example request to download a .csv of the second page of the results (results 101-200), sorted by name descending, with the category of "Business"
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/deals/download?page=2&size=100&sort_col=name&sort_dir=desc&filters%5Bcategories%5D%5B%5D=Business"

Get single Simplifi Managed Deal by id

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/deals/2184

Response

{
  "id": 2184,
  "name": "DIRECTV stream - OTT / CTV - NFL",
  "status": "Active",
  "publishers": ["DIRECTV stream"],
  "categories": ["Live Sports"],
  "ott_inventory_types": ["FEP"],
  "floor_min": 40.0,
  "floor_max": 40.0,
  "platform_wide": true,
  "supply_plan_url": null,
  "sensitive": false,
  "ad_sizes": []
  "device_types": [
    {
      "device_type": {
        "id": 1,
        "name": "Connected TV",
        "created_at": "2018-09-27 12:31:25.178206000 -0500",
        "updated_at": "2018-11-07 08:36:40.934729000 -0600"
      }
    },
    {
      "device_type": {
        "id": 2,
        "name": "Mobile",
        "created_at": "2019-04-02 13:56:03.483360000 -0500",
        "updated_at": "2019-04-02 13:56:03.483360000 -0500"
      }
    },
    {
      "device_type": {
        "id": 3,
        "name": "Desktops and Laptops",
        "created_at": "2019-04-02 13:56:03.487240000 -0500",
        "updated_at": "2019-04-02 13:56:03.487240000 -0500
      }
    },
    {
      "device_type": {
        "id": 4,
        "name": "Tablets",
        "created_at": "2019-04-02 13:56:03.490418000 -0500",
        "updated_at": "2019-04-02 13:56:03.490418000 -0500"
      }
    }
  ]
  "media_types": [
    {
      "media_type": {
        "id": 2,
        "name": "Video",
        "created_at": "2015-06-08 15:01:28.592184000 -0500",
        "updated_at": "2015-06-08 15:01:28.592184000 -0500"
      }
    }
  ]
  "organization_id": 0
  "created_at": "2022-08-25T16:18:18.760216000-0500",
  "updated_at": "2022-08-25T16:18:44.463871000-0500",
  "resource": "https://app.simpli.fi/api/deals/2184",
  "identifier": "DIR-SIM-00007",
  "retail_cost": 32.06493575536007
  "resources": [
    {
      "ad_sizes": "https://app.simpli.fi/api/ad_sizes"
    },
    {
      "device_types": "https://app.simpli.fi/api/device_types"
    },
    {
      "media_types": "https://app.simpli.fi/api/media_types"
    }
  ]
}

Third Party Segments Providers

The third party segment providers endpoint provides a way of listing names of organizations that have third party segments available in the Simpli.fi UI. These third party segments can be added to campaigns.

The URL for the request must include an organization. These must match the organization of the campaign that will be assigned the third party segments.
Listing Third Party Segment Providers
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/third_party_segment_providers"

Response

{
  "third_party_segment_providers": [
    ... Not showing all segment providers in the output ...
    {
      "resource": "https://app.simpli.fi/api/organizations/5787/third_party_segment_providers/5789",
      "id": 5789,
      "name": "An organization"
    },
    {
      "resource": "https://app.simpli.fi/api/organizations/5787/third_party_segment_providers/7",
      "id": 7,
      "name": "Also an organization"
    }
  ]
}

Third Party Segments
Searching for Third Party Segments

Third party segments are pre-defined in the Simpli.fi UI. A search option allows searching the available third party segments for a specific phrase. An index option is not provided for all available third party segments. The search interface is the only way to query for third party segments.

The results returned by the search are limited to 25 results per page. Only one page of results can be queried at a time. The page parameter is used to request a page other than page 1.

The search_term parameter must contain the phrase to match against. The phrase is searched against the third party segment names and description. The matches do not need to be exact. A search for "eat food" will match a description with "eat good food" and return that third party segment in the results.

A search may be limited to the segments of one third party segment provider by passing the provider_id parameter with the id of the third party segment provider. Use the third_party_segment_providers to get a list of all available providers.

The URL for the request must include an organization. This must match the organization of the campaign that will be assigned the third party segments.
Request

The example below searches for the phrase "dog training":

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/third_party_segments/search?search_term=dogs+training"

Response

{
  "third_party_segments": [
    {
      "id": 97,
      "name": "Dogs Shoppers 91",
      "description": "Some dogs need training",
      "deleted_at": null,
      "flat_cost": 0.15,
      "margin_cost": 0,
      "resource": "https://app.simpli.fi/api/organizations/5787/third_party_segments/97",
      "resources": [
        {
          "third_party_segment_providers": "https://app.simpli.fi/api/organizations/5787/third_party_segment_providers/5796"
        }
      ]
    }
  ],
  "paging": {
    "page": 1,
    "size": 25,
    "total": 1
  }
}

The third_party_segment_provider resource identifies the source organization of the third party segment.

The deleted_at attribute is set to a non-null date with the format 'yyyy-mm-dd' when the third party segment is marked as deleted. Search results do not return deleted segments. A third party segment that is added to a campaign and then deleted will still be returned in the details of the campaign. It will have a non-null deleted_at date.

The flat_cost attribute is the dollar amount in CPM terms for the use of the third party segment.

The margin_cost attribute is the percentage amount in CPM terms for the use of the third party segment.

The flat_cost and margin_cost attributes are mutually exclusive. A third party segment will not include both a flat_cost and margin_cost at the same time.
Request

The example below searches for the phrase "shop" and limits it to the provider_id 5796:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/5787/third_party_segments/search?search_term=shop&provider_id=5796"

Response

{
  "third_party_segments": [
    {
      "id": 17,
      "name": "Dogs Shoppers 11",
      "description": "People shopping for Dogs in next 11 days",
      "deleted_at": null,
      "flat_cost": 0,
      "margin_cost": 0.2,
      "resource": "https://app.simpli.fi/api/organizations/5787/third_party_segments/17",
      "resources": [
        {
          "third_party_segment_providers": "https://app.simpli.fi/api/organizations/5787/third_party_segment_providers/5796"
        }
      ]
    },
    ... Not showing all results ...

Listing Third Party Segments on a Campaign

The third party segments on a campaign can be retrieved using the third_party_segments endpoint along with the organization and its campaign. The request format is similar to other API requests.
Request

Example request querying all third party segments on a campaign:

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/third_party_segments"

Response

{
  "third_party_segments": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/third_party_segments/91",
      "id": 91,
      "name": "Football Shoppers 85",
      "description": "People shopping for Football in next 85 days",
      "deleted_at": null,
      "flat_cost": 1.25,
      "margin_cost": 0,
      "resources": [
        {
          "third_party_segment_providers": "https://app.simpli.fi/api/organizations/8/third_party_segment_providers/13"
        }
      ]
    },
    {
      "resource": "https://app.simpli.fi/api/organizations/8/third_party_segments/92",
      "id": 92,
      "name": "Cars Shoppers 86",
      "description": "People shopping for Cars in next 86 days",
      "deleted_at": null,
      "flat_cost": 0,
      "margin_cost": 0.2,
      "resources": [
        {
          "third_party_segment_providers": "https://app.simpli.fi/api/organizations/8/third_party_segment_providers/10"
        }
      ]
    }
  ],
  "segment_match_type": "any"
}

Updating Third Party Segments on a Campaign

The third party segments can be added, removed, opted in and opted out from a campaign. No part of a third party segment can be altered through the API. The third_party_segments API endpoint is used to update the campaign.

The changes endpoint accepts one parameter third_party_segments which is an object with four fields: delete,add,opt_in and opt_out. Each of these attributes accepts an array of third_party_segment ids. The delete array specifies the third_party_segments to be removed from the campaign and the add array has the third_party_segments to be added to the campaign. The opt_in array targets third_party_segments to be opted into a campaign while the opt_out array is for the third_party_segments to be opted out of a campaign.

Matching the third party segments on a campaign to a user can be done in one of two ways. Either any of the third party segments in the campaign can match the user or all the third party segments in the campaign must match the user. The segment_match_type attribute is used to specify the match type. It is an optional parameter in the change request. The setting is not changed if the parameter is not included. The default value for matching third party segments on a campaign is all for campaigns created after January 2020 and any for campaigns created before that time. The third_party_segments_match_type parameter accepts the same values but its use is deprecated in favor of segment_match_type.
Request

Example where two third_party_segments (122, 127) are added to the campaign, one is removed (91), one is opted in (88) and one is opted out (12):

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "third_party_segments": {
          "add": [122, 127],
          "delete": [91],
          "opt_in": [88],
          "opt_out": [12]
        },
        "segment_match_type": "any"
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/third_party_segments/change"

Response

The response contains a summary of the total number of third party segments on the campaign and an array with the ids of each third party segment on the campaign.

{
  "summary": "6 Third Party Segments",
  "segment_taxonomy_ids": [
    92,
    114,
    122,
    127,
    88,
    12
  ],
  "segment_match_type": "any"
}

Request

Example where two third_party_segments (122, 127) are added to the campaign, one is removed (91), and the segment_match_type is set to all:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "third_party_segments": {
          "add": [122, 127],
          "delete": [91]
        },
        "segment_match_type": "all"
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/third_party_segments/change"

Response

The response contains a summary of the total number of third party segments on the campaign and an array with the ids of each third party segment on the campaign.

{
  "summary": "4 Third Party Segments",
  "segment_taxonomy_ids": [
    92,
    114,
    122,
    127
  ],
  "segment_match_type": "all"
}

Request

Example where two third_party_segments (122, 127) are added to the campaign, one is removed (91), and the deprecated third_party_segments_match_type parameter is passed with the value of any:

curl -i -X PUT -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
        "third_party_segments": {
          "add": [122, 127],
          "delete": [91]
        },
        "third_party_segments_match_type": "any"
      }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/third_party_segments/change"

Response

The response contains a summary of the total number of third party segments on the campaign and an array with the ids of each third party segment on the campaign.

{
  "summary": "4 Third Party Segments",
  "segment_taxonomy_ids": [
    92,
    114,
    122,
    127
  ],
  "segment_match_type": "any"
}

Users

A summary of the resources that can be accessed is returned by an empty request to the API.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api"

Response

{
  "users": [
    {
      "id": 7,
      "name": "Brandon Aaron",
      "resources": [
        {
          "organizations": "https://app.simpli.fi/api/organizations"
        },
        {
          "campaigns": "https://app.simpli.fi/api/campaigns"
        },
        {
          "reports": "https://app.simpli.fi/api/reports"
        },
        {
          "recurring_reports": "https://app.simpli.fi/api/recurring_reports"
        },
        {
          "ad_sizes": "https://app.simpli.fi/api/ad_sizes"
        },
        {
          "ad_file_types": "https://app.simpli.fi/api/ad_file_types"
        },
        {
          "report_types": "https://app.simpli.fi/api/report_types"
        },
        {
          "browsers": "https://app.simpli.fi/api/browsers"
        },
        {
          "device_types": "https://app.simpli.fi/api/device_types"
        },
        {
          "contexts": "https://app.simpli.fi/api/contexts"
        },
        {
          "geo_targets": "https://app.simpli.fi/api/geo_targets"
        },
        {
          "campaign_types": "https://app.simpli.fi/api/campaign_types"
        },
        {
          "bid_types": "https://app.simpli.fi/api/bid_types"
        },
        {
          "recencies": "https://app.simpli.fi/api/recencies"
        }
      ]
    }
  ]
}

Video Ad Types

Only used by video ads.

A list of available video ad types is returned by the following request.
Request

curl -i -X GET -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/video_ad_types"

Response

{
  "video_ad_types": [
    ... Not showing all video ad types in the output ...
    {
      "resource": "https://app.simpli.fi/api/video_ad_types/1",
      "id": 1,
      "name": "Interstitial"
    }
  ]
}


