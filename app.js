$(document).ready(function () {

    var localDay = moment();
    var nextWeek = [];
    var lat;
    var lon;
    var latString;
    var lonString;
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
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${inputUser}&appid=${apiKey}`,
            dataType: "json"

        }).then(function (res) {

            // console.log(res);
            lat = res.city.coord.lat;
            lon = res.city.coord.lon;

            latString = lat.toString();
            // console.log(typeof latString);
            lonString = lon.toString();
            // var nameCity = res.city.name + " " + `(${localDay.format("MM/DD/YYYY")})`;
            // var cloud = res.weather[0].description;
            // var temp = res.main.temp;
            $.ajax({

                type: "GET",
                url: `https://api.openweathermap.org/data/2.5/uvi?lat=${latString}&lon=${lonString}&appid=${apiKey}`,
                dataTypa: "json"

            }).then(function (res) {


                console.log(res);


            });

            // $("#presentWeather").append(`<label class="lead tag"><i class="fas fa-cloud">${nameCity}</i></label>`);
            // $("#presentWeather").append(`<h2 class="tag">${cloud}</h2>`);
            // $("#presentWeather").append(`<h3 class="tag">${temp}</h3>`);
        });

    });


    // $.ajax({

    //     type: "GET",
    //     url: `https://api.openweathermap.org/data/2.5/uvi?lat=${latString}&lon=${lonString}&appid=${apiKey}`,
    //     dataTypa: "json"

    // }).then(function (res) {


    //     console.log(res);


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
