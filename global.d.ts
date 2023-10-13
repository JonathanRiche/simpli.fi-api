declare module "bun" {
    interface Env {
        APP_API_TOKEN: string;
        USER_API_KEY: string;
    }
}

declare global {

    type Coordinates = number[][];

    type CampaignRequest = {
        /** The name of the campaign. */
        name: string;
        /** The type of the campaign: 1 (Search), 2 (Contextual), 3 (Site Retargeting), 4 (IP Targeting), 5 (Geo Optimized). */
        campaign_type_id: 1 | 2 | 3 | 4 | 5;
        /** The start date of the campaign. */
        start_date: string;
        /** The end date of the campaign. */
        end_date: string;
        /** The ID of the bid type. */
        bid_type_id: number;
        /** The bid amount. */
        bid: number;
        /** The daily budget for the campaign. */
        daily_budget: number;
        /** The total budget for the campaign. */
        total_budget: number;
        /** The impression cap for the campaign. */
        impression_cap: number;
        /** The pacing value. */
        pacing: number;
        /** Indicates if automated pacing is enabled. */
        automated_pacing_enabled: boolean;
        /** The viewability setting (optional). */
        viewability?: "Good" | "Better" | "Best" | null;
        /** Frequency capping settings (optional). */
        frequency_capping?: {
            /** Number of times to show an ad. */
            how_many_times: number;
            /** Time frame for frequency capping. */
            hours: number;
        };
        /** The OBA provider ID. */
        oba_provider_id: number;
        /** The media type ID. */
        media_type_id: number;
        /** Segment match type (optional). */
        segment_match_type?: "all" | "any";
        /** Indicates if auto optimization is enabled. */
        auto_optimize: boolean;
        /** Click attribution window. */
        click_attribution_window: number;
        /** View attribution window. */
        view_attribution_window: number;
        /** Indicates if organization blocklist opt-out is enabled. */
        org_blocklist_opt_out: boolean;
        /** The ID of the ad placement. */
        ad_placement_id: number;
        /** Week dayparting settings (optional). */
        week_dayparting?: number[][];
        /** Postal code settings (optional). */
        postal_codes?: {
            /** The postal code. */
            postal_code: string;
            /** The country code. */
            country_code: string;
        }[];
        /** List of geo targets (optional). */
        geo_targets?: string[];
        /** List of third-party segments (optional). */
        third_party_segments?: number[];
        /** List of first-party segments (optional). */
        first_party_segments?: number[];
        /** List of deals (optional). */
        deals?: number[];
        /** Campaign goal settings (optional). */
        campaign_goal?: {
            /** Type of campaign goal. */
            goal_type: string;
            /** Value of the campaign goal. */
            goal_value: number;
        };
    };

    /**
     * Represents a campaign object.
     */
    type Campaign = {
        /** Campaign ID */
        campaign_id?: number;
        /** Campaign name */
        campaign_name: string;
        /** Start date for the campaign */
        start_date: string;
        /** End date for the campaign */
        end_date: string;
        /** Budget allocated for the campaign */
        budget: number;
        /** Campaign type (1: Search, 2: Contextual, 3: Site Retargeting, 4: IP Targeting, 5: Geo Optimized) */
        campaign_type_id: 1 | 2 | 3 | 4 | 5;
        /** List of targeting options for the campaign */
        targeting_options: string[];
        /** Bid strategy for the campaign */
        bid_strategy: string;
        /** Daily budget for the campaign */
        daily_budget?: number;
        /** Ad schedule for the campaign */
        ad_schedule?: {
            start_time: string;
            end_time: string;
            days: string[];
        }[];
        /** Geographic targeting settings for the campaign */
        geo_targets?: {
            geo_target_id: number;
            radius: number;
        }[];
        /** Language targeting for the campaign */
        language_targets?: string[];
        /** Other campaign-specific properties */
        // Add more properties as needed
    }

    /**
     * Geo Fence object.
     */
    type GeoFence = {
        name: string; // Required
        bid_area: {
            type: 'Polygon'; // Fixed value
            coordinates: number[][]; // Always in the format of number[][]
        };
        geo_fencing_recency_id?: number; // Optional
    };

}

export { };