$(document).ready(function () {

    // var localDay = moment();
    // var nextWeek = [];

    // for (var i = 0; i < 5; i++) {

    //     nextWeek.push(localDay.add(1, "day").format("MM/DD/YYYY"));
    // }
    // localDay = moment();
    var apiKey = "9896ef9948b9e627469b011deceaa07c";
    var inputUser = "";
    var lat;
    var lon;

    $("#btnSubmit").on("click", function (event) {

        event.preventDefault();
        inputUser = $("#textCityName").val();
        $(".list-group").prepend(` <li class="list-group-item">${inputUser}</li>`);
        $("#textCityName").val("");
        $("#presentWeather").html("");
        $("#append").html("");

        $.ajax({

            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${inputUser}&units=imperial&appid=${apiKey}`,
            dataType: "json"

        }).then(function (res) {

            lat = res.city.coord.lat.toString();
            lon = res.city.coord.lon.toString();
            var arrWeather = [];
            console.log(res.list);
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

            var t;
            $.ajax({

                type: "GET",
                url: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`,
                dataTypa: "json"

            }).then(function (res) {

                console.log(res);
                console.log(arrWeather);

                var t = moment(arrWeather[0].time).format("MM/DD/YYYY");
                $("#presentWeather").append(`<div class="text-primary divWeather">${arrWeather[0].name + " " + t}<div><img id="icon" src="http://openweathermap.org/img/wn/${arrWeather[0].icon}.png"/></div></div>`);
                $("#presentWeather").append(`<div class="text-info divWeather">Temperature: ${arrWeather[0].tempeture}</div>`);
                $("#presentWeather").append(`<div class="text-info divWeather">Humidity: ${arrWeather[0].humidity}</div>`);
                $("#presentWeather").append(`<div class="text-info divWeather">Wind Speed: ${arrWeather[0].windSpeed}</div>`);
                $("#presentWeather").append(`<div class="text-info divWeather">Uv: ${res.value}</div>`);

                for (var i = 1; i < arrWeather.length; i++) {
                    var t = moment(arrWeather[i].time).format("MM/DD/YYYY");
                    // $("#append").append(` 
                    //     <div class="append col">
                    //                 <span class="forecast">${t}
                    //                 <img id="icon" src="http://openweathermap.org/img/wn/${arrWeather[i].icon}.png"/>
                    //                 Humidity: ${arrWeather[i].humidity}
                    //                 Temperature: ${arrWeather[i].tempeture}
                    //             </span></div> `);
                    $("#append").append(`<div class="card text-white bg-primary mb-2" id="append" style="max-width: 18rem;">
                    <div class="card-header">${t}
                    <img id="icon" src="http://openweathermap.org/img/wn/${arrWeather[i].icon}.png"/></div>
                    <div class="card-body">
                        <h5 class="card-title">Humidity:${arrWeather[i].humidity}</h5>
                        <p class="card-text">Temperature:${arrWeather[i].tempeture}</p>
                    </div>
                </div>`)
                }

            });
        });

    });

});


