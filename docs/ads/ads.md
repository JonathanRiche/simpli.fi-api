# Ads

The Ads API allows you to create and manage ad creatives across multiple formats including images, videos, HTML5, and native ads. All ads belong to campaigns and can be organized into ad groups for advanced scheduling.

## Overview

Ad creatives are the visual and interactive elements displayed to users. The Ads API supports:
- **Image Ads** - Static image advertisements
- **HTML5 Ads** - Interactive rich media ads
- **Video Ads** - Video advertisements with VAST support
- **Native Ads** - Native format advertisements
- **Dynamic Ads** - Data-driven template-based ads

## HTTP Methods Supported

- **GET** - List ads or retrieve specific ad details
- **POST** - Create new ads and upload creatives
- **PUT** - Update ad settings
- **DELETE** - Delete ads

## Ad Object Structure

```json
{
  "ads": [
    {
      "resource": "https://app.simpli.fi/api/organizations/8/campaigns/697/ads/1098",
      "id": 1098,
      "name": "My Image Ad",
      "status": "Active",
      "pacing": 100.0,
      "creative_group_id": 1,
      "creative_id": null,
      "click_tag_verified": false,
      "preview_tag": "<iframe src=\"//adspreview.simpli.fi/ads/development/697/1098/ad.html?sifitest=true\" width=\"160\" height=\"90\" frameborder=\"0\" scrolling=\"no\"></iframe>",
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
        }
      ]
    }
  ]
}
```

## Listing Ads

List all ads for a specific campaign:

```bash
curl -i -X GET \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/697/ads"
```

## Ad Status

Ads can have the following statuses:
- **Active** - Currently serving
- **Paused** - Temporarily stopped
- **Deleted** - Removed from campaign

## Creating Ads

### Image Ads

Upload image files using multipart form data:

```bash
curl -i -X POST \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: multipart/form-data" \
  -F "ad[name]=My image ad example" \
  -F "ad[alt_text]=Alternate text 125 characters or less" \
  -F "ad[target_url]=http://simpli.fi" \
  -F "ad[pacing]=100" \
  -F "ad[ad_file_type_id]=1" \
  -F "ad[ad_size_id]=2" \
  -F "ad[primary_creative]=@image.jpg;type=image/jpeg" \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads"
```

**Key Parameters:**
- `ad[alt_text]` - Optional alt text (125 characters max)
- `ad[ad_file_type_id]` - 1 for images
- `ad[ad_size_id]` - See [Ad Sizes](ad-sizes.md) for available options
- `ad[primary_creative]` - File upload

### HTML Ads

Create HTML-based ads:

```bash
curl -i -X POST \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
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
```

### HTML5 Ads

Upload HTML5 ads as ZIP files containing all assets:

```bash
curl -i -X POST \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: multipart/form-data" \
  -F "ad[name]=My html5 ad example" \
  -F "ad[target_url]=https://simpli.fi" \
  -F "ad[ad_file_type_id]=9" \
  -F "ad[ad_size_id]=2" \
  -F "ad[primary_creative]=@my-ad.zip;type=application/zip" \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads"
```

**ZIP Structure Example:**
```
my-ad.zip
├── functionality.js
├── icon.svg
├── index.html
├── logo.jpg
└── styles.css
```

**Note:** HTML5 ads are validated against IAB specifications upon upload.

### Video Ads

Upload video files with tracking support:

```bash
curl -i -X POST \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: multipart/form-data" \
  -F "ad[name]=My Video ad" \
  -F "ad[target_url]=http://simpli.fi" \
  -F "ad[ad_file_type_id]=6" \
  -F "ad[title]=Must be 25 chars or less" \
  -F "ad[playback_method_ids][]=1" \
  -F "ad[playback_method_ids][]=2" \
  -F "ad[video_ad_type_ids][]=3" \
  -F "ad[video_ad_type_ids][]=4" \
  -F "ad[impression_tracking][]=https://tracking.example.com/impression" \
  -F "ad[click_tracking][]=https://tracking.example.com/click" \
  -F "ad[primary_creative]=@video.mp4;type=video/mp4" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/ads"
```

**Preferred Video Properties:**
- **Format:** MP4 (H.264 codec)
- **Dimensions:** 768x576 px
- **Video Bitrate:** 5.4 Mbps or higher
- **Audio Bitrate:** 160 kbps or higher
- **Max File Size:** 200 MB
- **Other Formats:** 3gp, avi, m4v, mov, mpeg

**Third-Party Tracking:**
- `impression_tracking` - Up to 3 URLs (HTTPS required)
- `click_tracking` - Up to 3 URLs (HTTPS required)

### Third-Party Video (VAST)

Use VAST tags for third-party video ads:

```bash
curl -i -X POST \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: multipart/form-data" \
  -F "ad[name]=VAST Video Ad" \
  -F "ad[target_url]=http://www.simpli.fi" \
  -F "ad[ad_file_type_id]=7" \
  -F "ad[playback_method_ids][]=1" \
  -F "ad[video_ad_type_ids][]=1" \
  -F "ad[third_party_vast_tag]=https://example.com/vast-tag.xml" \
  "https://app.simpli.fi/api/organizations/8/campaigns/644/ads"
```

