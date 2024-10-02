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
