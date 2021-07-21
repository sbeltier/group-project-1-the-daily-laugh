// Global Variables
var queryURL = "https://v2.jokeapi.dev/joke/"
    // If we want to exclude offensive jokes: https://v2.jokeapi.dev/joke/Any?safe-mode
var submitCriteria_Form = $('#criteria-form');
var searchButton = $('#submit-search-button');




// First Button - What type of joke are you in the mood for?
submitCriteria_Form.on('submit', function (event) {
    event.preventDefault();

    // Condition: only if Joke2API is selected
    if ($('#joke2api-joke-category option:selected')){

        // Grab user input from options and add to queryURL
        var selected_option_jokeCategory = $('#joke2api-joke-category option:selected')[0].innerHTML
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

// Second Button: Search for a joke
// searchButton.on('click', function () {
//     console.log("check")
//     var userKeyterm = $('#joke2api-search-keyterm').val()
//     console.log(userKeyterm)
//     encodeURI(userKeyterm)
//     queryURL = queryURL + "?contains" + userKeyterm
//     getJoke2Api(queryURL)

// })

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