**VAST Requirements:**
- VAST 2.0 compliant
- VPAID 2.0 support (wrapped in VAST)
- All tracking included in VAST tag

### Native Ads

Create native format advertisements:

```bash
curl -i -X POST \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: multipart/form-data" \
  -F "ad[name]=My native ad example" \
  -F "ad[alt_text]=Alternate text 125 characters or less" \
  -F "ad[target_url]=http://simpli.fi" \
  -F "ad[pacing]=100" \
  -F "ad[ad_file_type_id]=10" \
  -F "ad[ad_size_id]=2" \
  -F "ad[title]=Native ad title (25 chars max)" \
  -F "ad[body]=Native ad body text (90 chars max)" \
  -F "ad[call_to_action]=Click Here (15 chars max)" \
  -F "ad[icon]=@icon.png;type=image/png" \
  -F "ad[primary_creative]=@creative.jpg;type=image/jpeg" \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads"
```

**Native Ad Requirements:**
- **Icon:** Minimum 120x120 px
- **Image Width:** 400-2400 px
- **Aspect Ratio:** 1.88-1.94
- **Title:** 25 characters max
- **Body:** 90 characters max
- **CTA:** 15 characters max

### Dynamic Ads

Create template-based dynamic ads:

```bash
curl -i -X POST \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "ad": {
      "template_id": 11,
      "dynamic_type_id": 1,
      "default_url": "https://www.dynamic.com",
      "default_pacing": 100,
      "feed_id": 1016,
      "ad_branding": {
        "headline_1": "Primary Headline",
        "headline_2": "Secondary Headline",
        "tagline_1": "Brand Tagline",
        "cta_1": "Call To Action",
        "primary_color": "#c0c0c0",
        "secondary_color": "#c1c1c1",
        "logo": {
          "filetype": "image/png",
          "filename": "logo.png",
          "base64": "iVBORw0KGgoAAAANSUhEUgAABdwAAAOeCAYAAAAZddI5..."
        }
      }
    }
  }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads/create_from_template"
```

## Query Parameters

### Filtering
```bash
# Filter by status
"?filter=status%3Dactive"
"?filter=status%3Dpaused"
```

### Including Related Resources
```bash
# Include nested resources
"?include=ad_file_types"
"?include=ad_sizes"
"?include=ad_sizes,ad_file_types,ad_placements"
```

### Include Deleted Ads
```bash
# Include deleted ads (files retained for 6 months)
"?allow_deleted=true"
```

### Attributes Only
```bash
# Exclude actions and resources arrays
"?attributes_only=true"
```

## Ad Placement

Set `ad_placement_id` to control where ads appear:
- **1** - Both in-app and in-browser
- **2** - In-app only
- **3** - In-browser only
- **null** - Use campaign default settings

## Updating Ad Branding (Dynamic Ads)

Update branding for existing dynamic ads:

```bash
curl -i -X POST \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "ad_branding": {
      "headline_1": "Updated Headline",
      "primary_color": "#ff0000",
      "logo": {
        "filetype": "image/png",
        "filename": "new-logo.png",
        "base64": "iVBORw0KGgoAAAANSUhEUgAABdwAAAOeCAYAAAAZddI5..."
      }
    }
  }' \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads/82/update_ad_branding"
```

## Getting Individual Ads

Retrieve a specific ad with full or shortened syntax:

```bash
# Full path
curl -i -X GET \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations/8/campaigns/646/ads/963"

# Shortened path
curl -i -X GET \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/ads/963"
```

## Bulk Operations

Get multiple ads by ID:

```bash
curl -i -X GET \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/ads/bulk_ads?ids=963,1,35,760"
```

Preview-only response:
```bash
"https://app.simpli.fi/api/ads/bulk_ads?ids=963,1,35,760&preview_only=true"
```

## Related Resources

- [Ad Groups](ad-groups.md) - Organize ads with flight scheduling
- [Ad File Types](ad-file-types.md) - Supported creative formats  
- [Ad Sizes](ad-sizes.md) - Available ad dimensions
- [Ad Placements](ad-placements.md) - Placement targeting options
- [Dynamic Ad Feeds](dynamic-ad-feeds.md) - Data feeds for dynamic ads
- [Video Ad Types](video-ad-types.md) - Video advertisement formats

## Best Practices

1. **Creative Quality** - Use high-resolution images and optimized video files
2. **Alt Text** - Always include descriptive alt text for accessibility
3. **File Sizes** - Keep file sizes reasonable for faster loading
4. **Testing** - Use preview tags to test ads before going live
5. **Tracking** - Implement proper tracking for performance measurement
6. **Compliance** - Ensure HTML5 ads meet IAB specifications

## Legacy Format Notice

**Deprecated Formats:**
- Facebook ads (no longer supported)
- Flash ads (no longer supported)  
- Click-to-call ads (no longer supported)

For new implementations, focus on image, HTML5, video, native, and dynamic ad formats.