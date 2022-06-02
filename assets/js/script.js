citySearch = document.querySelector(".searches")
var today = moment().format("(M/D/YYYY)")
var searchHistory = []; 


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
        .then((data2) => console.log(data2));
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
        // image source from open weather api @2x means x2
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"; 
        document.querySelector(".temp").innerText = "Temp: " + Math.floor(temp) + "°F";
        document.querySelector(".wind").innerText = "Wind Speed: " + Math.floor(speed) + " MPH"
        document.querySelector(".humid").innerText = "Humidity: " + Math.floor(humidity) + " %"
        // unsplash is a collection of images, we pass in the name at the end of the url to get a picture of the users input
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')" 
        document.querySelector(".description").innerText = description 

        
    },
    // grabbing the value of the search bar to use for our input
    inputBar: function(){
        this.fetchWeather(document.querySelector(".input").value);
        this.fetchForecast(document.querySelector(".input").value);
    },
    displaySearch: function(){
        // var x = localStorage.key(0)
        var cities = JSON.parse(localStorage.getItem("City")) || [];
        var doc = document.createElement("button")
        doc.textContent = cities
        citySearch.appendChild(doc)

       
        // document.querySelector(".searches").innerText += " " + x;
        // console.log(searchHistory)

        
    }
    
}

document.querySelector(".city-search button").addEventListener("click", function(event){
    if(event){
        event.preventDefault();
        weather.displaySearch();

        var input = document.querySelector(".input").value
        weather.inputBar();
        localStorage.setItem("City", JSON.stringify(input))

        var cities = JSON.parse(localStorage.getItem("City")) || [];
        searchHistory.push(cities)
        console.log(cities)
    }
});

// adding a keyup event so the user can just press enter after typing in the city
document.querySelector(".input").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        event.preventDefault();
        weather.displaySearch();

        var input = document.querySelector(".input").value
        weather.inputBar();
        localStorage.setItem("City", JSON.stringify(input))

        var cities = JSON.parse(localStorage.getItem("City")) || [];
        searchHistory.push(cities)
        console.log(cities)
    }
})


document.querySelector(".city").innerText = today; 
// weather.displaySearch();
