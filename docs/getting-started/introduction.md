# Introduction to the Simpli.fi API

The Simpli.fi APIs provide programmatic access to the Simpli.fi advertising platform, enabling you to create, manage, and optimize advertising campaigns at scale.

## Overview

The Simpli.fi APIs are continuing to evolve based on customer feedback. They are built on RESTful principles and provide comprehensive access to:

- **Campaign Management** - Create, update, and monitor advertising campaigns
- **Ad Creative Management** - Upload and manage ad creatives across formats
- **Targeting & Audiences** - Implement sophisticated targeting strategies
- **Reporting & Analytics** - Access detailed performance metrics
- **Organization Management** - Manage users, permissions, and account structure

## Key Features

### RESTful Architecture
- HTTP methods (GET, POST, PUT, DELETE) for intuitive resource management
- JSON request and response format for easy integration
- Consistent URL patterns and naming conventions

### Secure by Default
- HTTPS required for all API communications
- API key authentication with application and user-level keys
- Rate limiting to ensure platform stability

### Comprehensive Coverage
- Full programmatic access to platform features
- Bulk operations for efficiency
- Real-time and scheduled reporting

## System Architecture

Understanding the Simpli.fi platform structure is essential for effective API usage:

### Organizations and Users
- **Users** belong to one or more **Organizations**
- Users maintain the same login credentials across multiple organizations
- Organizations can have parent-child relationships

### Organization Hierarchy
The platform supports up to 3 levels of organization nesting:

1. **Simpli.fi as Parent** - Supports 2 additional levels underneath
2. **Simpli.fi as Grandparent** - Supports 1 level of nesting
3. **Standard Organizations** - No additional nesting

### Resource Structure
All API resources follow consistent patterns:
- Resources are always returned as collections (arrays)
- Nested resources are included in a `resources` array
- Multiple access paths to resources for flexibility

## Getting Started Checklist

Before you begin:

1. ✅ **Obtain API Keys**
   - Application API key (from Simpli.fi client services)
   - User API key (generate in "My Account")

2. ✅ **Set Up Development Environment**
   - HTTP client or SDK for your programming language
   - Secure storage for API credentials
   - JSON parsing capabilities

3. ✅ **Understand Rate Limits**
   - 300 requests per minute per application key
   - Implement retry logic with exponential backoff

4. ✅ **Review Documentation Structure**
   - Authentication requirements
   - Available endpoints and methods
   - Response formats and error handling

## API Capabilities

### Campaign Operations
- Create and manage campaigns across multiple organizations
- Set budgets, targeting, and scheduling
- Monitor campaign performance in real-time

### Creative Management  
- Upload image, video, HTML5, and native ad formats
- Organize ads with groups and flight scheduling
- Dynamic ad creation with data feeds

### Advanced Targeting
- Geographic targeting with custom boundaries (geo-fencing)
- Demographic and behavioral targeting
- First-party and third-party data integration
- Sequential messaging and audience targeting

### Reporting & Analytics
- Real-time campaign statistics
- Scheduled report generation
- Custom report templates
- Webhook notifications for automated data delivery

## Next Steps

1. **[Authentication](../authentication/authentication.md)** - Set up your API credentials
2. **[Getting Started Guide](getting-started.md)** - Make your first API calls
3. **[HTTP Responses](http-responses.md)** - Understand response formats
4. **[Common Query Parameters](common-query-params.md)** - Learn about filtering and pagination

## Support & Resources

- **API Newsletter** - [Subscribe](newsletter.md) for updates and announcements
- **Client Services** - Contact your Simpli.fi representative for assistance
- **Rate Limits** - Monitor usage to stay within platform guidelines

## API Philosophy

The Simpli.fi API is designed with developers in mind:
- **Consistency** - Predictable patterns across all endpoints
- **Flexibility** - Multiple ways to accomplish tasks
- **Performance** - Efficient operations with bulk capabilities
- **Reliability** - Robust error handling and status reporting