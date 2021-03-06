let APIKey = "298ac576969a1ac55b166266aed2262a";
let usersInput;
let weatherInput;
let latitude ;
let longitude;
let history = JSON.parse(localStorage.getItem("historyCities"));


$(".createdListInput").on("click", "li", function() {
    let litstcreatedelement = $(this).text()
    searchWeather(litstcreatedelement);
    console.log(litstcreatedelement);

});


function historyDisplay() {
 
   console.log("history : ", history)
   if (Array.isArray(history) === true) {
       $(".createdListInput").empty();
       listCreationFrominput = "";
       localStorageusersInput = "";
       for (var city of history) {
           console.log("city in for loop : ", city);
           let localStorageusersInput = city
           listCreationFrominput = $("<li>").text(localStorageusersInput);
           $(".createdListInput").append(listCreationFrominput);
           
       }
   }
   else {
       history = [];
   }
}
historyDisplay();
function searchWeather(usersInput) {
   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + usersInput + "&appid=" + APIKey;
   // Here we run our AJAX call to the OpenWeatherMap API
   $.ajax({
       url: queryURL,
       method: "GET"
   })
       // We store all of the retrieved data inside of an object called "response"
       .then(function (response) {
           // Log the queryURL
           console.log(response)
           // Log the resulting object
           // Transfer content to HTML
           $(".city").html("<h3>" + response.name + " Weather Details</h3>");
           $(".wind").text("Wind Speed: " + response.wind.speed);
           $(".humidity").text("Humidity: " + response.main.humidity);
           // Convert the temp to fahrenheit
           let tempF = (response.main.temp - 273.15) * 1.80 + 32;
           // add temp content to html
           $(".temp").text("Temperature (K) " + response.main.temp);
           $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
           // Log the data in the console as well
           let iconLink = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
           let imgTag = $("<img>")
           imgTag.attr("src", iconLink);
           $(".icon").html(imgTag);


           latitude = response.coord.lat;
           longitude = response.coord.lon;
           console.log(latitude);
           console.log(longitude);

           var queryURL1 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;
           // Here we run our AJAX call to the OpenWeatherMap API
           $.ajax({
             url: queryURL1,
             method: "GET"
           })
               // We store all of the retrieved data inside of an object called "response"
               .then(function (response) {
               
                  // $(".UV").text("UV Index: " + response.value);
                  $(".UV").css("background-color", "red").text(response.value);

                   
               });


       });
}
$("button").on("click", (event) => {
   event.preventDefault();
   console.log("click")
   // Preventing the button from trying to submit the form
   weatherInput = $(".inputValue").val().trim();
   searchWeather(weatherInput);
   fiveDayWearthe(weatherInput);

   history.push(weatherInput)
   console.log("history after pushing: ", history)
   localStorage.setItem("historyCities", JSON.stringify(history));
   historyDisplay();
   $(".inputValue").empty()

   
  
});




function fiveDayWearthe(usersInput) {
   var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + usersInput + "&appid=" + APIKey;
   // Here we run our AJAX call to the OpenWeatherMap API
   $.ajax({
       url: queryURLFiveDay,
       method: "GET"
   })
       // We store all of the retrieved data inside of an object called "response"
       .then(function (response) {
           // Log the queryURLFiveDay
           // Log the resulting object
           // Transfer content to HTML
           $(".1stDayDate").text("Date: " + response.list[4].dt_txt);

           $(".1stDayhumidity").text("Humidity: " + response.list[4].main.humidity + "%");
           $(".2ndDayDate").text("Date: " + response.list[12].dt_txt);
           $(".2ndDayhumidity").text("Humidity: " + response.list[12].main.humidity + "%");
           $(".3rdDayDate").text("Date: " + response.list[20].dt_txt);
           $(".3rdDayhumidity").text("Humidity: " + response.list[20].main.humidity + "%");
           $(".4thDayDate").text("Date: " + response.list[28].dt_txt);
           $(".4thDayhumidity").text("Humidity: " + response.list[28].main.humidity + "%");
           $(".5thDayDate").text("Date: " + response.list[36].dt_txt);
           $(".5thDayhumidity").text("Humidity: " + response.list[36].main.humidity + "%");
           // Convert the temp to fahrenheit
           let dayOnetempF = (response.list[4].main.temp - 273.15) * 1.80 + 32;
           let dayTwotempF = (response.list[12].main.temp - 273.15) * 1.80 + 32;
           let dayThreetempF = (response.list[20].main.temp - 273.15) * 1.80 + 32;
           let dayFourtempF = (response.list[28].main.temp - 273.15) * 1.80 + 32;
           let dayFivetempF = (response.list[36].main.temp - 273.15) * 1.80 + 32;
           // add temp content to html
           $(".1stDaytempF").text("Temperature (F) " + dayOnetempF.toFixed(2));
           $(".2ndDaytempF").text("Temperature (F) " + dayTwotempF.toFixed(2));
           $(".3rdDaytempF").text("Temperature (F) " + dayThreetempF.toFixed(2));
           $(".4thDaytempF").text("Temperature (F) " + dayFourtempF.toFixed(2));
           $(".5thDaytempF").text("Temperature (F) " + dayFivetempF.toFixed(2));
           // Log the data in the console as well
           let iconLink = "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png";
           let imgTag = $("<img>")
           imgTag.attr("src", iconLink);
           $(".1stDayicon").html(imgTag)
           let dayoneiconLink = "http://openweathermap.org/img/wn/" + response.list[12].weather[0].icon + "@2x.png";
           let daytwoimgTag = $("<img>")
           daytwoimgTag.attr("src", dayoneiconLink);
           $(".2ndDayicon").html(daytwoimgTag)
           let daytwoiconLink = "http://openweathermap.org/img/wn/" + response.list[20].weather[0].icon + "@2x.png";
           let daythreeimgTag = $("<img>")
           daythreeimgTag.attr("src", daytwoiconLink);
           $(".3rdDayicon").html(daythreeimgTag)
           let daythreeiconLink = "http://openweathermap.org/img/wn/" + response.list[28].weather[0].icon + "@2x.png";
           let dayfourimgTag = $("<img>")
           dayfourimgTag.attr("src", daythreeiconLink);
           $(".4thDayicon").html(dayfourimgTag)
           let dayfouriconLink = "http://openweathermap.org/img/wn/" + response.list[36].weather[0].icon + "@2x.png";
           let dayfiveimgTag = $("<img>")
           dayfiveimgTag.attr("src", dayfouriconLink);
           $(".5thDayicon").html(dayfiveimgTag)
       });
}


