/**
 * A function that show the results of a search query in an autocomplete fashion
 * the results are concur from an API 
 */
function cityResultsBuilder() {
    let city = document.getElementById("autocomplete").value.toString();
    let cities = document.getElementById("cities");
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + city + ".json?autocomplete=true&types=place&access_token=pk.eyJ1IjoiYWJkMjgiLCJhIjoiY2trOXAwc2pwMHppazJwbzB2emw3N24yOCJ9.8-x7FnhqNvFe027ajKkemw";

    if (city == "")
        cities.innerHTML = "";
    else {
        fetch(url)
            .then(response => response.json())
            .then(data => {

                let result = data;
                console.log(result);
                let inner = "";
                for (var i = 0; i < result.features.length; i++) {
                    inner += "<option value='" + result.features[i].place_name + "'></option>";
                }
                cities.innerHTML = inner;
            });
    }
}

/**
 * A function that call Weather data change when user choose a value from the datalist
 */
function changeWeatherData() {
    let city = document.getElementById("autocomplete").value;
    weatherByCityName(city.substring(0, city.search(',')));
}