import { beforeAll, afterAll, beforeEach, afterEach } from "bun:test";

// Global test setup - runs once before all tests
beforeAll(async () => {
  console.log("🧪 Setting up Simpli.fi API Client test environment...");
  
  // Set default test environment variables if not already set
  if (!process.env.TEST_APP_API_TOKEN) {
    process.env.TEST_APP_API_TOKEN = "test_app_token";
  }
  if (!process.env.TEST_USER_API_KEY) {
    process.env.TEST_USER_API_KEY = "test_user_key";  
  }
  if (!process.env.TEST_ORG_ID) {
    process.env.TEST_ORG_ID = "12345";
  }
  if (!process.env.TEST_CAMPAIGN_ID) {
    process.env.TEST_CAMPAIGN_ID = "67890";
  }
});

// Global test teardown - runs once after all tests
afterAll(async () => {
  console.log("🏁 Tearing down test environment...");
});

// Reset certain state before each test
beforeEach(() => {
  // Clear any mocks or reset state if needed
});

// Cleanup after each test  
afterEach(() => {
  // Clear any test data or mocks
});

export {};