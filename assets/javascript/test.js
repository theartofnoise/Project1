
var queryURL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers?name=budweiser&key=442d82061216d902ec97f9787c20dd1b&';
$.ajax({
    url: queryURL,
    method: "GET",
}).then(function(response){
    console.log(response);
    
});