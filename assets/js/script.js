var date = $("#date")
var city = $(".city")
var today = moment().format("M/D/YYYY")

date.append(today)
city.prepend("Charlotte ") // .prepend will add the elemnt to the beggining... useful to enter the city to the info page once selected