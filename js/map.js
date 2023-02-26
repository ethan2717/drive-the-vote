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
            ballotMarker.on('click', onMapClick);
        }
     }
});

map.locate({setView: true, maxZoom: 16});

map.on('locationfound', onLocationFound);

function onLocationFound(e) {
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(function(position) {
            currentLocation = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
        });
    } else {
        console.log("Geolocation is not available.");
    }
  
}

function onMapClick(e) {
    ballot = e.target;
    for (var i = 0; i < 5; i++) {
        var origin_lat = e.latlng.lat + (Math.random() - 0.5) / 50;
        var origin_lng = e.latlng.lng + (Math.random() - 0.5) / 50;
        var dest_lat = origin_lat + (Math.random() - 0.5) / 50;
        var dest_lng = origin_lng + (Math.random() - 0.5) / 50;
        volunteerDriver = {...driver}
        volunteerDriver.drive(L.latLng(origin_lat, origin_lng), L.latLng(dest_lat, dest_lng), 15000);
        drivers.splice(i, 0, volunteerDriver);
      }   
  }

function callDriver(){
    volunteerDriver = {...driver}
    var origin_lat = ballot.getLatLng().lat + (Math.random() - 0.5) / 150;
    var origin_lng = ballot.getLatLng().lng + (Math.random() - 0.5) / 150;
    volunteerDriver.drive(L.latLng(origin_lat, origin_lng), L.latLng(currentLocation.getLatLng().lat, currentLocation.getLatLng().lng));
    document.addEventListener('driverarrived', (e) => {
        if (e.detail.name == volunteerDriver.name) {
            volunteerDriver.drive(L.latLng(currentLocation.getLatLng().lat, currentLocation.getLatLng().lng), L.latLng(origin_lat, origin_lng), 25000);
        }
    });
}


