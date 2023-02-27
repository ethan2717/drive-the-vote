//map.js handles the map, placement of ballot locations, and drivers.

var currentLocation;
var ballot = null;
var map = L.map("map", {
    center: [42.35532753176672, -71.06532863539319],
    zoom: 13,
}).setView([42.35532753176672, -71.06532863539319], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

//Retreives polling locations from dataset
fetch('/geojson/Polling_Locations.geojson')
.then((response) => response.json())
.then((json) => {
    var ballotIco = L.icon({ //Ballot icon.
        iconUrl: "./images/voting-box.png",
        iconSize: [25, 25],
        popupAnchor: [0, -10],
      });
    for (var i=0; i < json.features.length; i++) {  //Ballot markers are created for each polling location in dataset.
        var feature = json.features[i];
        if (feature.geometry != null) {
            var coordinates = feature.geometry.coordinates;
            var ballotMarker = L.marker([coordinates[1], coordinates[0]], {
                icon: ballotIco
            }).addTo(map);
            ballotMarker.bindPopup(`
            <p>`+ feature.properties.Location2 + `</p>
            <p>`+ feature.properties.Location3 + `</p>
            <p>`+ (feature.properties.Voting_Room || " ") + `</p>
            `)
            ballotMarker.on('click', (e) => { ballot = e.target; });
        }
     }
});

//Hackathon event location. 
currentLocation = L.marker([42.35003187356235, -71.10328374633661], {
    draggable:'true'
}).addTo(map);
currentLocation.bindPopup("You are here! (I am draggable)");

//Generates nearby drivers who are available to volunteer.
function locateDrivers(){
    var currentCenter = map.getCenter();
    var currentZoom = map.getZoom();
    for (var i = 0; i < 5; i++) {   
        //Retreives random nearby location.
        var origin_lat = currentLocation.getLatLng().lat + (Math.random() - 0.5) / 50;
        var origin_lng = currentLocation.getLatLng().lng + (Math.random() - 0.5) / 50;
        //Retreives random nearby destination derived from random origin location.
        var dest_lat = origin_lat + (Math.random() - 0.5) / 50;
        var dest_lng = origin_lng + (Math.random() - 0.5) / 50;
        var volunteerDriver = {...driver} 
        volunteerDriver.drive(L.latLng(origin_lat, origin_lng), L.latLng(dest_lat, dest_lng));
    } 
    setTimeout(() => {  //Reset map view to original position as the map pans to each generated driver.
        map.setView(currentCenter, currentZoom);
      }, 3000)
}

//Generates a nearby driver that will drive to your current location, then to a selected ballot.
function requestDriver(){
    if (ballot == null) {
        alert("No ballot selected!")
    }
    var volunteerDriver = {...driver}
    var origin_lat = currentLocation.getLatLng().lat + (Math.random() - 0.5) / 50;
    var origin_lng = currentLocation.getLatLng().lng + (Math.random() - 0.5) / 50;
    volunteerDriver.drive(L.latLng(origin_lat, origin_lng), L.latLng(currentLocation.getLatLng().lat, currentLocation.getLatLng().lng), true);
    volunteerDriver.onArrival = function() {
        volunteerDriver.drive(L.latLng(currentLocation.getLatLng().lat, currentLocation.getLatLng().lng), L.latLng(ballot.getLatLng().lat, ballot.getLatLng().lng), true);
    }
}
