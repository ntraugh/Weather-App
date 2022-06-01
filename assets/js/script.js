

var today = moment().format("(M/D/YYYY)")
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
    fetchForecast: function(city){
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.weatherDisplay(data));
    },
    // display the weather with a new function by passing in our data as an argument
    weatherDisplay: function(data){
        
        var { name } = data;
        var { icon, description} = data.weather[0];
        var { temp, humidity} = data.main;
        var { speed } = data.wind;
        // need to find UV index
        document.querySelector(".city").innerHTML = ""  

        console.log(name, description, icon, humidity, temp, speed);
        document.querySelector(".city").innerText = name + " " + today; 
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".temp").innerText = "Temp: " + Math.floor(temp) + "°F";
        document.querySelector(".wind").innerText = "Wind Speed: " + Math.floor(speed) + " MPH"
        document.querySelector(".humid").innerText = "Humidity: " + Math.floor(humidity) + " %"
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
        document.querySelector(".description").innerText = description 
        
    },
    // grabbing the value of the search bar to use for our input
    inputBar: function(){
        this.fetchWeather(document.querySelector(".input").value);
    }
    
}

document.querySelector(".city-search button").addEventListener("click", function(){
    weather.inputBar(); // this now looks through our original object of weather for our function inputBar and runs it
});

// adding a keyup event so the user can just press enter after typing in the city
document.querySelector(".input").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.inputBar();
    }
})

document.querySelector(".city").innerText = today; 
