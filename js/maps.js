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
  


async function addGeoJson() {
    const response = await fetch("/lib/geojson/Polling_Locations.geojson");
    const data = await response.json();
    L.geoJson(data).addTo(map);
}


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);





// Circle ranges
var circle = L.circle([42.364875718764935, -71.05748723613675], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 600
}).addTo(map);

// Volunteer Driver - Casa Maria (North End)
// var driver_loc = L.marker([42.364875718764935, -71.05748723613675]).addTo(map);

var DriverIcon = L.Icon.extend({
    options: {
        iconUrl: './images/driver-1.png',
        iconSize:     [70, 70], // size of the icon
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    }
});

var northDriver = new northDriver({iconUrl: './images/driver-1.png'}),
    southDriver = new southDriver({iconUrl: './images/driver-1.png'});


// Driver Custom Image Icon
var driverIco = L.icon({
    iconUrl: './images/driver-1.png',
    iconSize:     [70, 70], // size of the icon
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([42.364875718764935, -71.05748723613675], {icon: driver}).addTo(map);


/*

*/