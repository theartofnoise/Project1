$(document).ready(function(){

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBgWNmuTHBXfo1gScnSNziRitAHr9fuvww",
    authDomain: "project1-acf40.firebaseapp.com",
    databaseURL: "https://project1-acf40.firebaseio.com",
    projectId: "project1-acf40",
    storageBucket: "project1-acf40.appspot.com",
    messagingSenderId: "745774090378"
  };
  firebase.initializeApp(config);

  var db = firebase.database().ref();

  $("#submit").on("click", function (event) {
    event.preventDefault();

    var vendorName = $("#inVendorName");
    var description = $("#inDescription");
    var product1 = $("#inProduct1");
    var product2 = $("#inProduct2");
    var product3 = $("#inProduct3");
    var product4 = $("#inProduct4");
    var product5 = $("#inProduct5");
    var product6 = $("#inProduct6");
    var zipcode = $("#inZipcode");
    var yelp = $("#inYelp");

    var newVendor = {
        name: vendorName.val(),
        description: description.val(),
        product1: product1.val(),
        product2: product2.val(),
        product3: product3.val(),
        product4: product4.val(),
        product5: product5.val(),
        product6: product6.val(),
        zipcode: zipcode.val(),
        yelpReview: yelp.val()

    }

    // push to database
    db.push(newVendor);

    //erase input values
    vendorName.val("");
    description.val("");
    product1.val("");
    product2.val("");
    product3.val("");
    product4.val("");
    product5.val("");
    product6.val("");
    zipcode.val("");
    yelp.val("");

});

//submit button
db.on("child_added", function (childSnap) {
       

    //add values to html
    var newRow = "<tr><td>" + childSnap.val().name + "</td><td>" + childSnap.val().product1 + "</td><td>" + childSnap.val().zipcode + "</td><td>" + childSnap.val().yelpReview + "</td></tr>"
    $('#topRow').append(newRow);

}, function (errorObject) {
    console.log('Error: ' + errorObject);
});




});