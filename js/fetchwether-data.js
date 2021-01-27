//an obj with all weather data that will be used through the website
let weatherData = {};
//this parameter value is from the 2ed api
let country;
/**
 * get all needed data using one call and current weather apis
 * @param  {String} cityName city Name 
 */
function weatherByCityName(cityName) {
    var key = 'cad86314552b94deb5b82fa8e5e1e33e';
    //this api is used to get the country name + lat + lon
    let apiCountry = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key;
    let cityLat, cityLon;
    fetch(apiCountry)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            getCountryName(data);
            cityLon = data.coord.lon;
            cityLat = data.coord.lat;
            apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon +
                '&units=metric' + '&exclude=minutely&appid=' + key;
            //weather data
            fetch(apiUrl)
                .then(function (resp) { return resp.json() })
                .then(function (countryApidata) {
                    drawWeather(countryApidata);
                })
                .catch(function () {
                    // catch any errors
                });
        })
        .catch(function () {
            // catch any errors
        });
}
/**
 * get all needed data using one call and current weather apis
 * @param  {Number} cityLat The Latitude 
 * @param  {Number} cityLon The Longitude
 */
function weatherByLatLon(cityLat, cityLon) {
    var key = 'cad86314552b94deb5b82fa8e5e1e33e';
    let apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon +
        '&units=metric' + '&exclude=minutely&appid=' + key;
    let apiCountry = 'https://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + key
    fetch(apiCountry)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            getCountryName(data);
            fetch(apiUrl)
                .then(function (resp) { return resp.json() })
                .then(function (data) {
                    drawWeather(data);
                })
                .catch(function () {
                    // catch any errors
                });
        })
        .catch(function () {
            // catch any errors
        });
}

/**
 * creat a new obj that includes the data that will be used in the website 
 * @param  {Object} data data for a specific city
 */
function drawWeather(data) {
    let currentDate = new Date(data.current.dt * 1000 + data.timezone_offset);
    let sunsetDate = new Date(data.current.sunset * 1000 + data.timezone_offset);
    //This object include all data that will be used in the website 
    //All data are in the correct units and temp is in celsius 
    weatherData = {
        'currentDate': currentDate,
        //DailySide: summary componant
        'currentWeatherIcon': `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`,
        'currentWeekDay': getDayName(currentDate.getDay()), //sat ,sun...
        'currentDay': currentDate.getDate(),
        'curruntMonthName': getMonthName(currentDate.getMonth()),
        'cityName': data.timezone.substring(data.timezone.indexOf("/") + 1),
        'countryName': country,
        'currentTemp': data.current.temp,
        'feelsLike': data.current.feels_like,
        'sunsetTime': sunsetDate.getHours() + ':' + sunsetDate.getMinutes(),
        'windSpeed': data.daily[0].wind_speed * 3600,
        'humidity': data.daily[0].humidity,
        'pressure': data.daily[0].pressure * 100,
        //DailySide:Chance of Rain componant
        //Array of object for time and raining for the next 24H
        'hourlyChanceOfRain': getChance(data.hourly, data.timezone_offset),
        //ForcasteSide:
        'dailyHumidity': [],
        'dailyIcon': [],
        'dailyDayTemp': [],
        'dailyNightTemp': [],
        'dailyChanceOfPop': [],
        //Bottom sec in forcast side
        //The Api provide hourly data for 48H only
        //hourlyTemp is array of objs that provide the time and temp at that hour
        'hourlyTemp': getHourlyTemp(data.hourly, data.timezone_offset),
        //there is lowest&highest temp for the next 7 days but u only need the next 3 days
        'lowestTemp': [data.daily[0].temp.min, data.daily[1].temp.min, data.daily[2].temp.min],
        'highestTemp': [data.daily[0].temp.max, data.daily[1].temp.max, data.daily[2].temp.max],
    };
    //Change the daily data in the weatherData obj-the currant day is not counted
    for (var i = 1; i < 8; i++) {
        weatherData['dailyHumidity'].push(data.daily[i].humidity);
        weatherData['dailyIcon'].push(`http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`);
        weatherData['dailyDayTemp'].push(data.daily[i].temp.day);
        weatherData['dailyNightTemp'].push(data.daily[i].temp.night);
        weatherData['dailyChanceOfPop'].push(data.daily[i].pop);
    }

    // let temp = document.querySelector('#tempreture');
    // temp.innerText = `${Math.round(weather.main.temp)}°C`;

    // let city = document.querySelector('#location');
    // city.innerText = `${weather.name}, ${weather.sys.country}`;

    // let description = document.querySelector('#description');
    // description.innerText = `feels like ${Math.round(weatherData.feelsLike)}•sunset ${weatherData.sunsetTime}`

    // let windSpeed = document.querySelector('#wind-speed');
    // windSpeed.innerText = `${weather.wind.speed} m/h`

    // let humidity = document.querySelector('#humidity');
    // humidity.innerText = `${weather.main.humidity}%`

    // let pressure = document.querySelector('#pressure');
    // pressure.innerText = `${weather.main.pressure} pa`

    dataForChart(weatherData);
    //console.log(weatherData);
}
/**
 * give country var a value based on the lat&lon
 * @param  {Object} data data from the 2ed api
 */
function getCountryName(data) {
    country = data.sys.country;
}
/**
 * return day as a string
 * @param  {Number} day day number 0-6
 * @return {string} the weekday that the param represnts
 */
function getDayName(day) {
    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekday[day];
}
/**
 * return day as a string
 * @param  {Number} day month number 0-11
 * @return {String} month name that the param represents
 */
function getMonthName(month) {
    let monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthsName[month];
}
/**
 * the time and chance of rain for it for the next 24H
 * @param  {Object} hourlyForcast the forcast in hours in the next 48H
 * @param  {Number} timezoneOffset timezone offset at unix unit
 * @return {Array} time and chance of rain for the next 24 hours
 */
function getChance(hourlyForcast, timezoneOffset) {
    let chanceArray = [];
    for (var i = 0; i < 24; i++) {
        let chanceObj = {
            'time': (new Date(hourlyForcast[i].dt * 1000 + timezoneOffset).getHours()),
            'chanceOfRain': hourlyForcast[i].pop
        }
        chanceArray.push(chanceObj);
    }
    return chanceArray;
}
/**
 * the temp for the next 48H
 * @param  {Object} hourlyForcast the forcast in hours in the next 48H
 * @param  {Number} timezoneOffset timezone offset at unix unit
 * @return {Array} objs of time and temp and every hour for the next 48H
 */
function getHourlyTemp(hourlyForcast, timezoneOffset) {
    let temp = [];
    for (var i = 0; i < 48; i++) {
        let tempObj = {
            'time': (new Date(hourlyForcast[i].dt * 1000 + timezoneOffset).getHours()),
            'temp': hourlyForcast[i].temp
        }
        temp.push(tempObj);
    }
    return temp;
}