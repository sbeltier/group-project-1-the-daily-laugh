// Global Variables
var searchButton = $('#search-btn')
var jokeHere = $('#insert-joke')
var jokeStorage_arr = [];
    /* Object Sample
    var newJoke = {
        joke: null,
        punchline: null,
    }
    */
var geekURL = "https://geek-jokes.sameerkumar.website/api?format=json";
var NSFWCheck = "";
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var lastJoke_h5 = $('#history')
var hasBeenClicked = false;

/* Modal Scripts Start
*
*
*/

// Add Event to Modal Button
$('#submitChoice').click(function(){
    console.log("button works")
    if ($("#yesNSFW").is(":checked")) {
        NSFWCheck = "yes"
    }
    else {
        NSFWCheck = "no"
    }
    modal.style.display = "none";
console.log(NSFWCheck)
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

/* Modal Scripts End
*
*
*/

// Add Event to Search Button
searchButton.click(function () {
	
    // Confirm that user selected a category
    if ($("input[name='category']").is(':checked')){
        console.log("not working")
        if ($('.hide')[0]){
        }
        else {
            $('#alert').addClass('hide')
        }
	    
        // Play I_Dudditz
        playDudditz();
 
        // Check if button has been clicked
        if (hasBeenClicked){
            console.log("this is the second click")
            var jokeHistory_arr = JSON.parse(localStorage.getItem("Joke History"))
            JSON.stringify(jokeHistory_arr)
            lastJoke_h5.html(jokeHistory_arr[(jokeHistory_arr.length)-1].joke + " " + jokeHistory_arr[jokeHistory_arr.length-1].punchline)        
        }
        else {
            console.log("this is the first click")
        }


        // Condition: only if Joke2API is selected
        if ($("#joke3").is(":checked") || $("#joke4").is(":checked")) {
        
        // Grab user input from options and add to queryURL
            var joke2api_url = "https://v2.jokeapi.dev/joke/"
            var selected_option_jokeCategory = $("input[name='category']:checked ").val();
            console.log("Joke category selected is:")
            console.log(selected_option_jokeCategory)
            joke2api_url = joke2api_url + selected_option_jokeCategory
        
            // Check if NSFW
            if (NSFWCheck == "no" || NSFWCheck == null || NSFWCheck == undefined) {
                joke2api_url = joke2api_url + "?safe-mode"
                console.log("this is safe for work")
            }

            // Get Joke Functions
            getJoke2Api(joke2api_url);
        }

        // Condition: only if Geek Joke is selected
        if ($("#joke5").is(":checked")) {
            geekAjax();
        }

        // Condition: only if Dad Joke is selected
        if ($("#joke1").is(":checked")) {
            dadJokeAjax();
        }

        // Need call for manatee function
        if ($("#joke2").is(":checked")) {
            manateeAjax();
        }

        // Update "hasBeenClicked" to true

        if (!hasBeenClicked)
            hasBeenClicked = true;                
            return hasBeenClicked;   
    }

    // If the user clicked search and did not select an option:
    else {
        $('#alert').removeClass('hide')

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
                    joke: response.joke,
                    punchline: "",
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
                    joke: response.setup,
                    punchline: response.delivery,
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
            geekAjax();
            }
        else {
            jokeHere.html(response.joke);
            console.log("not a chuck norris joke")
            console.log(response.joke)
            var newJoke = {
                joke: response.joke,
                punchline: "",
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
                joke: response.body.setup,
                punchline: response.body.punchline,
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
                joke: response.setup,
                punchline: response.punchline,
        }
        jokeStorage_arr.push(newJoke)
        console.log("Jokes stored:")
        console.log(jokeStorage_arr)

        // Set Local Storage
        localStorage.setItem("Joke History", JSON.stringify(jokeStorage_arr))
      });
}


var requestUrl =
"https://api.unsplash.com/search/photos?query=funny&client_id=9pKdm2wau0n_B0J1g4z4yTHfOCJY9lLUft4x21--LD8";
var getImagesButton = document.querySelector('#search-btn');
var imageToDisplay = document.querySelector('.imageToDisplay');

getImagesButton.addEventListener('click', async () => {
let randomImage = await getNewImage();
imageToDisplay.src = randomImage;
});

async function getNewImage() {
let randomNumber = Math.floor(Math.random() * 10);
return fetch(requestUrl)
  .then((response) => response.json())
  .then((data) => {
    let allImages = data.results[randomNumber];
    return allImages.urls.regular;
  });
}

// Function: when user submits button, I_Dudditz plays
function playDudditz () {
    var dudditzMP3 = '<source src="./assets/Dudditz_2.mp3" type="audio/mpeg">';
    searchButton.html('<audio autoplay="autoplay">' + dudditzMP3 + '</audio>' + "Dudditz")

}
