$(document).ready(function () {

    var apiKey = "9896ef9948b9e627469b011deceaa07c";
    var inputUser = "";
    var lat;
    var lon;
    var arrWeather;
    var uv;

    setArray();

    function btnSubmit() {

        $("#btnSubmit").on("click", function (event) {
            event.preventDefault();
            inputUser = $("#textCityName").val();
            $(".list-group").prepend(` <li class="list-group-item">${inputUser}</li>`);
            $("#textCityName").val("");
            $("#presentWeather").html("");
            $("#append").html("");
            renderCity(inputUser, apiKey, arrWeather);

        });

    }

    $(document).on("click", ".list-group-item", function () {
        var lastCity;
        $("#presentWeather").html("");
        $("#append").html("");
        lastCity = $(this).text();
        renderCity(lastCity, apiKey);
    });

    $("#deleteSubmit").on("click", function (event) {

        event.preventDefault();
        deleteLocal();

    });

    function deleteLocal() {

        window.localStorage.removeItem("city");
        $("#presentWeather").html("");
        $("#append").html("");
        $(".list-group").html("");
    }


    function renderLocalStorage() {

        var time = moment(arrWeather[0].time).format("MM/DD/YYYY");
        console.log(arrWeather[5]);
        $("#presentWeather").append(`<div class="text-primary divWeather">${arrWeather[0].name + " " + time}<div><img id="icon" src="http://openweathermap.org/img/wn/${arrWeather[0].icon}.png"/></div></div>`);
        $("#presentWeather").append(`<div class="text-info divWeather">Temperature: ${arrWeather[0].tempeture}</div>`);
        $("#presentWeather").append(`<div class="text-info divWeather">Humidity: ${arrWeather[0].humidity}</div>`);
        $("#presentWeather").append(`<div class="text-info divWeather">Wind Speed: ${arrWeather[0].windSpeed}</div>`);
        $("#presentWeather").append(`<div class="text-info divWeather">UV: ${arrWeather[5]}</div>`);

        for (var i = 1; i < 5; i++) {
            var time = moment(arrWeather[i].time).format("MM/DD/YYYY");

            $("#append").append(`<div class="card text-white bg-primary mb-2" id="append" style="max-width: 10rem;">
            <div class="card-header">${time}
            <img id="icon" src="http://openweathermap.org/img/wn/${arrWeather[i].icon}.png"/></div>
            <div class="card-body">
                <h5 class="card-title">Humidity:${arrWeather[i].humidity}</h5>
                <p class="card-text">Temperature:${arrWeather[i].tempeture}</p>
            </div>
        </div>`)
        }

    }
    function renderCity(inputUser, key, arrWeather) {

        $.ajax({

            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${inputUser}&units=imperial&appid=${key}`,
            dataType: "json"

        }).then(function (res) {

            lat = res.city.coord.lat.toString();
            lon = res.city.coord.lon.toString();
            arrWeather = [];
            for (var i = 3; i < res.list.length; i += 8) {

                var Weather = {
                    name: res.city.name,
                    tempeture: res.list[i].main.temp,
                    humidity: res.list[i].main.humidity,
                    windSpeed: res.list[i].wind.speed,
                    time: res.list[i].dt_txt,
                    icon: res.list[i].weather[0].icon
                };

                arrWeather.push(Weather);
            }

            $.ajax({

                type: "GET",
                url: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`,
                dataTypa: "json"

            }).then(function (res) {
                console.log("h1");
                arrWeather.push(res.value);
                var time = moment(arrWeather[0].time).format("MM/DD/YYYY");
                $("#presentWeather").append(`<div class="text-primary divWeather">${arrWeather[0].name + " " + time}<div><img id="icon" src="http://openweathermap.org/img/wn/${arrWeather[0].icon}.png"/></div></div>`);
                $("#presentWeather").append(`<div class="text-info divWeather">Temperature: ${arrWeather[0].tempeture}</div>`);
                $("#presentWeather").append(`<div class="text-info divWeather">Humidity: ${arrWeather[0].humidity}</div>`);
                $("#presentWeather").append(`<div class="text-info divWeather">Wind Speed: ${arrWeather[0].windSpeed}</div>`);
                $("#presentWeather").append(`<div class="text-info divWeather">UV: ${arrWeather[5]}</div>`);


                for (var i = 1; i < arrWeather.length - 1; i++) {
                    var time = moment(arrWeather[i].time).format("MM/DD/YYYY");

                    $("#append").append(`<div class="card text-white bg-primary mb-2" id="append" style="max-width: 10rem;">
                    <div class="card-header">${time}
                    <img id="icon" src="http://openweathermap.org/img/wn/${arrWeather[i].icon}.png"/></div>
                    <div class="card-body">
                        <h5 class="card-title">Humidity:${arrWeather[i].humidity}</h5>
                        <p class="card-text">Temperature:${arrWeather[i].tempeture}</p>
                    </div>
                </div>`)
                }
                window.localStorage.setItem("city", JSON.stringify(arrWeather));
            });


        });
    }

    function setArray() {

        if (localStorage) {
            arrWeather = JSON.parse(window.localStorage.getItem("city"));
            if (arrWeather == null) {
                arrWeather = [];
                btnSubmit();
            } else {

                renderLocalStorage();
                btnSubmit();
            }

        }
    }
});
