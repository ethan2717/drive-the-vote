var map = L.map('map').setView([42.35532753176672, -71.06532863539319], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);



async function addGeoJson() {
    const response = await fetch("/lib/geojson/Polling_Locations.geojson");
    const data = await response.json();
    L.geoJson(data).addTo(map);
}

addGeoJson();

/*
Mapping
L.Routing.control({
    waypoints: [
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949)
    ],
    routeWhileDragging: true
}).addTo(map);
*/


