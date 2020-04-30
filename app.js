$(document).ready(function () {

    var localDay = moment();
    var nextWeek = [];
    for (var i = 0; i < 5; i++) {

        nextWeek.push(localDay.add(1, "day").format("MM/DD/YYYY"));
    }
    localDay = moment();
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

            console.log(res);
            var nameCity = res.name + " " + `(${localDay.format("MM/DD/YYYY")})`;
            var cloud = res.weather[0].description;
            var temp = res.main.temp;

            $("#presentWeather").append(`<label class="lead tag"><i class="fas fa-cloud">${nameCity}</i></label>`);
            $("#presentWeather").append(`<h2 class="tag">${cloud}</h2>`);
            $("#presentWeather").append(`<h3 class="tag">${temp}</h3>`);
        });

        $(document).on("click", ".tag", function () {

            $("#presentWeather").html("");

        });
    });




});