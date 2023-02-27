
//driver.js handles the mapping, movement and identity of an individual driver. 


var names = ['Sophia', 'Ethan', 'Ava', 'Jackson', 'Olivia', 'Aiden', 'Emma', 'Lucas', 'Mia', 'Liam'];
var services = ["Uber", "Lyft", "Taxi", "Volunteer"]
var cars = ['SUV', 'Sedan', 'Coupe', 'Hatchback', 'Convertible', 'Pickup Truck', 'Sports Car', 'Minivan', 'Station Wagon', 'Electric Car'];
var licensePlates = ['ABCD-123', 'GHIJ-456', 'MNOP-789', 'WXYZ-321', 'JKL-654', 'VWX-987', 'STU-246', 'DEF-135', 'PQR-680', 'LMN-925'];

const driver = {
    _origin: null,
    _control: null,
    _marker: null,
    onArrival : function () {
        console.warn("onArrival() not implemented for driver.");
    },

    _route: function(origin, destination) {
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

    _simulate: function(path = false, duration) {
        var simulatePromise = new Promise((resolve, reject) => {
            this._control.on('routeselected', (e) => {
                var route = e.route;
                var polylineCoords = route.coordinates;
                var polyline = L.polyline(polylineCoords)
                resolve(polyline);
                if (!path)
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
                iconSize: [20, 20],
                popupAnchor: [0, -10],
            });
            this._marker = L.Marker.movingMarker(coordinateArray, duration, {
                autostart: true,
                icon: driverIco,
                autoCenter: false
            });
            this._marker.on('end', () => {
                map.removeLayer(this._marker)
                if (path)
                    map.removeControl(this._control)
                this.onArrival();
            });
            this._marker.bindPopup(`
            Rideshare Service: ` + services[Math.floor(Math.random() * services.length)] + ` <br>
            Name: ` + names[Math.floor(Math.random() * names.length)] + `<br>
            Car: ` + cars[Math.floor(Math.random() * cars.length)] + `<br>
            License Plate: ` + licensePlates[Math.floor(Math.random() * licensePlates.length)] + `<br>
            `).openPopup();
            this._marker.addTo(map);
        });
    },

    drive: function(origin, destination, path = false, duration = 15000) {
        this._route(origin, destination)
        this._simulate(path, duration)
    },
}