var names = ['Sophia', 'Ethan', 'Ava', 'Jackson', 'Olivia', 'Aiden', 'Emma', 'Lucas', 'Mia', 'Liam'];
var services = ["Uber", "Lyft", "Taxi", "Volunteer"]
var cars = ['SUV', 'Sedan', 'Coupe', 'Hatchback', 'Convertible', 'Pickup Truck', 'Sports Car', 'Minivan', 'Station Wagon', 'Electric Car'];
var licensePlates = ['ABCD-123', 'GHIJ-456', 'MNOP-789', 'WXYZ-321', 'JKL-654', 'VWX-987', 'STU-246', 'DEF-135', 'PQR-680', 'LMN-925'];

const driver = {
    _origin: null,
    _control: null,
    _marker: null,
    service: "",
    name: "",
    car: "",
    licensePlate: "",

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

    _simulate : function (path=false, duration){
        let simulatePromise = new Promise((resolve, reject) => {
            this._control.on('routeselected', (e) => {     
                let route = e.route;
                let polylineCoords = route.coordinates;
                let polyline = L.polyline(polylineCoords)
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
                document.dispatchEvent(new CustomEvent('driverarrived', {detail: {name: this.name}}));     
            });
            //Localize
            if (this.name == "" && this.service == ""){
                this.name = names[Math.floor(Math.random() * names.length)]
                this.service = services[Math.floor(Math.random() * services.length)]
                this.car = cars[Math.floor(Math.random() * cars.length)]
                this.licensePlate = licensePlates[Math.floor(Math.random() * licensePlates.length)]
            }
            this._marker.bindPopup(`
            Rideshare Service: `+ this.service + ` <br>
            Name: `+ this.name + `<br>
            Car: `+ this.car + `<br>
            License Plate: `+ this.licensePlate + `<br>
            
            `).openPopup();
            this._marker.addTo(map);
        });
    },

    drive: function(origin, destination, path=false, duration=15000) {
        this._route(origin, destination)
        this._simulate(path, duration)
    },
}

