const driver = {
    _origin: null,
    _control: null,
    _marker: null,
    available: Math.random() < 0.5,

    _route: function (origin, destination){
        if (this._origin != null && this._origin.lat == origin.lat && this._origin.lng == origin.lng != null)
            return;
        this._origin = origin
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
                map.removeControl(this._control)
            });
        });
        simulatePromise.then((polyline) => {
            var coordinateArray = polyline.getLatLngs(); 
            if (this._marker != null) {
                map.removeLayer(this._marker);  
            }
            var driverIco = L.icon({
                iconUrl: "./images/car.png",
                iconSize: [15, 15], // size of the icon
                popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
              });
            this._marker = L.Marker.movingMarker(coordinateArray, duration, {
                autostart: true,
                icon: driverIco
               
            });
            map.addLayer(this._marker);
            this._marker.on('end', () => {    
                document.dispatchEvent(new CustomEvent('driverarrived'));  
                      
                map.removeLayer(this.polyline)   
            });
        });
    },

    drive: function(origin, destination, duration=10000) {
        this._route(origin, destination)
        this._simulate(duration)
    }
}

