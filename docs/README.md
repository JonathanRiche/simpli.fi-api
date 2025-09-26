# Simpli.fi API Documentation

Welcome to the Simpli.fi API documentation. This guide provides comprehensive information about integrating with the Simpli.fi advertising platform APIs.

## Getting Started

- [Introduction](getting-started/introduction.md) - Overview of the Simpli.fi API
- [Authentication](authentication/authentication.md) - API key setup and authentication
- [Getting Started Guide](getting-started/getting-started.md) - Your first API requests
- [API Versioning](getting-started/api-versioning.md) - Version management and compatibility
- [HTTP Responses](getting-started/http-responses.md) - Understanding response codes and formats
- [Common Query Parameters](getting-started/common-query-params.md) - Shared parameters across endpoints

## Campaign Management

- [Campaigns](campaigns/campaigns.md) - Create and manage advertising campaigns
- [Campaign Stats](campaigns/campaign-stats.md) - Retrieve campaign performance data
- [Campaign Groups](campaigns/campaign-groups.md) - Organize campaigns into groups
- [Campaign Types](campaigns/campaign-types.md) - Available campaign types
- [Budget Plans](campaigns/budget-plans.md) - Campaign budget management
- [Campaign Addresses](campaigns/campaign-addresses.md) - Addressable target management
- [Campaign Deals](campaigns/campaign-deals.md) - Private marketplace deals
- [Campaign Events](campaigns/campaign-events.md) - Event-based targeting
- [Campaign First Party Segments](campaigns/campaign-first-party-segments.md) - First-party data targeting
- [Campaign Sequential Audiences](campaigns/campaign-sequential-audiences.md) - Sequential audience targeting

## Ad Management

- [Ads](ads/ads.md) - Create and manage ad creatives
- [Ad Groups](ads/ad-groups.md) - Organize ads with flight scheduling
- [Ad File Types](ads/ad-file-types.md) - Supported ad formats
- [Ad Sizes](ads/ad-sizes.md) - Available ad dimensions
- [Ad Placements](ads/ad-placements.md) - Placement options (in-app vs in-browser)
- [Ad Template Groups](ads/ad-template-groups.md) - Dynamic ad templates
- [Dynamic Ad Feeds](ads/dynamic-ad-feeds.md) - Data feeds for dynamic ads
- [Dynamic Ad Types](ads/dynamic-ad-types.md) - Types of dynamic advertisements
- [Video Ad Types](ads/video-ad-types.md) - Video advertisement formats

## Targeting

- [Geo Fences](targeting/geo-fences.md) - Location-based targeting with custom boundaries
- [Geo Targets](targeting/geo-targets.md) - Geographic targeting options
- [Demographics](targeting/demographics.md) - Demographic targeting parameters
- [Device Types](targeting/device-types.md) - Device-specific targeting
- [Operating Systems](targeting/operating-systems.md) - OS targeting options
- [Browsers](targeting/browsers.md) - Browser targeting
- [Addressable Targets](targeting/addressable-targets.md) - Household-level targeting
- [First Party Segments](targeting/first-party-segments.md) - Custom audience segments
- [Third Party Segments](targeting/third-party-segments.md) - External data segments
- [Sequential Audiences](targeting/sequential-audiences.md) - Sequential messaging audiences
- [Land Uses](targeting/land-uses.md) - Property type targeting
- [Congressional Districts](targeting/congressional-districts.md) - Political district targeting
- [Postal Codes](targeting/postal-codes.md) - ZIP code targeting

## Reporting

- [Report API Walkthrough](reports/report-api-walkthrough.md) - Complete guide to reporting
- [Report Center Reports](reports/report-center-reports.md) - Creating and managing reports
- [Report Center Templates](reports/report-center-templates.md) - Report templates
- [Report Center Snapshots](reports/report-center-snapshots.md) - One-time report generation
- [Report Center Schedules](reports/report-center-schedules.md) - Scheduled reporting
- [Report Center Webhook Notifications](reports/report-center-webhook-notifications.md) - Webhook integration
- [Report Center Filter Expressions](reports/report-center-filter-expressions.md) - Advanced filtering

## Reference

- [Organizations](reference/organizations.md) - Organization management
- [Users](reference/users.md) - User account management
- [Bid Types](reference/bid-types.md) - Available bidding strategies
- [Media Types](reference/media-types.md) - Supported media formats
- [Playback Methods](reference/playback-methods.md) - Video playback options
- [Contexts](reference/contexts.md) - Content context categories
- [Keywords](reference/keywords.md) - Keyword targeting
- [Domains](reference/domains.md) - Website domain management
- [IP Ranges](reference/ip-ranges.md) - IP address targeting
- [Recencies](reference/recencies.md) - Recency targeting options
- [Comments](reference/comments.md) - Campaign commenting system
- [Changes](reference/changes.md) - Audit trail and change tracking
- [Custom Fields](reference/custom-fields.md) - Custom field definitions
- [Organization Tags](reference/organization-tags.md) - Organization tagging system
- [Simplifi Managed Deals](reference/simplifi-managed-deals.md) - Platform-managed deals

## Data Management

- [Feed Filters](reference/feed-filters.md) - Data feed filtering
- [First Party Segment Rules](reference/first-party-segment-rules.md) - Segment rule definitions
- [First Party Segment Custom Values](reference/first-party-segment-custom-values.md) - Custom segment values
- [Segment Types](reference/segment-types.md) - Available segment types
- [Segment Target Types](reference/segment-target-types.md) - Segment targeting modes
- [Segment Custom Value Types](reference/segment-custom-value-types.md) - Custom value types
- [Segment URL Match Types](reference/segment-url-match-types.md) - URL matching patterns
- [Third Party Segment Providers](reference/third-party-segment-providers.md) - External data providers
- [Event Targets](reference/event-targets.md) - Event-based targeting
- [OBA Providers](reference/oba-providers.md) - Online Behavioral Advertising providers
- [Markup Rate Types](reference/markup-rate-types.md) - Pricing markup types
- [Retail Markups](reference/retail-markups.md) - Retail pricing markups
- [Organization Domain Blocklists](reference/organization-domain-blocklists.md) - Domain filtering

## API Information

The Simpli.fi APIs are RESTful, use HTTPS exclusively, authenticate via API keys, and communicate using JSON. All endpoints require proper authentication headers and return standardized response formats.

For additional support or questions, please contact your Simpli.fi representative.

## Quick Links

- [Newsletter Signup](getting-started/newsletter.md) - Stay updated on API changes
- [Rate Limits](getting-started/getting-started.md#rate-limits) - API usage limits
- [Error Handling](getting-started/http-responses.md#error-codes) - Common error scenarios