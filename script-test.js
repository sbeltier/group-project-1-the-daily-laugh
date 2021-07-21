var queryURL = "https://v2.jokeapi.dev/joke/"
var submitCriteria_Form= document.getElementById('criteria-form')
var jokeCategories = document.querySelectorAll('option')

submitCriteria_Form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(event.target.jokeCategories.innerHTML);


    // check category and add to query URL
}
)

    // fetch (queryURL, {
    //     method: 'GET'
    // })
    //     .then(function (response){
    //         return response.json();
    //     })
    //     .then (function (data){
    //         console.log(data);
    //         var setup = document.getElementById('setup')
    //         var delivery = document.getElementById('delivery')
    
    //         setup.innerHTML = data.setup
    //         delivery.innerHTML = data.delivery
    
    //     }
    // )