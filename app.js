$(document).ready(function () {

    var localDay = moment();
    var nextWeek = [];
    var lat;
    var lon;
    for (var i = 0; i < 5; i++) {

        nextWeek.push(localDay.add(1, "day").format("MM/DD/YYYY"));
    }
    localDay = moment();
    var apiKey = "9896ef9948b9e627469b011deceaa07c";
    var inputUser = "";




    $("#btnSubmit").on("click", function (event) {

        event.preventDefault();
        inputUser = $("#textCityName").val();
        $("#textCityName").val("");


        $.ajax({

            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${inputUser},us&units=imperial&appid=${apiKey}`,
            dataType: "json"

        }).then(function (res) {

            lat = res.city.coord.lat.toString();
            lon = res.city.coord.lon.toString();
            var arrWeather = [];

            for (var i = 3; i < res.list.length; i += 8) {


                var Weather = {

                    tempeture: res.list[i].main.temp,
                    humidity: res.list[i].main.humidity,
                    windSpeed: res.list[i].wind.speed,
                    time: res.list[i].dt_txt,
                    icon: res.list[i].weather[0].icon
                };

                arrWeather.push(Weather);
            }

            var t = moment(Weather.time).format("MM/DD/YYYY");


            $("#presentWeather").append(`<div class="text-primary divWeather">${res.city.name + " " + t}<div><img id="icon" src="http://openweathermap.org/img/wn/${Weather.icon}.png"/></div></div>`);
            $("#presentWeather").append(`<div class="text-info divWeather">Temperature: ${Weather.tempeture}</div>`);
            $("#presentWeather").append(`<div class="text-info divWeather">Humidity: ${Weather.humidity}</div>`);
            $("#presentWeather").append(`<div class="text-info divWeather">Wind Speed: ${Weather.windSpeed}</div>`);
            // console.log();
            http://openweathermap.org/img/wn/10d@2x.png
            console.log(res);
            // latString = lat.toString();
            // console.log(typeof latString);
            // lonString = lon.toString();
            // var nameCity = res.city.name + " " + `(${ localDay.format("MM/DD/YYYY") })`;
            // var cloud = res.weather[0].description;
            // var temp = res.main.temp;

            $.ajax({

                type: "GET",
                url: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`,
                dataTypa: "json"

            }).then(function (res) {





            });

            // $("#presentWeather").append(`<label class="lead tag"><i class="fas fa-cloud">${nameCity}</i></label>`);

            // $("#presentWeather").append(`<h3 class="tag">${temp}</h3>`);
        });

    });



    // });
    //     $("#appendRow").append(` < div class= "row" >
    //     <div class="col-sm-12 col-md-3">
    //         <div class="card">
    //             <div class="card-body">
    //                 <span class="forecast">blah blah  </span>
    //             </div>
    //         </div>
    //     </div>
    // </>`)

    // $(document).on("click", ".tag", function () {

    //     $("#presentWeather").html("");

    // });




});
