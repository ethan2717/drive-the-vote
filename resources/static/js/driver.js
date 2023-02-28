
//driver.js handles the mapping, movement and identity of an individual driver. 

var names = ['Sophia', 'Ethan', 'Ava', 'Jackson', 'Olivia', 'Aiden', 'Emma', 'Lucas', 'Mia', 'Liam'];
var services = ["Uber", "Lyft", "Taxi", "Volunteer"]
var cars = ['SUV', 'Sedan', 'Coupe', 'Hatchback', 'Convertible', 'Pickup Truck', 'Sports Car', 'Minivan', 'Station Wagon', 'Electric Car'];
var licensePlates = ['ABCD-123', 'GHIJ-456', 'MNOP-789', 'WXYZ-321', 'JKL-654', 'VWX-987', 'STU-246', 'DEF-135', 'PQR-680', 'LMN-925'];

const driver = {
    _origin: null,
    _control: null,
    _marker: null,
    hasPassenger: false,
    onArrival : function () {console.warn("Driver has arrived, however onArrival() is not implemented.")},

    /**
     * Generates the route that the driver will use to travel.
     * @param {LatLng} origin - Driver origin coordinates
     * @param {LatLng} destination - Driver destination coordinates.
     */
    _route: function(origin, destination) {
        if (this._origin != null && this._origin.lat == origin.lat && this._origin.lng == origin.lng != null)
            return;
        this._origin = origin
        /*
        L.Routing extends the L.Control class that provides a standard 
        interface for adding and removing controls from a Leaflet map. 
        In this instance, the L.Routing control creates a route and 
        visible navigation line from point from point A to B.
        */
        this._control = L.Routing.control({
            waypoints: [origin, destination],
            draggableWaypoints: false,
            addWaypoints: false,
            createMarker: function(i, waypoint, n) { 
                return null; //Removes default markers created on route generation. 
            } 
        })
        this._control.addTo(map); //The control is added to the map, which will add a visible navigation line once the route is calclated.
        this._control.hide();  //Hides directions GUI created on route generation.
    },

    /**
     * Simulates the driver travelling.
     * @param {boolean} path - Toggle routing control's navigation path.
     * @param {number} duration - Specifies the duration of travel in milliseconds
     */
    _simulate: function(path = false, duration) {
        //The routeselected event is dispatched once navigation coordinates are calculated by the routing control.
        this._control.on('routeselected', (e) => { 
            var coordinates = e.route.coordinates; //Routing control's calculated coordinates. Now the routing control can be removed without error.
            if (!path) { map.removeControl(this._control) } //Removes visible navigation line if path is set to false.
            var driverIco = L.icon({ //Vehicle marker icon.
                iconUrl: "./images/car.png",
                iconSize: [20, 20],
                popupAnchor: [0, -10],
            });
            /*
            L.Marker.movingMarker extends the L.Marker class that provides
            an animated marker that moves along a path on the map. The duration
            paramater determines the amount of time it takes for the marker to
            travel from point A to B. In this instance, the vehicle marker moves
            along the path created by the routing control.
            */
            this._marker = L.Marker.movingMarker(coordinates, duration, { //
                autostart: true,
                icon: driverIco,
                autoCenter: false
            });
            this._marker.on('end', () => {
                map.removeLayer(this._marker) // Remove vehicle marker on driver arrival.
                if (path)
                    map.removeControl(this._control) //Remove visible navigiation line on driver arrival.
                this.onArrival();
            });
            
            this._marker.bindPopup(`
            Rideshare Service: ` + services[Math.floor(Math.random() * services.length)] + ` <br>
            Name: ` + names[Math.floor(Math.random() * names.length)] + `<br>
            Car: ` + cars[Math.floor(Math.random() * cars.length)] + `<br>
            License Plate: ` + licensePlates[Math.floor(Math.random() * licensePlates.length)] + `<br>
            Has Passanger: ` + this.hasPassenger + `<br>
            `);
            this._marker.addTo(map);       
        });
    },

    drive: function(origin, destination, path = false, hasPassenger=Math.random() > 0.5, duration = 15000) {
        this.hasPassenger = hasPassenger
        this._route(origin, destination)
        this._simulate(path, duration)
    },
}