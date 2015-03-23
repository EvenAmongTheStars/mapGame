/**
 * Purpose: ask the browser for the user's location (html5)
 * Preconditions: html5 is enabled on the browser
 * Postconditions: map initialized with user's position if browser is html5 enabled and position given
 **/
var olat;
var olng;

function getLocation() {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(initMap);
    else
        alert("Geolocation is not supported by this browser.");
}

/**
 * Purpose: start the google map
 * Preconditions: position object
 * Postconditions: map centered around the user's position with a zoom of 15
 **/
function initMap(position) {
    olat = position.coords.latitude;
    olng = position.coords.longitude;
    console.log('Your position is:', position.coords.latitude, position.coords.longitude);

    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    setMarker(map, position, "You!", "You Are Here");
}

/**
 * Purpose: set a marker on a map
 * Preconditions: map reference, position, title of the marker window, message in the marker window
 * Postconditions: marker event listener added to the map
 **/
function setMarker(map, position, title, message) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: 'http://www.heathersanimations.com/aliens/alien00069.gif',
        optimized: false
    });

    marker.setTitle(title);

    var infowindow = new google.maps.InfoWindow({
        content: message
    });

    google.maps.event.addListener(map, 'click', function(e) {
        var dlatLng = e.latLng;
        var dlat = dlatLng.lat();
        var dlng = dlatLng.lng();
        // alert(dlat,dlng);
        var counter = 0;
        var pos;
        interval = window.setInterval(function() {
        
            counter++;
            // just pretend you were doing a real calculation of
            // new position along the complex path
            var movelat = dlat - olat;
            var movelng = dlng - olng;
            pos = new google.maps.LatLng(olat + (movelat / 100), olng + (movelng / 100));
            marker.setPosition(pos);
            if (counter >= 1000) {
                window.clearInterval(interval);
            }
            if(counter )
            console.log(pos);
        }, 10);
    });



}

google.maps.event.addDomListener(window, 'load', getLocation);