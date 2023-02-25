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

// Circle ranges
var circle = L.circle([42.364875718764935, -71.05748723613675], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 600
}).addTo(map);

// Volunteer Driver - Casa Maria (North End)
// var driver_loc = L.marker([42.364875718764935, -71.05748723613675]).addTo(map);


// Driver Custom Image Icon
var driver = L.icon({
    iconUrl: './images/driver-1.png',
    iconSize:     [70, 70], // size of the icon
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([42.364875718764935, -71.05748723613675], {icon: driver}).addTo(map);


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


