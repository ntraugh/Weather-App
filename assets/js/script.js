var date = $("#date")
// var city = $(".city")
var today = moment().format("(M/D/YYYY)")
// var temp = $(".temp")

date.append(today)
// city.prepend("Charlotte ") // .prepend will add the elemnt to the beggining... useful to enter the city to the info page once selected
// temp.append("74")

var weather = {
    // logging our api key we got from openweather
    apiKey: "f3815a7ae5443a3f2cfb1fccc44d33f1",
    // creating a function to fetch the weather from the url 
    fetchWeather: function(){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Charlotte&units=imperial&appid=f3815a7ae5443a3f2cfb1fccc44d33f1"
        ).then((response) => response.json())
        .then((data) => console.log(data));
    }
}