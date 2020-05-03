$(document).ready(function () {

    var apiKey = "9896ef9948b9e627469b011deceaa07c";
    var inputUser = "";
    var latitude;
    var longitude;
    var arrWeather;
    var uv;

    setArray();

    function btnSubmit() {

        $("#btnSubmit").on("click", function (event) {
            event.preventDefault();
            $(".display-5").show();
            inputUser = $("#textCityName").val();
            console.log(inputUser);
            inputUser = inputUser.substr(0, 1).toUpperCase() + inputUser.substr(1);
            $(".list-group").prepend(` <li class="list-group-item text-primary">${inputUser}</li>`);


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
        $(".display-5").hide();
    }


    function renderLocalStorage() {

        var time = moment(arrWeather[0].time).format("MM/DD/YYYY");
        $("#presentWeather").append(`<div class="text-primary">${arrWeather[0].name + " " + time}<div><img id="icon" src="http://openweathermap.org/img/wn/${arrWeather[0].icon}.png"/></div></div>`);
        $("#presentWeather").append(`<div class="text-info">Temperature: ${arrWeather[0].tempeture} F</div>`);
        $("#presentWeather").append(`<div class="text-info">Humidity: ${arrWeather[0].humidity} %</div>`);
        $("#presentWeather").append(`<div class="text-info">Wind Speed: ${arrWeather[0].windSpeed} MPH</div>`);
        $("#presentWeather").append(`<div class="text-info"><p id="uv">UV: ${arrWeather[5]}</p></div>`);


        if (arrWeather[5] > 7) {

            $("#uv").addClass("red");
        } else {

            $("#uv").addClass("blue");
        }

        for (var i = 1; i < 5; i++) {
            var time = moment(arrWeather[i].time).format("MM/DD/YYYY");

            $("#append").append(`<div class="card text-white bg-primary mb-2 mr-2 ml-2" style="max-width: 10rem;">
            <div class="card-header">${time}
            <img id="icon" src="http://openweathermap.org/img/wn/${arrWeather[i].icon}.png"/></div>
            <div class="card-body">
                <p class="card-title">Humidity: ${arrWeather[i].humidity} %</p>
                <p class="card-text">Temperature: <br>${arrWeather[i].tempeture} F</p>
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

            latitude = res.city.coord.lat.toString();
            longitude = res.city.coord.lon.toString();
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
                url: `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
                dataTypa: "json"

            }).then(function (res) {




                arrWeather.push(res.value);
                var time = moment(arrWeather[0].time).format("MM/DD/YYYY");
                $("#presentWeather").append(`<div class="text-primary">${arrWeather[0].name + " " + time}<div><img src="http://openweathermap.org/img/wn/${arrWeather[0].icon}.png"/></div></div>`);
                $("#presentWeather").append(`<div class="text-info">Temperature: ${arrWeather[0].tempeture} F</div>`);
                $("#presentWeather").append(`<div class="text-info">Humidity: ${arrWeather[0].humidity} %</div>`);
                $("#presentWeather").append(`<div class="text-info">Wind Speed: ${arrWeather[0].windSpeed} MPH</div>`);
                $("#presentWeather").append(`<div class="text-info"><p id="uv">UV: ${arrWeather[5]}</p></div>`);

                if (res.value > 7) {

                    $("#uv").addClass("red");
                } else {

                    $("#uv").addClass("blue");
                }

                for (var i = 1; i < arrWeather.length - 1; i++) {
                    var time = moment(arrWeather[i].time).format("MM/DD/YYYY");

                    $("#append").append(`<div class="card text-white bg-primary mb-2 mr-2 ml-2" style="max-width: 10rem;">
                    <div class="card-header">${time}
                    <img id="icon" src="http://openweathermap.org/img/wn/${arrWeather[i].icon}.png"/></div>
                    <div class="card-body">
                        <p class="card-title">Humidity:${arrWeather[i].humidity} %</p>
                        <p class="card-text">Temperature: <br>${arrWeather[i].tempeture} F</p>
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
