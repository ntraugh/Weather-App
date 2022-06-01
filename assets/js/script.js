var date = $("#date")
// var city = $(".city")
var today = moment().format("(M/D/YYYY)")
// var temp = $(".temp")


// city.prepend("Charlotte ") // .prepend will add the elemnt to the beggining... useful to enter the city to the info page once selected
// temp.append("74")

var weather = {
    // logging our api key we got from openweather
    apiKey: "f3815a7ae5443a3f2cfb1fccc44d33f1",
    // creating a function to fetch the weather from the url 
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.weatherDisplay(data));
    },
    // display the weather with a new function by passing in our data as an argument
    weatherDisplay: function(data){
        
        var { name } = data;
        var { description, icon} = data.weather[0];
        var { temp, humidity} = data.main;
        var { speed } = data.wind;
        // need to find UV index
        console.log(name, description, icon, humidity, temp, speed);
        document.querySelector(".city").innerText = name + " " + today; 
    }
}

