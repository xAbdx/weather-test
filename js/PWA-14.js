

// const api = {
//     key: "edecdb269128e1a279402952cc9c8364",
//     base: "https://api.openweathermap.org/data/2.5/"
// }

// const searchBox = document.querySelector('#test');
// searchBox.addEventListener('keypress', setQuery);

// function setQuery(evt) {
//     if (evt.keyCode == 13) {
//         // getResults(searchBox.value);
//         console.log(searchBox.value); //for testing
//         alert('asdf')
//     }
// }

// // function getResults(query) {
// //     fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
// //         .then(weather => {
// //             return weather.json();
// //         }).then(displayResults);
// // }

// // function displayResults(weather) {
// //     console.log(weather);

// //     let now = new Date();
// //     let date = document.querySelector('#date');
// //     date.innerText = dateBuilder(now);

// //     let temp = document.querySelector('#tempreture');
// //     temp.innerText = `${Math.round(weather.main.temp)}°C`;

// //     let city = document.querySelector('#location');
// //     city.innerText = `${weather.name}, ${weather.sys.country}`;

// //     let description = document.querySelector('#description');
// //     description.innerText = `feels like ${Math.round(weather.main.feels_like)}•sunset ${weather.sys.sunset}`

// //     let windSpeed = document.querySelector('#wind-speed');
// //     windSpeed.innerText = `${weather.wind.speed} m/h`
    
// //     let humidity = document.querySelector('#humidity');
// //     humidity.innerText = `${weather.main.humidity}%`

// //     let pressure = document.querySelector('#pressure');
// //     pressure.innerText = `${weather.main.pressure} pa`
// // }

// // function dateBuilder(d) {
// //     let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// //     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]

// //     let day = days[d.getDay()];
// //     let date = d.getDate();
// //     let month = months[d.getMonth()];
// //     let year = d.getFullYear();

// //     return `${day} ${date} ${month}`
// // }