var queryURL = "https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,political"


fetch (queryURL, {
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

    }
)