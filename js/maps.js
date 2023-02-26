var map = L.map("map").setView([42.35532753176672, -71.06532863539319], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

const driver = {
    origin: L.latLng(0,0),
    destination: L.latLng(0,0),
    available: true,
    control: null,
    marker: null,
    simulate : function (){
        
        if (this.control != null){
            map.removeControl(this.control);
            this.control = null;
        }
        this.control = L.Routing.control({
            waypoints: [this.origin, this.destination],
            draggableWaypoints: false,
            addWaypoints: false,
          
            createMarker: function(i, waypoint, n) {
                return null;
            }
        })
        this.control.addTo(map);
        this.control.hide();

        let polylinePromise = new Promise((resolve, reject) => {
            this.control.on('routeselected', (e) => {
                let route = e.route;
                let polylineCoords = route.coordinates;
                let polyline = L.polyline(polylineCoords).addTo(map);
                polyline.setStyle({
                    color: 'blue'
                });
                resolve(polyline);
            });
        });

        polylinePromise.then((polyline) => {
            var coordinateArray = polyline.getLatLngs();
            var myMovingMarker = L.Marker.movingMarker(coordinateArray, 6000, {
                autostart: false
            });
            map.addLayer(myMovingMarker);
            myMovingMarker.start();
           
        });
        
         
    },


}

const newDriver = {...driver, origin: L.latLng(42.35532753176672, -71.06532863539319), destination: L.latLng(42.33727616231241, -71.09772940232675)}

newDriver.simulate();


async function addGeoJson() {
  const response = await fetch("/lib/geojson/Polling_Locations.geojson");
  const data = await response.json();
  L.geoJson(data).addTo(map);
}


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
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
L.circle([42.33893940650811, -71.04993466199063], {
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
// Driver Custom Image Icon
var driverIco = L.icon({
    iconUrl: './images/driver-1.png',
    iconSize:     [70, 70], // size of the icon
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([42.364875718764935, -71.05748723613675], {icon: driverIco}).addTo(map);


/*

*/
