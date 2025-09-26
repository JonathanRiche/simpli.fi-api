import { describe, test, expect, beforeEach, mock } from "bun:test";
import { SimplifiClient } from "../../src/index";
import { 
  createMockGeoFence, 
  createMockConversionZone,
  getTestCredentials 
} from "../utils/test-helpers";
import type { Coordinate, GeoConversionZone } from "../../src/geo/geofence";

describe("Geo-Conversion Operations", () => {
  let client: SimplifiClient;
  let testCredentials: ReturnType<typeof getTestCredentials>;

  beforeEach(() => {
    testCredentials = getTestCredentials();
    client = new SimplifiClient({
      appApiKey: testCredentials.appApiKey,
      userApiKey: testCredentials.userApiKey,
      orgId: testCredentials.orgId,
      debug: false
    });
  });

  describe("addConversionZones", () => {
    test("should create conversion zones successfully", async () => {
      const campaignId = 12345;
      const mockConversionZones = [
        {
          name: "Store Conversion Zone 1",
          bid_area: {
            type: "Polygon" as const,
            coordinates: [[[-87.6298, 41.8781], [-87.6298, 41.8881], [-87.6198, 41.8881], [-87.6198, 41.8781], [-87.6298, 41.8781]]] as Coordinate[][]
          },
          geo_fence_type_name: "Conversion" as const,
          attribution_window_days: 30,
          store_address: "123 Main St, Chicago, IL 60601"
        }
      ];

      const mockResponse = [
        createMockConversionZone({ 
          id: 1, 
          name: "Store Conversion Zone 1",
          geo_fence_type_name: "Conversion",
          attribution_window_days: 30,
          store_address: "123 Main St, Chicago, IL 60601"
        })
      ];

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.addConversionZones({ campaignId, conversionZones: mockConversionZones });
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/geo_fences`);
        expect(callArgs[1].method).toBe("POST");
        
        const requestBody = JSON.parse(callArgs[1].body);
        expect(requestBody.geo_fencing_update_type).toBe("Conversion");
        expect(requestBody.geo_fences).toEqual(mockConversionZones);
      } finally {
        global.fetch = originalFetch;
      }
    });

    test("should handle API errors", async () => {
      const campaignId = 12345;
      const mockConversionZones = [
        {
          name: "Store Conversion Zone 1",
          bid_area: {
            type: "Polygon" as const,
            coordinates: [[[-87.6298, 41.8781], [-87.6298, 41.8881], [-87.6198, 41.8881], [-87.6198, 41.8781], [-87.6298, 41.8781]]] as Coordinate[][]
          },
          geo_fence_type_name: "Conversion" as const,
          attribution_window_days: 30
        }
      ];

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: false,
        text: () => Promise.resolve("API Error: Invalid conversion zone data"),
      })) as any;
      global.fetch = mockFetch;

      try {
        await expect(client.addConversionZones({ campaignId, conversionZones: mockConversionZones }))
          .rejects
          .toThrow("Failed to add conversion zones");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("getConversionZones", () => {
    test("should fetch only conversion zones successfully", async () => {
      const campaignId = 12345;
      const mockAllZones = [
        createMockGeoFence({ id: 1, name: "Target Zone 1", geo_fence_type_name: "Target" }),
        createMockConversionZone({ 
          id: 2, 
          name: "Store Conversion Zone 1",
          geo_fence_type_name: "Conversion"
        }),
        createMockGeoFence({ id: 3, name: "Target Zone 2", geo_fence_type_name: "Target" }),
        createMockConversionZone({ 
          id: 4, 
          name: "Store Conversion Zone 2",
          geo_fence_type_name: "Conversion"
        })
      ];

      const expectedConversionZones = mockAllZones.filter(zone => zone.geo_fence_type_name === 'Conversion') as GeoConversionZone[];

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAllZones),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.getConversionZones({ campaignId });
        expect(result).toEqual(expectedConversionZones);
        expect(result.length).toBe(2);
        expect(result.every(zone => zone.geo_fence_type_name === 'Conversion')).toBe(true);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/geo_fences`);
        expect(callArgs[1].method).toBe("GET");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("updateConversionZone", () => {
    test("should update conversion zone successfully", async () => {
      const campaignId = 12345;
      const zoneId = 1;
      const updates = {
        name: "Updated Store Conversion Zone",
        attribution_window_days: 45
      };

      const mockResponse = createMockConversionZone({ 
        id: zoneId, 
        name: "Updated Store Conversion Zone",
        attribution_window_days: 45,
        geo_fence_type_name: "Conversion"
      });

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.updateConversionZone({ campaignId, zoneId, updates });
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/geo_fences/${zoneId}`);
        expect(callArgs[1].method).toBe("PUT");
        
        const requestBody = JSON.parse(callArgs[1].body);
        expect(requestBody.geo_fencing_update_type).toBe("Conversion");
        expect(requestBody.geo_fence).toEqual(updates);
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("deleteConversionZone", () => {
    test("should delete conversion zone successfully", async () => {
      const campaignId = 12345;
      const zoneId = 1;

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        text: () => Promise.resolve(""),
      })) as any;
      global.fetch = mockFetch;

      try {
        await client.deleteConversionZone({ campaignId, zoneId });
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/geo_fences/${zoneId}`);
        expect(callArgs[1].method).toBe("DELETE");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("getStoreVisitAttribution", () => {
    test("should fetch store visit attribution data successfully", async () => {
      const campaignId = 12345;
      const startDate = "2025-09-01";
      const endDate = "2025-09-30";

      const mockResponse = {
        stores: [
          {
            geo_fence_id: 1,
            geo_fence_name: "Store Conversion Zone 1",
            store_address: "123 Main St, Chicago, IL 60601",
            total_visits: 150,
            unique_visitors: 120,
            attributed_visits: 75,
            attribution_rate: 0.5,
            average_visit_duration_minutes: 25,
            visit_dates: ["2025-09-01", "2025-09-15", "2025-09-30"]
          }
        ],
        total_attributed_visits: 75,
        attribution_window_days: 30,
        date_range: {
          start: startDate,
          end: endDate
        }
      };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.getStoreVisitAttribution({ campaignId, startDate, endDate });
        expect(result).toEqual(mockResponse);
        expect(result.total_attributed_visits).toBe(75);
        expect(result.stores.length).toBe(1);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/store_visit_attribution`);
        expect(callArgs[0]).toContain(`start_date=${startDate}`);
        expect(callArgs[0]).toContain(`end_date=${endDate}`);
        expect(callArgs[1].method).toBe("GET");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("getStoreConversionMetrics", () => {
    test("should fetch store conversion metrics successfully", async () => {
      const campaignId = 12345;

      const mockResponse = [
        {
          store_id: 1,
          store_name: "Store Conversion Zone 1",
          campaign_id: campaignId,
          total_visits: 150,
          unique_visitors: 120,
          attributed_visits: 75,
          attribution_rate: 0.5,
          average_visit_duration_minutes: 25,
          conversion_value: 1500,
          roi: 2.5
        }
      ];

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.getStoreConversionMetrics({ campaignId });
        expect(result).toEqual(mockResponse);
        expect(result.length).toBe(1);
        expect(result[0].roi).toBe(2.5);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/store_conversion_metrics`);
        expect(callArgs[1].method).toBe("GET");
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe("setAttributionConfig", () => {
    test("should set attribution configuration successfully", async () => {
      const campaignId = 12345;
      const config = {
        view_attribution_window_days: 30,
        click_attribution_window_days: 30,
        store_visit_threshold_minutes: 5,
        location_accuracy_meters: 100,
        attribution_model: "last_touch" as const
      };

      const mockResponse = {
        view_attribution_window_days: 30,
        click_attribution_window_days: 30,
        store_visit_threshold_minutes: 5,
        location_accuracy_meters: 100,
        attribution_model: "last_touch" as const
      };

      const originalFetch = global.fetch;
      const mockFetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })) as any;
      global.fetch = mockFetch;

      try {
        const result = await client.setAttributionConfig({ campaignId, config });
        expect(result).toEqual(mockResponse);
        expect(result.attribution_model).toBe("last_touch");
        expect(mockFetch).toHaveBeenCalledTimes(1);
        
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toContain(`/campaigns/${campaignId}/attribution_config`);
        expect(callArgs[1].method).toBe("PUT");
        
        const requestBody = JSON.parse(callArgs[1].body);
        expect(requestBody.attribution_config).toEqual(config);
      } finally {
        global.fetch = originalFetch;
      }
    });
  });
});