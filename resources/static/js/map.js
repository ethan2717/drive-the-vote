var map = L.map("map", {
    center: [42.35532753176672, -71.06532863539319],
    zoom: 13,
}).setView([42.35532753176672, -71.06532863539319], 13);

var drivers = [];
var ballot = null;
var currentLocation;

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);


fetch('/lib/geojson/Polling_Locations.geojson')
.then((response) => response.json())
.then((json) => {
    var ballotIco = L.icon({
        iconUrl: "./images/voting-box.png",
        iconSize: [25, 25], // size of the icon
        popupAnchor: [0, -10],
      });
    for (var i=0; i < json.features.length; i++) {
        let feature = json.features[i];
        if (feature.geometry != null) {
            let coordinates = feature.geometry.coordinates;
            let ballotMarker = L.marker([coordinates[1], coordinates[0]], {
                icon: ballotIco
            }).addTo(map);
            ballotMarker.bindPopup(`
            <p>`+ feature.properties.Location2 + `</p>
            <p>`+ feature.properties.Location3 + `</p>
            <p>`+ (feature.properties.Voting_Room || " ") + `</p>
            `).openPopup();
            ballotMarker.on('click', (e) => {
                ballot = e.target;  
            });
        }
     }
});

/*
//Approxiate current location.
map.locate({maxZoom: 16});

map.on('locationfound', (e) => {
    currentLocation = L.marker(e.latlng).addTo(map);
    currentLocation.bindPopup("You are approximately here!").openPopup();
});
*/

currentLocation = L.marker([42.35003187356235, -71.10328374633661]).addTo(map);
currentLocation.bindPopup("You are approximately here!").openPopup();

function locateDrivers(){
    var currentCenter = map.getCenter();
    var currentZoom = map.getZoom();
    for (var i = 0; i < 5; i++) {   
      
        let origin_lat = ballot.getLatLng().lat + (Math.random() - 0.5) / 50;
        var origin_lng = ballot.getLatLng().lng + (Math.random() - 0.5) / 50;
        var dest_lat = origin_lat + (Math.random() - 0.5) / 50;
        var dest_lng = origin_lng + (Math.random() - 0.5) / 50;
        volunteerDriver = {...driver}
        volunteerDriver.drive(L.latLng(origin_lat, origin_lng), L.latLng(dest_lat, dest_lng));
        drivers.splice(i, 0, volunteerDriver);
    } 
    setTimeout(() => {
        map.setView(currentCenter, currentZoom);
      }, 3000)
   
}

function requestDriver(){
    volunteerDriver = {...driver}
    var origin_lat = ballot.getLatLng().lat + (Math.random() - 0.5) / 150;
    var origin_lng = ballot.getLatLng().lng + (Math.random() - 0.5) / 150;
    volunteerDriver.drive(L.latLng(origin_lat, origin_lng), L.latLng(currentLocation.getLatLng().lat, currentLocation.getLatLng().lng), true);
    document.addEventListener('driverarrived', (e) => {
        if (e.detail.name == volunteerDriver.name) {
            volunteerDriver.drive(L.latLng(currentLocation.getLatLng().lat, currentLocation.getLatLng().lng), L.latLng(ballot.getLatLng().lat, ballot.getLatLng().lng), true);
        }
    });
}


