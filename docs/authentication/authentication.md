# Authentication

The Simpli.fi API uses API key-based authentication with two required keys for each request.

## Required API Keys

You need two keys to authenticate with the Simpli.fi API:

1. **Application API Key** - Provided by your Simpli.fi client services representative
2. **User API Key** - Generated in your Simpli.fi account under "My Account"

## Request Headers

Include both keys in the headers of each API request:

```http
X-App-Key: your-application-key
X-User-Key: your-user-key
Content-Type: application/json
```

## Example Request

```bash
curl -i -X GET \
  -H "X-App-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "X-User-Key: xxxx-xx-xx-xx-xxxxxx" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api/organizations"
```

## Security Best Practices

- **Never share your API keys** - Keep both application and user keys confidential
- **Store keys securely** - Use environment variables or secure configuration management
- **Rotate keys regularly** - Generate new user keys periodically for enhanced security
- **Monitor usage** - Track API requests to detect unauthorized access

## Rate Limits

The Simpli.fi API enforces a rate limit of **300 requests per minute** per application key.

- Requests that exceed this limit will return a `429 Too Many Requests` response
- Implement exponential backoff and retry logic in your applications
- Consider caching responses when appropriate to reduce API calls

## Content Type

Most API resources require the `Content-Type` header to be set to `application/json`. Some file upload endpoints may require `multipart/form-data`.

## Error Responses

Authentication-related error responses:

- **401 Unauthorized** - Invalid or missing API keys
- **429 Too Many Requests** - Rate limit exceeded

See [HTTP Responses](../getting-started/http-responses.md) for complete error handling information.

## Getting Started

Once you have your API keys configured, try making your first API request to verify authentication:

```bash
curl -i -X GET \
  -H "X-App-Key: your-app-key" \
  -H "X-User-Key: your-user-key" \
  -H "Content-Type: application/json" \
  "https://app.simpli.fi/api"
```

This initial request returns information about your user account and accessible resources.

## Next Steps

- [Getting Started Guide](../getting-started/getting-started.md) - Make your first API requests
- [HTTP Responses](../getting-started/http-responses.md) - Understand response formats
- [Organizations](../reference/organizations.md) - Learn about the organization structure