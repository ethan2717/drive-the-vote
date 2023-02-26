var map = L.map('map').setView([42.35532753176672, -71.06532863539319], 13);

const driver = {
    _control: null,
    _marker: null,
    _route: function (origin, destination){
        this._control = L.Routing.control({
            waypoints: [origin, destination],
            draggableWaypoints: false,
            addWaypoints: false,
            createMarker: function(i, waypoint, n) {
                return null;
            }
        })
        this._control.addTo(map);
        this._control.hide();
    },
    _simulate : function (duration){
        let simulatePromise = new Promise((resolve, reject) => {
            this._control.on('routeselected', (e) => {     
                let route = e.route;
                let polylineCoords = route.coordinates;
                let polyline = L.polyline(polylineCoords)
                resolve(polyline);
                map.removeControl(this.control);
            });
        });
        simulatePromise.then((polyline) => {
            var coordinateArray = polyline.getLatLngs(); 
            if (this._marker != null)
                map.removeLayer(this._marker);   
            this._marker = L.Marker.movingMarker(coordinateArray, duration, {
                autostart: true
            });
            map.addLayer(this._marker);
            this._marker.on('end', () => {
                map.removeLayer(polyline);       
                document.dispatchEvent(new CustomEvent('driverarrived'));     
            });
        });
    },
    drive: function(origin, destination, duration=10000) {
        this._route(origin, destination)
        this._simulate(duration)
    }
}

const newDriver = {...driver}


newDriver.drive(L.latLng(42.35532753176672, -71.06532863539319), L.latLng(42.33727616231241, -71.09772940232675));
document.addEventListener('driverarrived', () => {
    newDriver.drive(L.latLng(42.33727616231241, -71.09772940232675), L.latLng(42.35532753176672, -71.06532863539319));

});
  