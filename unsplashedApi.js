$("#myForm").submit(function(event){
    event.preventDefault()

    var search = $("#search").val()
    var url = "https://api.unsplash.com/search/photos?query="+search+"&client_id=9pKdm2wau0n_B0J1g4z4yTHfOCJY9lLUft4x21--LD8"

    $.ajax({
        method:'GET',
        url:url,
        success:function(data){
            console.log(data)

            data.results.forEach(photo =>{
                $("#result").append(`
                
                <img src="${photo.urls.regular}"/>
                
                `)
            })
            
        }
    })
})
