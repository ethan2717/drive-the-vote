var map = L.map("map").setView([42.35532753176672, -71.06532863539319], 13);




L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

async function addGeoJson() {
  const response = await fetch("/lib/geojson/Polling_Locations.geojson");
  const data = await response.json();
  L.geoJson(data).addTo(map);
}

addGeoJson();

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

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

