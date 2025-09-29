import { BaseURL, type RequestHeaders } from "../defaults";

const eventEndpoint = (orgId: string) => `${BaseURL}${orgId}/events`;
const eventByIdEndpoint = (eventId: number) => `https://app.simpli.fi/api/events/${eventId}`;

type Coordinate = [number, number];

export interface EventTargetCriterion {
    type: "GeoFence";
    criterion: {
        id?: number;
        name: string;
        bid_area: {
            type: "Polygon";
            coordinates: Coordinate[][];
        };
        geo_fence_type_name?: "Event";
    };
    flights: {
        start_at: string;
        end_at: string;
    }[];
}

export interface EventTarget {
    resource: string;
    id: number;
    name: string;
    user_count?: number;
    days_inactive?: number;
    active: boolean;
    organization_id: number;
    criteria: EventTargetCriterion[];
}

export interface EventTargetResponse {
    events: EventTarget[];
    paging?: {
        page: number;
        size: number;
        total: number;
        next?: string;
    };
}

export interface EventTargetCreateParams {
    name: string;
    criteria: EventTargetCriterion[];
}

export interface EventTargetUpdateParams {
    name?: string;
    criteria?: EventTargetCriterion[];
}

export type EventTargetUpdateMethod = "add" | "replace";

export async function listEventTargets(orgId: string, headers: RequestHeaders): Promise<EventTargetResponse> {
    const response = await fetch(eventEndpoint(orgId), {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve event targets', { cause: await response.text() });
    }
    return response.json() as Promise<EventTargetResponse>;
}

export async function getEventTarget(eventId: number, headers: RequestHeaders): Promise<EventTarget> {
    const response = await fetch(eventByIdEndpoint(eventId), {
        method: "GET",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve event target', { cause: await response.text() });
    }
    const data = await response.json() as EventTargetResponse;
    return data.events[0];
}

export async function createEventTarget(orgId: string, eventData: EventTargetCreateParams, headers: RequestHeaders): Promise<EventTarget> {
    const response = await fetch(eventEndpoint(orgId), {
        method: "POST",
        headers,
        body: JSON.stringify({ event: eventData })
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create event target: ${response.status} ${response.statusText} - ${errorText}`);
    }
    const data = await response.json() as EventTargetResponse;
    return data.events[0];
}

export async function updateEventTarget(
    eventId: number,
    eventData: EventTargetUpdateParams,
    method: EventTargetUpdateMethod = "replace",
    headers: RequestHeaders
): Promise<EventTarget> {
    const url = `${eventByIdEndpoint(eventId)}?method=${method}`;
    const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify({ event: eventData })
    });
    if (!response.ok) {
        throw new Error('Failed to update event target', { cause: await response.text() });
    }
    const data = await response.json() as EventTargetResponse;
    return data.events[0];
}

export async function deleteEventTarget(eventId: number, headers: RequestHeaders): Promise<void> {
    const response = await fetch(eventByIdEndpoint(eventId), {
        method: "DELETE",
        headers
    });
    if (!response.ok) {
        throw new Error('Failed to delete event target', { cause: await response.text() });
    }
}