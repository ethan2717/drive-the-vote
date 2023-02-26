async function addGeoJson() {
    const response = await fetch("/lib/geojson/Polling_Locations.geojson");
    const data = await response.json();
    L.geoJson(data).addTo(map);
}


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);





// Circle ranges
var circle = L.circle([42.364875718764935, -71.05748723613675], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 600
}).addTo(map);

// Volunteer Driver - Casa Maria (North End)
// var driver_loc = L.marker([42.364875718764935, -71.05748723613675]).addTo(map);

var DriverIcon = L.Icon.extend({
    options: {
        iconUrl: './images/driver-1.png',
        iconSize:     [70, 70], // size of the icon
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    }
});

var northDriver = new northDriver({iconUrl: './images/driver-1.png'}),
    southDriver = new southDriver({iconUrl: './images/driver-1.png'});


// Driver Custom Image Icon
var driverIco = L.icon({
    iconUrl: './images/driver-1.png',
    iconSize:     [70, 70], // size of the icon
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([42.364875718764935, -71.05748723613675], {icon: driver}).addTo(map);


/*

*/