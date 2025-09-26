# Simpli.fi API Client Test Suite

This directory contains a comprehensive test suite for the Simpli.fi API Client built using **Bun's built-in test runner**. The test suite includes both unit tests (with mocked API calls) and integration tests (against real API endpoints).

## 🏗️ Test Structure

```
tests/
├── setup.ts                    # Global test setup and configuration
├── utils/
│   └── test-helpers.ts         # Mock data generators and test utilities
├── unit/                       # Unit tests with mocked API responses
│   ├── SimplifiClient.test.ts  # Core client functionality tests
│   ├── campaigns.test.ts       # Campaign operations tests
│   ├── ads.test.ts            # Ad operations tests
│   ├── geofence.test.ts       # Geo-fence operations tests
│   ├── landuses.test.ts       # Land use operations tests
│   └── budget-plans.test.ts   # Budget plan operations tests (WIP)
├── integration/                # Integration tests against live API
│   └── campaigns.integration.test.ts
└── README.md                  # This file
```

## 🧪 Test Types

### Unit Tests
- **Fast execution** - All API calls are mocked
- **Isolated testing** - No external dependencies
- **Comprehensive coverage** - Tests all client methods and error conditions
- **Mock validation** - Verifies correct API request parameters and headers

### Integration Tests  
- **Real API calls** - Tests against actual Simpli.fi API endpoints
- **Environment-gated** - Only runs when proper credentials are configured
- **Cleanup included** - Automatically cleans up test data after completion
- **Rate limiting aware** - Includes delays to avoid API rate limits

## 🚀 Running Tests

### Prerequisites

1. **Install Bun** (if not already installed):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

### Run All Tests
```bash
bun test
```

### Run Specific Test Categories

**Unit tests only:**
```bash
bun test tests/unit/
```

**Integration tests only:**
```bash
bun test tests/integration/
```

**Specific test file:**
```bash
bun test tests/unit/campaigns.test.ts
```

### Run Tests with Coverage
```bash
bun test --coverage
```

### Watch Mode (Re-run tests on file changes)
```bash
bun test --watch
```

### Run with Specific Reporters
```bash
# JUnit XML format (for CI/CD)
bun test --reporter=junit --reporter-outfile=test-results.xml

# Custom timeout
bun test --timeout=60000
```

## 🔧 Configuration

### Environment Variables

Create a `.env.test.local` file (copy from `.env.test`) with your test credentials:

```env
# Test API Keys - Use sandbox/test environment keys
TEST_APP_API_TOKEN=your_test_app_api_token
TEST_USER_API_KEY=your_test_user_api_key  
TEST_ORG_ID=your_test_org_id

# Integration test settings
RUN_INTEGRATION_TESTS=true  # Set to false to skip integration tests

# Test Campaign/Ad IDs for integration tests
TEST_CAMPAIGN_ID=123456
TEST_AD_ID=789012
```

### Bun Test Configuration

The `bunfig.toml` file in the project root contains Bun-specific test configuration:

```toml
[test]
coverage = true
timeout = 30000
preload = "./tests/setup.ts"
```

## 📝 Writing New Tests

### Unit Test Example

```typescript
import { describe, test, expect, beforeEach, mock } from "bun:test";
import { SimplifiClient } from "../../src/index";
import { getTestCredentials } from "../utils/test-helpers";

describe("My Feature Tests", () => {
  let client: SimplifiClient;

  beforeEach(() => {
    const credentials = getTestCredentials();
    client = new SimplifiClient(credentials);
  });

  test("should do something", async () => {
    // Mock fetch response
    const originalFetch = global.fetch;
    const mockFetch = mock(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })) as any;
    global.fetch = mockFetch;

    try {
      const result = await client.someMethod();
      expect(result).toBeDefined();
      expect(mockFetch).toHaveBeenCalledTimes(1);
    } finally {
      global.fetch = originalFetch;
    }
  });
});
```

### Integration Test Example

```typescript
import { describe, test, expect, beforeAll } from "bun:test";
import { SimplifiClient } from "../../src/index";
import { getTestCredentials, isIntegrationTest } from "../utils/test-helpers";

describe.skipIf(!isIntegrationTest())("My Integration Tests", () => {
  let client: SimplifiClient;

  beforeAll(() => {
    const credentials = getTestCredentials();
    client = new SimplifiClient(credentials);
  });

  test("should work against real API", async () => {
    const result = await client.someMethod();
    expect(result).toBeDefined();
  }, 10000); // Extended timeout for network calls
});
```

