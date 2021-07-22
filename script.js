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

// Add Event to Search Button
searchButton.click(function () {
 
    // Condition: only if Joke2API is selected
   if ($('#joke3 option:selected') || $('#joke4 option:selected')){
        // Grab user input from options and add to queryURL
        var joke2api_url = "https://v2.jokeapi.dev/joke/"
        var selected_option_jokeCategory = $( "input[type=checkbox]:checked" ).val();
        console.log("Joke category selected is:")
        console.log(selected_option_jokeCategory)
        joke2api_url = joke2api_url + selected_option_jokeCategory + "?safe-mode"

        // Get Joke Functions
        getJoke2Api(joke2api_url);
    }

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
        }
        
    })
}