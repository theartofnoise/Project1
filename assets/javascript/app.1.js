// Function lat to long
function codeAddress(strAddress, name, ) {
    geocoder.geocode( { 'address': strAddress}, function(results, status) {
      // Maker Custom 
      var image = 'assets/images/locationMarker.png'

      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            icon: image
        });
        var contentString = '<h1>'+name+'</h1>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCIxk_GgddtGnn6261x5W0YJwJfTixOrb4",
    authDomain: "beerville-40aec.firebaseapp.com",
    databaseURL: "https://beerville-40aec.firebaseio.com",
    projectId: "beerville-40aec",
    storageBucket: "beerville-40aec.appspot.com",
    messagingSenderId: "247160423496"
  };
  firebase.initializeApp(config);

database = firebase.database();

//Submit button on push Brewery Shop.
$("#submit").on("click", function(event){
    event.preventDefault();
    var name = $("#nameInput").val().trim();
    var address = $("#addressInput").val().trim();
    var city = $("#cityInput").val().trim();
    var zipCode = $("#zipCodeInput").val().trim();
    
    var breweries = {
        name: name,
        address: address,
        zipCode: zipCode,
        city: city
    }

    var key = database.ref().push(breweries).getKey();
    database.ref(key).update({key:key});

    console.log(breweries.name);
    console.log(breweries.address);
    console.log(breweries.city);
    console.log(breweries.zipCode);
    $("#resultBrewery").html(" <div class='card border-dark'><div class='card-heading bg-dark'><h4 class='card-title text-center'>Your bewery has been register <i class='far fa-check-circle'></i></h4></div><div class='card-body'><h5 id='nameBrewery' class='card-titleBewery'><i class='fas fa-user-circle'></i> "+breweries.name+"</h5><p id='addressBrewery' class='card-text'><i class='fas fa-map-pin'></i> "+breweries.address+"</p><span id='city' class='card-link'><i class='fas fa-city'></i> "+breweries.city+"</span><span id='zipcode' class='card-link'>ZipCode: "+breweries.zipCode+"</span></div>");
});
var addressAray = [];
var nameArray = []
// function if you want appear all breweries from your dataBase
    database.ref().on("child_added", function(childSnapshot) {    
    console.log(childSnapshot.val());
    
    var newRecord=childSnapshot.val();
    var name = newRecord.name;
    var city = newRecord.city;
    var zipCode = newRecord.zipCode;
    var address = newRecord.address;
    
    // concatenate
    var completeAdress = address +" "+ city+" "+ zipCode; 
    
    // push address inside my array 
    addressAray.push(completeAdress)
    nameArray.push(name)
    for (i = 0; i < addressAray.length; i++) {
        codeAddress(addressAray[i], nameArray[i]);
       console.log(nameArray[i]);
    }
    
    $(".breweryResults").append("<div class='card brewery-card'><div class='card-body'><h5 id='nameBrewery' class='card-titleBewery'><i class='fas fa-user-circle'></i> "+name+"</h5><p id='addressBrewery' class='card-text'><i class='fas fa-map-pin'></i> "+address+"</p><span id='city' class='card-link'><i class='fas fa-city'></i> "+city+"</span><span id='zipcode' class='card-link'>ZipCode: "+zipCode+"</span></div></div>");

    });

// API Brewery for all 
var queryURL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/breweries?&key=442d82061216d902ec97f9787c20dd1b';
$.ajax({
    url: queryURL,
    method: "GET",
}).then(function(response){
    console.log(response);
});

// API beer detail
$("#submitButtonTypes").on("click", function(){
    beer = $("#userInputTypes").val().trim();

    var queryURL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers?name=' + beer + '&key=442d82061216d902ec97f9787c20dd1b';
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response);
        var beer = response.data[0]; 
        $("#beerResults").html("<div class='card'><div class='card-header'><img class='resultImage' src="+ beer.labels.contentAwareMedium+" alt=''><h3>"+ beer.name+"</h3></div><div class='card-body'><h5>"+beer.style.name+"</h5><p class='card-text'>"+beer.description+"</p><a href='#' class='btn btn-warning'>Find location</a></div></div>")
    });
})


// Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
    var map, infoWindow;
    function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 25.767, lng: -80.203},
        zoom: 11
    });
    var currentImage = 'assets/images/here.png'

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var marker = new google.maps.Marker({
            map: map,
            position: pos,
            icon: currentImage
        });
        infoWindow.setPosition(pos);
        // infoWindow.setContent('Here you are.');
        infoWindow.open(map,marker);
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

    //more and less buttons for beer types
    function readMoreLess(x) {
        var dots = document.getElementById("dots"+x);
  var moreText = document.getElementById("more"+x);
  var btnText = document.getElementById("readMore"+x);
      
        if (dots.style.display === "none") {
          dots.style.display = "inline";
          btnText.innerHTML = "Read more"; 
          moreText.style.display = "none";
        } else {
          dots.style.display = "none";
          btnText.innerHTML = "Read less"; 
          moreText.style.display = "inline";
        }
      };
    