## 🛠️ Test Utilities

### Mock Data Generators

The `test-helpers.ts` file provides utilities for generating mock data:

```typescript
import { 
  createMockCampaign, 
  createMockCampaignRequest,
  createMockAd,
  createMockGeoFence,
  getTestCredentials,
  isIntegrationTest
} from "../utils/test-helpers";

// Generate mock campaign
const mockCampaign = createMockCampaign({ 
  name: "Custom Campaign Name",
  status: "Active" 
});

// Generate mock campaign request
const campaignRequest = createMockCampaignRequest({
  start_date: "2024-01-01",
  end_date: "2024-12-31"
});
```

### Cleanup Utilities

For integration tests, use cleanup utilities to remove test data:

```typescript
import { cleanupTestCampaign, cleanupTestAd } from "../utils/test-helpers";

// In afterAll or afterEach
await cleanupTestCampaign(campaignId, orgId, client);
await cleanupTestAd(adId, campaignId, orgId, client);
```

## 🔍 Test Coverage

The test suite covers:

- ✅ **SimplifiClient** - Constructor, configuration, validation
- ✅ **Campaign Operations** - CRUD, status changes, filtering, pagination
- ✅ **Ad Operations** - List, create, update, pause, file uploads, bulk operations
- ✅ **GeoFence Operations** - Get, add, update, delete, replace
- ✅ **Land Use Operations** - Get all, get single
- 🚧 **Budget Plans** - CRUD operations, rollover functionality (WIP)
- 🚧 **Campaign Stats** - Various stats endpoints (TODO)
- ✅ **Error Handling** - API errors, validation errors, network issues
- ✅ **Integration Tests** - Real API interactions with cleanup

## 🐛 Debugging Tests

### Debug Mode

Enable debug mode in the SimplifiClient to see API requests:

```typescript
const client = new SimplifiClient({
  // ...credentials
  debug: true  // Enables request/response logging
});
```

### Verbose Test Output

Run tests with verbose output:

```bash
bun test --verbose
```

### Debugging Failed Tests

When tests fail, Bun provides detailed error messages. For integration tests, check:

1. API credentials are correct
2. Test organization has necessary permissions  
3. Rate limiting isn't being hit
4. Test data cleanup completed successfully

## 📊 CI/CD Integration

### GitHub Actions

```yaml
- name: Install Bun
  uses: oven-sh/setup-bun@v2

- name: Install dependencies  
  run: bun install

- name: Run tests
  run: bun test
  
- name: Generate test report
  run: bun test --reporter=junit --reporter-outfile=test-results.xml
```

### GitLab CI

```yaml
test:
  image: oven/bun:latest
  script:
    - bun install
    - bun test --reporter=junit --reporter-outfile=test-results.xml
  artifacts:
    reports:
      junit: test-results.xml
```

## 🎯 Best Practices

1. **Keep tests focused** - Each test should verify one specific behavior
2. **Use descriptive names** - Test names should clearly describe what is being tested
3. **Mock external dependencies** - Unit tests should not make real API calls
4. **Clean up after integration tests** - Always clean up test data to avoid pollution
5. **Use appropriate timeouts** - Network calls need longer timeouts than unit tests
6. **Group related tests** - Use `describe` blocks to organize tests logically
7. **Test error conditions** - Don't just test happy paths
8. **Use type-safe mocks** - Ensure mock data matches expected types

## 🤝 Contributing

When adding new features to the API client, please:

1. Add corresponding unit tests with mocked responses
2. Add integration tests if the feature involves new API endpoints
3. Update mock data generators if new types are introduced
4. Ensure all tests pass before submitting PR
5. Add cleanup logic for any test data created

## 📚 Resources

- [Bun Test Runner Documentation](https://bun.sh/docs/cli/test)
- [Bun Testing APIs](https://bun.sh/docs/test/writing)
- [Simpli.fi API Documentation](https://developers.simpli.fi/)

---

For questions or issues with the test suite, please open an issue in the repository.