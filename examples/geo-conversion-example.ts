import { SimplifiClient } from "../src/index";
import type { Coordinate } from "../src/geo/geofence";

// Geo-Conversion Tracking Example
// This example demonstrates how to set up store visit attribution tracking

async function geoConversionExample() {
  console.log("🚀 Starting Geo-Conversion Tracking Example");
  
  // Initialize the client with your API credentials
  const client = new SimplifiClient({
    appApiKey: process.env.APP_API_TOKEN || "your_app_api_token",
    userApiKey: process.env.USER_API_KEY || "your_user_api_key",
    orgId: process.env.ORG_ID || "your_org_id",
    debug: true
  });

  try {
    // Step 1: Create a geo-optimized campaign for store visit tracking
    console.log("📋 Creating geo-optimized campaign...");
    const campaignResponse = await client.createCampaign({
      campaignData: {
        name: "Store Visit Attribution Campaign",
        campaign_type_id: 5, // Geo Optimized
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        total_budget: 5000,
        daily_budget: 200,
        bid: 2.5
      }
    });

    const campaignId = campaignResponse.campaign.id!;
    console.log(`✅ Created campaign: ${campaignResponse.campaign.name} (ID: ${campaignId})`);

    // Step 2: Create store conversion zones for physical location tracking
    console.log("🏬 Setting up store conversion zones...");
    
    // Define store locations with polygon boundaries
    const storeConversionZones = [
      {
        name: "A-American Custom Flooring - Chicago",
        bid_area: {
          type: "Polygon" as const,
          coordinates: [[
            [-87.6298, 41.8781], // Chicago Loop area
            [-87.6298, 41.8881],
            [-87.6198, 41.8881],
            [-87.6198, 41.8781],
            [-87.6298, 41.8781]
          ]] as Coordinate[][]
        },
        geo_fence_type_name: "Conversion" as const,
        attribution_window_days: 30, // Track visits for 30 days after ad exposure
        store_address: "123 Main St, Chicago, IL 60601"
      },
      {
        name: "A-American Custom Flooring - Schaumburg",
        bid_area: {
          type: "Polygon" as const,
          coordinates: [[
            [-88.1234, 42.0584], // Schaumburg area
            [-88.1234, 42.0684],
            [-88.1134, 42.0684],
            [-88.1134, 42.0584],
            [-88.1234, 42.0584]
          ]] as Coordinate[][]
        },
        geo_fence_type_name: "Conversion" as const,
        attribution_window_days: 30,
        store_address: "456 Woodfield Rd, Schaumburg, IL 60173"
      }
    ];

    try {
      const conversionZones = await client.addConversionZones({
        campaignId,
        conversionZones: storeConversionZones
      });
      
      console.log(`✅ Created ${conversionZones.length} conversion zones:`);
      conversionZones.forEach(zone => {
        console.log(`   - ${zone.name} (ID: ${zone.id})`);
      });
    } catch (error) {
      console.log("⚠️  Note: Conversion zone creation may require specific account permissions");
      console.log(`   Error: ${error}`);
    }

    // Step 3: Configure attribution settings
    console.log("⚙️  Configuring attribution settings...");
    
    const attributionConfig = {
      view_attribution_window_days: 30,     // Attribute visits up to 30 days after ad view
      click_attribution_window_days: 30,     // Attribute visits up to 30 days after ad click
      store_visit_threshold_minutes: 5,     // Minimum 5 minutes in store to count as visit
      location_accuracy_meters: 100,       // GPS accuracy requirement
      attribution_model: "last_touch" as const  // Last touch attribution model
    };

    try {
      const config = await client.setAttributionConfig({
        campaignId,
        config: attributionConfig
      });
      
      console.log("✅ Attribution configuration set:");
      console.log(`   - View attribution window: ${config.view_attribution_window_days} days`);
      console.log(`   - Visit threshold: ${config.store_visit_threshold_minutes} minutes`);
      console.log(`   - Attribution model: ${config.attribution_model}`);
    } catch (error) {
      console.log("⚠️  Note: Attribution configuration may not be available yet");
      console.log(`   Error: ${error}`);
    }

    // Step 4: Retrieve and display conversion zones
    console.log("📍 Retrieving conversion zones...");
    
    try {
      const zones = await client.getConversionZones({ campaignId });
      console.log(`✅ Found ${zones.length} conversion zones:`);
      zones.forEach(zone => {
        console.log(`   - ${zone.name}: ${zone.attribution_window_days} day attribution window`);
      });
    } catch (error) {
      console.log("⚠️  Note: Conversion zone retrieval may not be available yet");
      console.log(`   Error: ${error}`);
    }

    // Step 5: Simulate waiting for attribution data (in real scenarios, this would be after campaign runs)
    console.log("⏳ Simulating campaign runtime for attribution data...");
    
    // In a real scenario, you would wait for actual campaign data
    // For this example, we'll just show how to retrieve the data
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 7 days ago
    const endDate = new Date().toISOString().split('T')[0]; // Today

    try {
      // Get store visit attribution data
      console.log("📊 Retrieving store visit attribution data...");
      const attributionData = await client.getStoreVisitAttribution({
        campaignId,
        startDate,
        endDate
      });
      
      console.log("✅ Store Visit Attribution Results:");
      console.log(`   - Total attributed visits: ${attributionData.total_attributed_visits}`);
      console.log(`   - Attribution window: ${attributionData.attribution_window_days} days`);
      console.log(`   - Date range: ${attributionData.date_range.start} to ${attributionData.date_range.end}`);
      
      attributionData.stores.forEach(store => {
        console.log(`   - ${store.geo_fence_name}:`);
        console.log(`     * Total visits: ${store.total_visits}`);
        console.log(`     * Attributed visits: ${store.attributed_visits}`);
        console.log(`     * Attribution rate: ${(store.attribution_rate * 100).toFixed(1)}%`);
        console.log(`     * Avg visit duration: ${store.average_visit_duration_minutes} minutes`);
      });
    } catch (error) {
      console.log("⚠️  Note: Store visit attribution may not be available yet");
      console.log(`   Error: ${error}`);
    }

    try {
      // Get store conversion metrics
      console.log("📈 Retrieving store conversion metrics...");
      const metrics = await client.getStoreConversionMetrics({ campaignId });
      
      console.log("✅ Store Conversion Metrics:");
      metrics.forEach(metric => {
        console.log(`   - ${metric.store_name}:`);
        console.log(`     * Total visits: ${metric.total_visits}`);
        console.log(`     * Unique visitors: ${metric.unique_visitors}`);
        console.log(`     * Attributed visits: ${metric.attributed_visits}`);
        console.log(`     * Attribution rate: ${(metric.attribution_rate * 100).toFixed(1)}%`);
        if (metric.roi) {
          console.log(`     * ROI: ${metric.roi}x`);
        }
      });
    } catch (error) {
      console.log("⚠️  Note: Store conversion metrics may not be available yet");
      console.log(`   Error: ${error}`);
    }

    console.log("🎉 Geo-Conversion Tracking Example Completed!");
    console.log("");
    console.log("📚 Next Steps:");
    console.log("1. Run your campaign with the created conversion zones");
    console.log("2. Monitor store visit attribution data over time");
    console.log("3. Optimize based on attribution performance");
    console.log("4. Scale to additional store locations");

  } catch (error) {
    console.error("❌ Error in geo-conversion example:", error);
  }
}

// Run the example if this file is executed directly
if (import.meta.main) {
  geoConversionExample().catch(console.error);
}

export { geoConversionExample };