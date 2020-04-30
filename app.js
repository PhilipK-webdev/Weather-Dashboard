$(document).ready(function () {


    var apiKey = "7f9d2254f4ebfa05b38921a6dcf77731";
    var inputUser = "";

    $("#btnSubmit").on("click", function (event) {

        event.preventDefault();
        inputUser = $("#textCityName").val();
        $("#textCityName").val("");
        $.ajax({

            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${inputUser}&appid=${apiKey}`,
            dataType: "json"

        }).then(function (res) {

            var nameCity = res.name;
            var cloud = res.weather[0].description;
            var temp = res.main.temp;

            $("#presentWeather").append(`<h1 class="tag">${nameCity}</h1>`);
            $("#presentWeather").append(`<h2 class="tag">${cloud}</h2>`);
            $("#presentWeather").append(`<h3 class="tag">${temp}</h3>`);
        });

        $(document).on("click", ".tag", function () {

            $("#presentWeather").html("");

        });
    });




});