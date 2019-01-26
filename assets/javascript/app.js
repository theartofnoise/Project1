// Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
    var map, infoWindow;
    function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 25.767, lng: -80.203},
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Here you are.');
        infoWindow.open(map);
        map.setCenter(pos);
        }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
    }

// API Brewery for input
$("#submitButton").on("click", function(){
    beer = $("#userInput").val().trim();

    var queryURL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers?name=' + beer + '&key=442d82061216d902ec97f9787c20dd1b';
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response);
    });
})

// API Brewery for all 
var queryURL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers?&key=442d82061216d902ec97f9787c20dd1b';
$.ajax({
    url: queryURL,
    method: "GET",
}).then(function(response){
    console.log(response);
});
