// Default map configuration.
const defaultMapView = { lat: 37.0, lng: 13.0, zoom: 8 };

// Persisted browser state for the web UI.
const mapViewStorageKey = 'dump1090.mapView';

/**
 * Loads the persisted map view from local storage.
 *
 * @returns {{lat: number, lng: number, zoom: number}}
 */
export function loadMapView() {
    try {
        const storedView = localStorage.getItem(mapViewStorageKey);
        if (!storedView) return defaultMapView;

        const parsedView = JSON.parse(storedView);
        const lat = Number(parsedView?.lat);
        const lng = Number(parsedView?.lng);
        const zoom = Number(parsedView?.zoom);
        const hasValidCoords = Number.isFinite(lat) && Number.isFinite(lng);
        const hasValidZoom = Number.isFinite(zoom);

        if (!hasValidCoords || !hasValidZoom) return defaultMapView;

        return { lat, lng, zoom };
    } catch (error) {
        console.warn('Error loading saved map view:', error);
        return defaultMapView;
    }
}

/**
 * Persists the current map center and zoom level.
 *
 * @param {L.Map} map
 * @returns {void}
 */
export function saveMapView(map) {
    try {
        const center = map.getCenter();
        localStorage.setItem(mapViewStorageKey, JSON.stringify({
            lat: center.lat,
            lng: center.lng,
            zoom: map.getZoom()
        }));
    } catch (error) {
        console.warn('Error saving map view:', error);
    }
}
