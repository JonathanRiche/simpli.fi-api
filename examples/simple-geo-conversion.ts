import { SimplifiClient } from "../src/index";
import type { Coordinate } from "../src/geo/geofence";

// Simple Geo-Conversion Example
// This example shows the basic usage of geo-conversion tracking features

async function simpleGeoConversionExample() {
  console.log("🚀 Starting Simple Geo-Conversion Example");
  
  // Initialize the client
  const client = new SimplifiClient({
    appApiKey: process.env.APP_API_TOKEN || "your_app_api_token",
    userApiKey: process.env.USER_API_KEY || "your_user_api_key",
    orgId: process.env.ORG_ID || "your_org_id"
  });

  try {
    // Example: Create store conversion zones for a campaign
    const campaignId = 12345; // Replace with your campaign ID
    
    console.log("🏬 Creating store conversion zones...");
    
    // Define store locations for conversion tracking
    const storeZones = [
      {
        name: "Downtown Store",
        bid_area: {
          type: "Polygon" as const,
          coordinates: [[
            [-87.6298, 41.8781],
            [-87.6298, 41.8881], 
            [-87.6198, 41.8881],
            [-87.6198, 41.8781],
            [-87.6298, 41.8781]
          ]] as Coordinate[][]
        },
        geo_fence_type_name: "Conversion" as const,
        attribution_window_days: 30,
        store_address: "123 Main St, Chicago, IL 60601"
      }
    ];

    // Add conversion zones to campaign
    try {
      const zones = await client.addConversionZones({
        campaignId,
        conversionZones: storeZones
      });
      
      console.log(`✅ Created ${zones.length} conversion zone(s)`);
      zones.forEach(zone => {
        console.log(`   - ${zone.name} (ID: ${zone.id})`);
      });
    } catch (error) {
      console.log("⚠️  Conversion zone creation failed (may require permissions)");
    }

    // Example: Get store visit attribution data
    console.log("📊 Getting store visit attribution...");
    
    try {
      const attribution = await client.getStoreVisitAttribution({
        campaignId,
        startDate: "2025-09-01",
        endDate: "2025-09-30"
      });
      
      console.log(`✅ Attribution data retrieved:`);
      console.log(`   - Total attributed visits: ${attribution.total_attributed_visits}`);
      console.log(`   - Stores tracked: ${attribution.stores.length}`);
      
      attribution.stores.forEach(store => {
        console.log(`   - ${store.geo_fence_name}: ${store.attributed_visits} visits`);
      });
    } catch (error) {
      console.log("⚠️  Attribution data retrieval failed (may not be available)");
    }

    // Example: Get conversion metrics
    console.log("📈 Getting conversion metrics...");
    
    try {
      const metrics = await client.getStoreConversionMetrics({ campaignId });
      
      console.log(`✅ Conversion metrics retrieved:`);
      metrics.forEach(metric => {
        console.log(`   - ${metric.store_name}:`);
        console.log(`     Visits: ${metric.total_visits}`);
        console.log(`     Attributed: ${metric.attributed_visits}`);
        console.log(`     Rate: ${(metric.attribution_rate * 100).toFixed(1)}%`);
      });
    } catch (error) {
      console.log("⚠️  Conversion metrics retrieval failed (may not be available)");
    }

    console.log("✅ Simple Geo-Conversion Example Completed!");

  } catch (error) {
    console.error("❌ Error in simple geo-conversion example:", error);
  }
}

// Run the example
if (import.meta.main) {
  simpleGeoConversionExample().catch(console.error);
}

export { simpleGeoConversionExample };