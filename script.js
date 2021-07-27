// Global Variables
var searchButton = $('#search-btn')
var jokeHere = $('#insert-joke')
var imageToDisplay = $('.imageToDisplay');
var lastJoke_h5 = $('#history')
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var jokeStorage_arr = [];
var geekURL = "https://geek-jokes.sameerkumar.website/api?format=json";
var NSFWCheck = "";
var hasBeenClicked = false;

// Object Sample
//     var newJoke = {
//         joke: joke goes here,
//         punchline: punchline goes here,
//     }

// Modal Script Start.

// Add Event to Modal Button.
$('#submitChoice').click(function() {
    if ($("#yesNSFW").is(":checked")) {
        NSFWCheck = "yes"
    }
    else {
        NSFWCheck = "no"
    }
    modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it.
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// When the user clicks on <span> (x), close the modal.
span.onclick = function() {
  modal.style.display = "none";
}

// Modal Script End.

// Get a joke from Joke2API.
function getJoke2Api(joke2api_url) {
    $.ajax ({
        url: joke2api_url,
        method: 'GET'
    })
    .then (function(response) {
        // If joke is a single line.
        if (response.joke){

            // Add joke to the page.
            jokeHere.html(response.joke)
            
            // Push to jokeStorage_arr.
            var newJoke = {
                    joke: response.joke,
                    punchline: "",
            }
            jokeStorage_arr.push(newJoke)
            
            // Set Local Storage.
            localStorage.setItem("Joke History", JSON.stringify(jokeStorage_arr))            
        }

        // If joke is two lines
        if (response.setup) {

            // Add joke to the page.
            jokeHere.html(response.setup + " " + response.delivery)
            
            // Push to jokeStorage_arr.
            var newJoke = {
                    joke: response.setup,
                    punchline: response.delivery,
            }
            jokeStorage_arr.push(newJoke)

            // Set Local Storage.
            localStorage.setItem("Joke History", JSON.stringify(jokeStorage_arr))            
        }
    })
}

// Get a joke from Geek-jokes.
function geekAjax() {
    $.ajax({
        url: geekURL,
        method: 'GET',
    })
    // Check for Chuck Norris jokes, if one is returned, call the function again. Team decided not to use Chuck Norris jokes since many
    // were NSFW and it was made more sense to exclude than try to check for explicit ones.
    .then(function (response) {
        if (response.joke.toLowerCase().indexOf('chuck norris') > -1) {
            geekAjax();
            }
        else if (response.joke.toLowerCase().indexOf('chuck') > -1) {
            geekAjax();
            }
        else if (response.joke.toLowerCase().indexOf('norris') > -1) {
            geekAjax();
            }
        else {
            // Add joke to the page.
            jokeHere.html(response.joke);

            // Push to jokeStorage_arr.
            var newJoke = {
                joke: response.joke,
                punchline: "",
            }
            jokeStorage_arr.push(newJoke)

            // Set Local Storage.
            localStorage.setItem("Joke History", JSON.stringify(jokeStorage_arr))
        }
    })
}

// Get a joke from Dad-jokes.
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

        // Add joke to the page.
        jokeHere.html(response.body.setup + " " + response.body.punchline)
        
        // Push to jokeStorage_arr.
        var newJoke = {
                joke: response.body.setup,
                punchline: response.body.punchline,
        }
        jokeStorage_arr.push(newJoke)

        // Set Local Storage.
        localStorage.setItem("Joke History", JSON.stringify(jokeStorage_arr))
    });
}

// Get a joke from Manatee-jokes.
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

        // Add joke to the page.
        jokeHere.html(response.setup + " " + response.punchline)

        // Push to jokeStorage_arr.
        var newJoke = {
                joke: response.setup,
                punchline: response.punchline,
        }
        jokeStorage_arr.push(newJoke)

        // Set Local Storage.
        localStorage.setItem("Joke History", JSON.stringify(jokeStorage_arr))
      });
}

// Takes the user input, calls the appropriate joke function to display a joke on the page when the search button is clicked.
searchButton.click(function() {
	
    // Confirm that user has selected a category.
    if ($("input[name='category']").is(':checked')) {
        if ($('.hide')[0]){
        }
        else {
            $('#alert').addClass('hide')
        }
	    
        // Play I_Dudditz.
        var dudditzMP3 = '<source src="./assets/Dudditz_2.mp3" type="audio/mpeg">';
        searchButton.html('<audio autoplay="autoplay">' + dudditzMP3 + '</audio>' + "Dudditz!")
 
        // Check if button has been clicked.
        if (hasBeenClicked) {
            var jokeHistory_arr = JSON.parse(localStorage.getItem("Joke History"))
            JSON.stringify(jokeHistory_arr)
            lastJoke_h5.html(jokeHistory_arr[(jokeHistory_arr.length)-1].joke + " " + jokeHistory_arr[jokeHistory_arr.length-1].punchline)        
        }

        // Condition: only if Joke2API is selected.
        if ($("#joke3").is(":checked") || $("#joke4").is(":checked")) {
        
            // Grab user input from options and add to URL.
            var joke2api_url = "https://v2.jokeapi.dev/joke/"
            var selected_option_jokeCategory = $("input[name='category']:checked ").val();
            joke2api_url = joke2api_url + selected_option_jokeCategory
        
            // Check if NSFW.
            if (NSFWCheck == "no" || NSFWCheck == null || NSFWCheck == undefined) {
                joke2api_url = joke2api_url + "?safe-mode"
            }

            // Get Joke Functions.
            getJoke2Api(joke2api_url);
        }

        // Condition: only if Geek Joke is selected.
        if ($("#joke5").is(":checked")) {
            geekAjax();
        }

        // Condition: only if Dad Joke is selected.
        if ($("#joke1").is(":checked")) {
            dadJokeAjax();
        }

        // Condition: only if Manatee Joke is selected.
        if ($("#joke2").is(":checked")) {
            manateeAjax();
        }

        // Update "hasBeenClicked" to true.
        if (!hasBeenClicked) {
            hasBeenClicked = true;                
            return hasBeenClicked;   
        }
    }
    // If the user clicked search and did not select an option:
    else {
        $('#alert').removeClass('hide')
    }
})

// Get and display a random image from unsplash to accompany the joke.
var unsplashURL = "https://api.unsplash.com/search/photos?query=funny&client_id=9pKdm2wau0n_B0J1g4z4yTHfOCJY9lLUft4x21--LD8";

// Returns a random image url from the unsplash API response.
async function getNewImage() {
    let randomNumber = Math.floor(Math.random() * 10);
    return fetch(unsplashURL)
      .then((response) => response.json())
      .then((data) => {
          console.log(data)
        let allImages = data.results[randomNumber];
        return allImages.urls.regular;
    });
}

// Displays random image when the search button is clicked.
searchButton.click(async () => {
    let randomImage = await getNewImage();
    imageToDisplay.attr('src', randomImage);
});