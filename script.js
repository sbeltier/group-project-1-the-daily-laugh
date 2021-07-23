// Global Variables
var searchButton = $('#search-btn')
var jokeHere = $('#insert-joke')
var jokeStorage_arr = [];
    /* Object Sample
    var newJoke = {
        joke2Api: {
            setup: null,
            delivery: null,
            joke: null,
        }
    }
    */
var geekURL = "https://geek-jokes.sameerkumar.website/api?format=json";

// Add Event to Search Button
searchButton.click(function () {
 
    // Condition: only if Joke2API is selected
   if ($("#joke3 input[type='radio']:checked") || $("#joke4 input[type='radio']:checked")) {
       
    // Grab user input from options and add to queryURL
        var joke2api_url = "https://v2.jokeapi.dev/joke/"
        var selected_option_jokeCategory = $( "input[type=checkbox]:checked" ).val();
        console.log("Joke category selected is:")
        console.log(selected_option_jokeCategory)
        joke2api_url = joke2api_url + selected_option_jokeCategory + "?safe-mode"

        // Get Joke Functions
        getJoke2Api(joke2api_url);
    }

    // Condition: only if Geek Joke is selected
    if ($("#joke5 input[type='radio']:checked")) {
        geekAjax();
    }

    // Condition: only if Dad Joke is selected
    if ($("#joke1 input[type='radio']:checked")) {
        dadJokeAjax();
    }

    // Need call for manatee function

})

// Get a joke from Joke2API
function getJoke2Api (joke2api_url){
    $.ajax ({
        url: joke2api_url,
        method: 'GET'
    })
    .then (function (response){
        // if single line joke
        if (response.joke){
            console.log(response);
            console.log(response.joke)

            // Add joke to page
            jokeHere.html(response.joke)
            
            // Push to jokeStorage_arr
            var newJoke = {
                joke2Api: {
                    joke: response.joke,
                    category: response.category,
                }
            }
            jokeStorage_arr.push(newJoke)
            console.log("Jokes stored:")
            console.log(jokeStorage_arr)
            
            // Set Local Storage
            localStorage.setItem("Joke History", JSON.stringify(jokeStorage_arr))            
        }

        // if two line joke
        if (response.setup) {
            console.log(response.setup);
            console.log(response.delivery)
            console.log(typeof response.setup)

            // Add joke to page
            jokeHere.html(response.setup + " " + response.delivery)
            
            // Push to jokeStorage_arr
            var newJoke = {
                joke2Api: {
                    setup: response.setup,
                    delivery: response.delivery,
                    category: response.category,
                }
            }
            jokeStorage_arr.push(newJoke)
            console.log("Jokes stored:")
            console.log(jokeStorage_arr)

            // Set Local Storage
            localStorage.setItem("Joke History", JSON.stringify(jokeStorage_arr))            
        }
        
    })
}

// Get a joke from Geek-jokes

function geekAjax() {
    $.ajax({
        url: geekURL,
        method: 'GET',
    })
    .then(function (response) {
        if (response.joke.toLowerCase().indexOf('chuck norris') > -1) {
            console.log("chuck norris joke!")
            console.log(response.joke)
            geekAjax();
            }
        else if (response.joke.toLowerCase().indexOf('chuck') > -1) {
            console.log("chuck norris joke!")
            console.log(response.joke)
            geekAjax();
            }
        else if (response.joke.toLowerCase().indexOf('norris') > -1) {
            console.log("chuck norris joke!")
            console.log(response.joke)
            geekAjax();
            }
        else {
            jokeHere.html(response.joke);
            console.log("not a chuck norris joke")
            console.log(response.joke)
            var newJoke = {
                GeekJoke: response.joke
            }
            // Push to jokeStorage_arr
            jokeStorage_arr.push(newJoke)

            // Set Local Storage
            localStorage.setItem("Joke History", JSON.stringify(jokeStorage_arr))
        }
    })
}

// Get a joke from dad-jokes
var dadJokeURL = "https://dad-jokes.p.rapidapi.com/random/joke/png";
var dadJokeKey = "74f08a0113msha07df561725aea0p1786ebjsndfeb58ea0cc2"
var dadJokeHost = "dad-jokes.p.rapidapi.com"

function dadJokeAjax() {
    $.ajax({
        url: dadJokeURL,
        method: 'GET',
        headers: {
            "x-rapidapi-key": dadJokeKey,
		    "x-rapidapi-host": dadJokeHost,
        }})
    .then(function (response) {
        console.log(response.body.setup);
        console.log(response.body.punchline);
        console.log(typeof response.body.setup);

        // Add joke to page
        jokeHere.html(response.body.setup + " " + response.body.punchline)
        
        // Push to jokeStorage_arr
        var newJoke = {
            dadJoke: {
                joke: response.body.setup,
                punchline: response.body.punchline,
            }
        }
        jokeStorage_arr.push(newJoke)
        console.log("Jokes stored:")
        console.log(jokeStorage_arr)

        // Set Local Storage
        localStorage.setItem("Joke History", JSON.stringify(jokeStorage_arr))
    });
}

// Get a joke from manatee-jokes
var manateeURL = "https://manatee-jokes.p.rapidapi.com/manatees/random/"
var manateeKey = "74f08a0113msha07df561725aea0p1786ebjsndfeb58ea0cc2"
var manateeHost = "manatee-jokes.p.rapidapi.com"

function manateeAjax() {
    $.ajax({
        url: manateeURL,
        method: 'GET',
        headers: {
            "x-rapidapi-key": manateeKey,
            "x-rapidapi-host": manateeHost,
      }}).then(function (response) {
        console.log(response.setup);
        console.log(response.punchline);
        console.log(typeof response.setup);

        // Add joke to page
        jokeHere.html(response.setup + " " + response.punchline)

        // Push to jokeStorage_arr
        var newJoke = {
            manateeJoke: {
                joke: response.setup,
                punchline: response.punchline,
            }
        }
        jokeStorage_arr.push(newJoke)
        console.log("Jokes stored:")
        console.log(jokeStorage_arr)

        // Set Local Storage
        localStorage.setItem("Joke History", JSON.stringify(jokeStorage_arr))
      });
}
manateeAjax()