$(document).ready(function () {
    // Declaration
    var apiKey = "9896ef9948b9e627469b011deceaa07c";
    var inputUser = "";
    var latitude;
    var longitude;
    var arrWeather;
    var arrValueInput = [];
    $(".display-5").hide();

    // Setting the array for local storage and init the app.
    setArrayWeatherLocalStorage();

    function btnSubmit() {

        $("#btnSubmit").on("click", function (event) {
            event.preventDefault();
            inputUser = $("#textCityName").val();
            isValidInput(inputUser, arrValueInput);

            $("#textCityName").val("");
            $("#presentWeather").html("");
            $("#append").html("");

        });
    }

    // makes every li click on - display info regarding the city with the same name like li.
    $(document).on("click", ".list-group-item", function () {
        var lastCity;
        $("#presentWeather").html("");
        $("#append").html("");
        lastCity = $(this).text();
        renderCity(lastCity, apiKey);
    });

    // reset the local storage 
    $("#deleteSubmit").on("click", function (event) {

        event.preventDefault();
        deleteLocal();

    });

    // check for local storage and setting the arrWeather.
    function setArrayWeatherLocalStorage() {

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

    // Input Validation from the User.
    function isValidInput(inputUser, arrValueInput) {

        var pattern = new RegExp(/^[a-zA-Z0-9- ]*$/);
        var hasNumber = /\d/;

        if (!arrValueInput.includes(inputUser)) {

            if (inputUser === "" || hasNumber.test(inputUser) || !pattern.test(inputUser)) {

                $("#myModal").modal();
                $(".display-5").hide();

            } else {
                arrValueInput.push(inputUser.toLocaleLowerCase());
                $(".display-5").show();
                inputUser = inputUser.substr(0, 1).toUpperCase() + inputUser.substr(1);
                $(".list-group").prepend(` <li class="list-group-item text-primary">${inputUser}</li>`);
                renderCity(inputUser, apiKey, arrWeather);
            }

        } else {

            $("#myModalCity").modal();

        }
    }
    // 2 ajaxs call to get the data.
    // GET information from openwathermap is only with name of the city(not zipcode or any numbers inside the URl)
    function renderCity(inputUser, key, arrWeather) {

        $.ajax({

            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${inputUser}&units=imperial&appid=${key}`,
            dataType: "json"

        }).then(function (res) {

            inputUser = res.city.name;

            latitude = res.city.coord.lat.toString();
            longitude = res.city.coord.lon.toString();
            arrWeather = [];
            var Weather = {
                name: res.city.name,
                tempeture: res.list[0].main.temp,
                humidity: res.list[0].main.humidity,
                windSpeed: res.list[0].wind.speed,
                time: res.list[0].dt_txt,
                icon: res.list[0].weather[0].icon
            };
            arrWeather.push(Weather);

            for (var i = 3; i < res.list.length; i += 8) {
                Weather = {
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
                displayCity(arrWeather);
                window.localStorage.setItem("city", JSON.stringify(arrWeather));
            });

            //cathe the error response that is coming back from GET request
        }).catch(function (res) {

            $("#presentWeather").text(res.responseJSON.message + " " + res.responseJSON.cod);
            $(".display-5").html("");
        });
    }

    // shows the last city on the app
    function renderLocalStorage() {
        $(".display-5").show();
        displayCity(arrWeather);
    }

    // reset all the data - clean the local storage.
    function deleteLocal() {

        window.localStorage.removeItem("city");
        arrValueInput = [];
        $("#presentWeather").html("");
        $("#append").html("");
        $(".list-group").html("");
        $(".display-5").hide();
    }

    // display the data on the screen.
    function displayCity(arrWeather) {

        var time = moment(arrWeather[0].time).format("MM/DD/YYYY");
        $("#presentWeather").append(`<div class="text-primary font-weight-bold">${arrWeather[0].name + " " + time}<div><img src="http://openweathermap.org/img/wn/${arrWeather[0].icon}.png"/></div></div>`);
        $("#presentWeather").append(`<div class="text-info font-weight-bold">Temperature: ${arrWeather[0].tempeture} F</div>`);
        $("#presentWeather").append(`<div class="text-info font-weight-bold">Humidity: ${arrWeather[0].humidity} %</div>`);
        $("#presentWeather").append(`<div class="text-info font-weight-bold">Wind Speed: ${arrWeather[0].windSpeed} MPH</div>`);
        $("#presentWeather").append(`<div class="text-info font-weight-bold"><p id="uv">UV: ${arrWeather[6]}</p></div>`);

        var color = arrWeather[6] > 7 ? "red" : "blue";

        $("#uv").addClass(color);
        for (var i = 1; i < arrWeather.length - 1; i++) {
            var time = moment(arrWeather[i].time).format("MM/DD/YYYY");
            $("#append").append(`<div class="card text-white bg-primary mb-2 mr-2 ml-2" style="max-width: 10rem;">
            <div class="card-header">${time}
            <img id="icon" src="http://openweathermap.org/img/wn/${arrWeather[i].icon}.png"/></div>
            <div class="card-body">
                <p class="card-title">Humidity: ${arrWeather[i].humidity} %</p>
                <p class="card-text">Temperature: <br> ${arrWeather[i].tempeture} F</p>
            </div>
        </div>`)
        }
    }
});
