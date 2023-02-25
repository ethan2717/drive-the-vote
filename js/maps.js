var map = L.map('map').setView([42.35532753176672, -71.06532863539319], 13);

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





/*

*/