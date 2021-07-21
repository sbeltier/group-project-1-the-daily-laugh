
// Global Variables
var queryURL = "https://v2.jokeapi.dev/joke/"
    // If we want to exclude offensive jokes: https://v2.jokeapi.dev/joke/Any?safe-mode
var submitCriteria_Form= document.getElementById('criteria-form')
var jokeCategories = document.querySelectorAll('option')

// First Button - What type of joke are you in the mood for?
submitCriteria_Form.addEventListener('submit', function (event) {
    event.preventDefault();

   // Condition: only if Joke2API is selected
   if ($('#joke-category option:selected')){

    // Grab user input from options and add to queryURL
    var selected_option_jokeCategory = $('#joke-category option:selected')[0].innerHTML
    console.log("Joke category selected is:")
    console.log(selected_option_jokeCategory)
    queryURL = queryURL + selected_option_jokeCategory + "?safe-mode"


    var selected_input_blacklist = $('#joke2api-blacklist input:checked')
    for (i=0; i < selected_input_blacklist.length; i++){
        console.log("selected_input_blacklist is:")
        console.log(selected_input_blacklist[i].value)
    }

    // Get Joke
    getJoke2Api(queryURL);
}

})

// Get a joke from Joke2API
function getJoke2Api (){
    $.ajax ({
        url: queryURL,
        method: 'GET'
    })
    .then (function (response){
        console.log(response);
        var setup = $('#setup');
        console.log(setup)
        var delivery = $('#delivery')
        console.log(response.setup)
        console.log(typeof response.setup)

        // Add joke to page
        setup.html(response.setup)
        delivery.html(response.delivery)
    })
}
=======
// Each joke API is coded using fetch and AJAX methods within a function, to use a method with an API just uncomment the appropriate function.
// Need to look at parameters to filter out NSFW jokes and, in the case of the geek API, chuck norris jokes.
// Need to test calling a function based on user joke type selection.

// is there a flag for race jokes?
var randomURL = "https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,political"

// Using fetch method:
function randomFetch() {
    fetch (randomURL, {
        method: 'GET'
    })
    .then(function (response){
        return response.json();
    })
    .then (function (data){
        console.log(data);
        var setup = document.getElementById('setup')
        var delivery = document.getElementById('delivery')
        setup.innerHTML = data.setup
        delivery.innerHTML = data.delivery
    })
}
// randomFetch();

// Using AJAX method:
function randomAjax() {
    $.ajax({
        url: randomURL,
        method: 'GET',})
    .then(function (response) {
        var setup = $('#setup');
        var delivery = $('#delivery');
        setup.text(response.setup);
        delivery.text(response.delivery);
    })
}
// randomAjax();

// --------------------------------------------------------------------------------------------------------------------------------------------
// geek-jokes is full of Chuck Norris jokes also. Way to only show geek jokes?
var geekURL = "https://geek-jokes.sameerkumar.website/api?format=json";

// Using fetch method:
function geekFetch() {
    fetch (geekURL, {
        method: 'GET'
    })
    .then(function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        var joke = document.getElementById('joke');
        joke.innerHTML = data.joke;
    })
}
// geekFetch();

// Using AJAX method:
function geekAjax() {
    $.ajax({
        url: geekURL,
        method: 'GET',})
    .then(function (response) {
        var joke = $('#joke');
        joke.html(response.joke);
    })
}
// geekAjax();


// --------------------------------------------------------------------------------------------------------------------------------------------
// Some of these are NSFW. See about parameters
var chuckNorrisURL = "https://api.chucknorris.io/jokes/random";

// Using fetch method:
function chuckNorrisFetch() {
    fetch (chuckNorrisURL, {
        method: 'GET'
    })
    .then(function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        var joke = document.getElementById('joke');
        joke.innerHTML = data.value;
    })
}
// chuckNorrisFetch();

// Using AJAX method:
function chuckNorrisAjax() {
    $.ajax({
        url: chuckNorrisURL,
        method: 'GET',})
    .then(function (response) {
        var joke = $('#joke');
        joke.html(response.value);
    });
}
// chuckNorrisAjax();

// --------------------------------------------------------------------------------------------------------------------------------------------
// Some of these are NSFW. See about parameters
var dadJokeURL = "https://dad-jokes.p.rapidapi.com/random/joke/png";
var dadJokeKey = "74f08a0113msha07df561725aea0p1786ebjsndfeb58ea0cc2"
var dadJokeHost = "dad-jokes.p.rapidapi.com"

// Using fetch method:
function dadJokeFetch() {
    fetch (dadJokeURL, {
        method: 'GET',
        headers: {
            "x-rapidapi-key": dadJokeKey,
            "x-rapidapi-host": dadJokeHost,
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        var setup = document.getElementById('setup')
        var delivery = document.getElementById('delivery')
        setup.innerHTML = data.body.setup;
        delivery.innerHTML = data.body.punchline;
    })
}
// dadJokeFetch();

// Using AJAX method:
function dadJokeAjax() {
    $.ajax({
        url: "https://dad-jokes.p.rapidapi.com/random/joke/png",
        method: 'GET',
        headers: {
            "x-rapidapi-key": dadJokeKey,
		    "x-rapidapi-host": dadJokeHost,
        }})
    .then(function (response) {
        var setup = $('#setup');
        var delivery = $('#delivery');
        setup.text(response.body.setup);
        delivery.text(response.body.punchline);
    });
}
// dadJokeAjax();

// --------------------------------------------------------------------------------------------------------------------------------------------
var manateeURL = "https://manatee-jokes.p.rapidapi.com/manatees/random/"
var manateeKey = "74f08a0113msha07df561725aea0p1786ebjsndfeb58ea0cc2"
var manateeHost = "manatee-jokes.p.rapidapi.com"

// Using fetch method:
// FETCH METHOD NOT WORKING WITH KEYS
function manateeFetch() {
    fetch (manateeURL, {
        method: 'GET',
        headers: {
            "x-rapidapi-key": manateeKey,
            "x-rapidapi-host": manateeHost,
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        var setup = document.getElementById('setup')
        var delivery = document.getElementById('delivery')
        setup.innerHTML = data.setup;
        delivery.innerHTML = data.punchline;
    })
}
// manateeFetch();

// Using AJAX method:
function manateeAjax() {
    $.ajax({
        url: "https://manatee-jokes.p.rapidapi.com/manatees/random/",
        method: 'GET',
        headers: {
            "x-rapidapi-key": "74f08a0113msha07df561725aea0p1786ebjsndfeb58ea0cc2",
              "x-rapidapi-host": "manatee-jokes.p.rapidapi.com",
      }}).then(function (response) {
        var setup = $('#setup');
        var delivery = $('#delivery');
        setup.text(response.setup);
        delivery.text(response.punchline);
      });
}
// manateeAjax();
