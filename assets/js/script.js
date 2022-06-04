citySearch = document.querySelector(".searches")

var today = moment().format("(M/D/YYYY)")



var weather = {
    // logging our api key we got from openweather
    apiKey: "f3815a7ae5443a3f2cfb1fccc44d33f1",
    // creating a function to fetch the weather from the url 
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.weatherDisplay(data));
        this.storeSearch(city);
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
        // this.fetchForecast(document.querySelector(".input").value);
    },
    storeSearch: function(city){

        var cities = JSON.parse(localStorage.getItem("City")) || [];
        if(!cities.includes(city)){
            cities.push(city)
           localStorage.setItem("City", JSON.stringify(cities))
           this.displaySearch()
        }
    },
    displaySearch: function(){
        var cities = JSON.parse(localStorage.getItem("City")) || [];
        citySearch.innerHTML = "";
        for(var city of cities ){
            // citySearch.innerHTML = "";
            // <button type="button" class="btn btn-primary custom-button">Search</button>
            var btnEL = document.createElement("button")
            btnEL.dataset.name = city;
            btnEL.className = "btn btn-secondary";
            btnEL.textContent = city; 
            citySearch.appendChild(btnEL)


        }
    }
    
}

document.querySelector(".city-search button").addEventListener("click", function(event){
    var name = event.target.getAttribute("data-name")
    if(event){
        event.preventDefault();
        // weather.displaySearch();
        weather.inputBar();
        
    }if (name){
        weather.inputBar();
        // citySearch.textContent = "";
    }
});

// adding a keyup event so the user can just press enter after typing in the city
document.querySelector(".input").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        event.preventDefault();
        // weather.displaySearch();

        
        weather.inputBar();
      

       
    }
})


document.querySelector(".city").innerText = today; 
weather.displaySearch();