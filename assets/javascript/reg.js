// Initialize Firebase  (changed to new)
var config = {
    apiKey: "AIzaSyDvCXFCipOcB5dXVGyDu0VXTA71_Gc14z0",
    authDomain: "beerville-70847.firebaseapp.com",
    databaseURL: "https://beerville-70847.firebaseio.com",
    projectId: "beerville-70847",
    storageBucket: "beerville-70847.appspot.com",
    messagingSenderId: "182244955437"
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
        
    if (name==""||address==""||city==""||zipCode=="") {
        return false;
      }

    else{
    var breweries = {
        name: name,
        address: address,
        zipCode: zipCode,
        city: city
    }
    // pushing each brewery under breweries in db
    var key = database.ref("brewery/").push(breweries).getKey();
    database.ref("brewery/"+key).update({key:key});

    console.log(breweries.name);
    console.log(breweries.address);
    console.log(breweries.city);
    console.log(breweries.zipCode);
    $("#resultBrewery").html(" <div class='card border-dark'><div class='card-heading bg-dark'><h4 class='card-title text-center'>Your bewery has been registered <i class='far fa-check-circle'></i></h4></div><div class='card-body'><h5 id='nameBrewery' class='card-titleBewery'><i class='fas fa-user-circle'></i> "+breweries.name+"</h5><p id='addressBrewery' class='card-text'><i class='fas fa-map-pin'></i> "+breweries.address+"</p><span id='city' class='card-link'><i class='fas fa-city'></i> "+breweries.city+"</span><span id='zipcode' class='card-link'>ZipCode: "+breweries.zipCode+"</span></div>");

    $("#nameInput").val("")
    $("#addressInput").val("")
    $("#cityInput").val("")
    $("#zipCodeInput").val("")
    
    clearResult = setTimeout(function(){ 
        $("#resultBrewery").empty(); }, 5000);
    }
});

// display registered breweries
database.ref("brewery/").on("child_added", function(childSnapshot) {    
    console.log(childSnapshot.val());
    
    var newRecord=childSnapshot.val();
    var name = newRecord.name;
    var city = newRecord.city;
    var zipCode = newRecord.zipCode;
    var address = newRecord.address;
    var key = newRecord.key
    
    $(".breweryResults").append("<div class='card brewery-card "+key+"'><div class='card-body'><h5 id='nameBrewery' class='card-titleBewery'> "+name+"</h5><p id='addressBrewery' class='card-text'>"+address+"</p><span id='city' class='card-link'>"+city+",</span><span id='zipcode' class='card-link'> "+zipCode+"</span> <br><br> <p><button type='button' class='btn btn-warning cardBtn beer' data-toggle='modal' data-target='#beerModal' id='"+key+"' style='font-size:12px; padding-left:4px; padding-right:4px'>Update Beers</button><button type='button' class='btn btn-warning cardBtn update' data-toggle='modal' data-target='#infoModal' id='"+key+"' style='font-size:12px; padding-left:4px; padding-right:4px'>Update Info</button><button type='button' class='btn btn-outline-secondary cardBtn remove' data-toggle='modal' data-target='#removeModal' id='"+key+"' style='font-size:12px; padding-left:4px; padding-right:4px'>Remove Brewery</button></p>  </div></div> ");

   /*  //modal --- called by update info button
    updateModal = $(".modals").append("<div class='modal fade' id='infoModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title' id='exampleModalLabel'>Update Brewery Info</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'> <form><div class='form-group'><input type='text' class='form-control' id='nameUpdate' placeholder='Brewery Name'></div><div class='form-group'><input type='text' class='form-control' id='addressUpdate' placeholder='Address'></div><div class='form-group'><input type='text' class='form-control' id='cityUpdate' placeholder='City'></div><div class='form-group'><input type='text' class='form-control' id='zipUpdate' placeholder='5 Digit Zip'></div> <button type='submit' class='btn btn-warning updateBrewery' data-dismiss='modal'>Confirm changes</button></div></div> </form> </div></div>") */

    //modal --- for confirm remove brewery
    removeModal = $(".modals").append("<div class='modal fade' id='removeModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title' id='exampleModalLabel'>Confirm Remove Brewery</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'>Are you sure you wouldike to remove your brewery from our Database? <br><br><p><button type='submit' class='btn btn-danger confirmRemove' data-dismiss='modal' >Remove Brewery</button></div></div> </div></div>")

});

//modal update button  --- 
$(document).on("click", ".update", function(event){
    event.preventDefault();
     var updateId = $(this).attr('id'); 
    console.log(updateId)
    $(".updateBrewery").attr('id', updateId) // adds brewery ID in modal submit button

});

$(document).on("click", ".updateBrewery", function(event){
    event.preventDefault();
    var name = $("#nameUpdate").val().trim();
    var address = $("#addressUpdate").val().trim();
    var city = $("#cityUpdate").val().trim();
    var zipCode = $("#zipUpdate").val().trim();
    
    brewId = $(this).attr('id'); 
    console.log(brewId)

    //only updates each key if not empty
    if (name!=="") { 
        database.ref("brewery/"+brewId).update({name:name});
      }
    if (address!=="") {
        database.ref("brewery/"+brewId).update({address:address});
      }
    if (city!=="") {
        database.ref("brewery/"+brewId).update({city:city});
      }
    if (zipCode!=="") {
        database.ref("brewery/"+brewId).update({zipCode:zipCode});
      }

    $("#nameUpdate").val("")
    $("#addressUpdate").val("")
    $("#cityUpdate").val("")
    $("#zipUpdate").val("")
});

database.ref("brewery/").on("child_changed", function(childSnapshot) {    
    console.log(childSnapshot.val());
    
    var newRecord=childSnapshot.val();
    var name = newRecord.name;
    var city = newRecord.city;
    var zipCode = newRecord.zipCode;
    var address = newRecord.address;
    var key = newRecord.key
    
    $("."+brewId).replaceWith("<div class='card brewery-card "+key+"'><div class='card-body'><h5 id='nameBrewery' class='card-titleBewery'> "+name+"</h5><p id='addressBrewery' class='card-text'>"+address+"</p><span id='city' class='card-link'>"+city+",</span><span id='zipcode' class='card-link'> "+zipCode+"</span> <br><br> <p><button type='button' class='btn btn-warning cardBtn beers' data-toggle='modal' data-target='#beerModal' id='"+key+"' style='font-size:12px; padding-left:4px; padding-right:4px'>Update Beers</button><button type='button' class='btn btn-warning cardBtn update' data-toggle='modal' data-target='#infoModal' id='"+key+"' style='font-size:12px; padding-left:4px; padding-right:4px'>Update Info</button><button type='button' class='btn btn-outline-secondary cardBtn remove' data-toggle='modal' data-target='#removeModal' id='"+key+"' style='font-size:12px; padding-left:4px; padding-right:4px'>Remove Brewery</button></p>  </div></div> ");

});

//remove button for each brewery
$(document).on("click", ".remove", function(event){
    event.preventDefault();
    brewId = $(this).attr('id'); 
    console.log(brewId)
    $(".confirmRemove").attr('id', brewId) // adds brewery ID in modal confirm remove button
});

//confirm remove button in modal
$(document).on("click", ".confirmRemove", function(event){
    event.preventDefault();
    brewId = $(this).attr('id'); 
    $("."+brewId).remove();
    console.log(brewId)
    database.ref("brewery/"+brewId).remove();
});