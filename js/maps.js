var map = L.map("map", {
    center: [42.35532753176672, -71.06532863539319],
    zoom: 13,
}).setView([42.35532753176672, -71.06532863539319], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

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



function onMapClick(e) {
    volunteerDriver = {...driver}
    var lat = e.latlng.lat + (Math.random() - 0.5) / 100;
    var lng = e.latlng.lng + (Math.random() - 0.5) / 100;
    volunteerDriver.drive(L.latLng(lat, lng), L.latLng((lat + (Math.random() - 0.5) / 150), (lng + (Math.random() - 0.5) / 150)), 30000);  
  }
  

// define a function to handle the location found event
function onLocationFound(e) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

// Circle ranges

// North End
L.circle([42.364875718764935, -71.05748723613675], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 600,
}).addTo(map);

// South End
L.circle([42.34674940884878, -71.07475632508151], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 600,
}).addTo(map);

// South Boston
L.circle([42.33852674540022, -71.05110391975197], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 600,
}).addTo(map);

// Driver icon class
var DriverIcon = L.Icon.extend({
  options: {
    iconUrl: "./images/driver-1.png",
    iconSize: [70, 70], // size of the icon
  },
});

// Driver icon objects
var northDriver = new DriverIcon({}),
  southDriver = new DriverIcon({}),
  southEndDriver = new DriverIcon({});

// Display driver objects on map
L.marker([42.364875718764935, -71.05748723613675], { icon: northDriver })
  .addTo(map)
  .bindPopup("130 Endicott St, Boston, MA 02113");
L.marker([42.33852674540022, -71.05110391975197], { icon: southDriver })
  .addTo(map)
  .bindPopup("245 D St, South Boston, MA 02127");
L.marker([42.34674940884878, -71.07475632508151], { icon: southDriver })
  .addTo(map)
  .bindPopup("303 Columbus Ave, Boston, MA 02116");

// Driver Custom Image Icon
var driverIco = L.icon({
  iconUrl: "./images/driver-1.png",
  iconSize: [70, 70], // size of the icon
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

L.marker([42.364875718764935, -71.05748723613675], { icon: driverIco }).addTo(
  map
);

