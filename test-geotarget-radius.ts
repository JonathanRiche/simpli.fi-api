import { SimplifiClient } from './src/index';

const client = new SimplifiClient({
    appApiKey: process.env.APP_API_TOKEN,
    userApiKey: process.env.USER_API_KEY,
});

console.log('🎯 Querying geo targets by radius');
console.log('   Location: Haight Carpet & Interiors');
console.log('   RC: RC0005596');
console.log('   Coordinates: 47.7641209, -122.1511705');
console.log('   Radius: 25 miles\n');

console.log('🔍 Debug: Creating SimplifiClient...');
console.log('🔍 Debug: Calling queryGeoTargetsByRadius with params:', {
    latitude: 47.7641209,
    longitude: -122.1511705,
    radius: 25,
});

try {
    const result = await client.queryGeoTargetsByRadius({
        latitude: 47.7641209,
        longitude: -122.1511705,
        radius: 25
    });
    
    console.log('✅ API call succeeded!');
    console.log(`📍 Found ${result.length} geo targets within 25 miles\n`);
    
    if (result.length > 0) {
        console.log('First 5 results:');
        result.slice(0, 5).forEach((target, index) => {
            console.log(`${index + 1}. ${target.name} (ID: ${target.id}, Active: ${target.active})`);
        });
    }
} catch (error: any) {
    console.error('❌ API call failed with error:', error.message);
    if (error.cause) {
        console.error('📄 Response body:', error.cause);
    }
    throw error;
}
