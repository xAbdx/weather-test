/**
 * Auther:Yaseen Joba.
 * Last edit:25-1-2020.
 */
/**
 * initialize the data to display it on the chart. 
 */
let todayWeather = [];
let todayLabels = [];
let tomorrowWeather = [];
let tomorrowLabels = [];
/**
 * this data appears only once (just as a static data ).
 */
let dataset = [7.49, 6.28, 5.29, 4.56, 4.11, 3.83, 3.84, 3.58, 3.72, 6.82, 9.02, 10.02, 10.74, 11.25, 11.63, 11.47, 11.46, 10.87, 8.89, 7.45, 6.87, 6.51, 6.12, 5.95, 5.81];
/**
 * set the highest and lowest temperature automatically.
 */
document.getElementById('highest-temp').innerHTML = Math.max.apply(Math, dataset);
document.getElementById('lowest-temp').innerHTML = Math.min.apply(Math, dataset);
/**
 * Genarate the chart using chart.js and canvas tag.
 */
let chartCanvas = document.getElementById('my-chart').getContext('2d');
chartCanvas.canvas.style.width = "63%"
chartCanvas.canvas.style.height = "30%"
chartCanvas.canvas.style.padding = '5px';
let myChart = new Chart(chartCanvas, {
    type: 'line',
    data: {
        /**
         * this labels will change due to the day.
         */
        labels: ['12AM ', ' 1 AM', ' 2 AM', ' 3 AM', ' 4 AM', ' 5 AM', ' 6 AM', ' 7 AM', ' 8 AM', ' 9 AM', ' 10 AM', ' 11 AM', ' 12 PM', ' 1 PM', ' 2 PM', ' 3 PM', ' 4 PM', ' 5 PM', ' 6 PM', ' 7 PM', ' 8 PM', ' 9 PM', ' 10 PM', ' 11 PM'],
        datasets: [{
            data: dataset,
            borderWidth: 2,
            fill: false,
            borderColor: "#71b8a1",
            lineTension: 0,

        }]
    },
    options: {
        /**
         *as a user if I change the width of the page,the number of labels in x-axes will change as follow:
         *1 .  at width >= 1000  the maximum labels in x axes will equal 24.  
         *2 .  at width >= 900  the maximum labels in x axes will equal 20.  
         *3 .  at width >= 700  the maximum labels in x axes will equal 12.
         *4 .  at width < 700 the maximum labels in x axes will equal 7.    
         * @param {Object} chart represent the chart in canvas tag.
         * @param {object} size represent the width ang height for chart parameter.
         */
        onResize: function (chart, size) {
            let widthOfChart = chart.width;
            if (widthOfChart >= 1000) {
                chart.options.scales.xAxes[0].ticks.maxTicksLimit = 24;
            } else
                if (widthOfChart >= 900) {
                    chart.options.scales.xAxes[0].ticks.maxTicksLimit = 20;
                } else
                    if (widthOfChart >= 700) {
                        chart.options.scales.xAxes[0].ticks.maxTicksLimit = 8;
                    } else {
                        chart.options.scales.xAxes[0].ticks.maxTicksLimit = 7;
                    }
        },
        responsive: true,
        scales: {
            xAxes: [{
                /**
                 * this property to clear the x and y lines.(planes)
                 */
                gridLines: {
                    drawBorder: false,
                    display: false,
                },
                ticks: {
                    fontSize: 12,
                    fontColor: '#000',
                    padding: 15,
                    autoSkip: true,
                    maxTicksLimit: 5,
                    maxRotation: 0,
                    minRotation: 0,
                }

            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
                ticks: {
                    max: 30,
                    min: -10,
                    stepSize: 10,
                    padding: 10,
                    fontSize: 15,
                    /**
                     * this callback to add the unit.
                     * @param {string} label each element in the array labels.
                     * @param {number} index the index of this label
                     * @param {array} labels the array of labels in x-axes
                     */
                    callback: function (label, index, labels) {
                        switch (label) {
                            case -10:
                                return '-10 °C';
                            case 0:
                                return '0 °C';
                            case 10:
                                return '10 °C';
                            case 20:
                                return '20 °C';
                            case 30:
                                return '30 °C';
                        }
                    }
                }
            }],

        },
        elements: {
            point: {
                radius: 0
            }
        },
        legend: {
            labels: {
                defaultFontFamily: " 'Lora', serif "
            },
            display: false,
            onClick: null
        },

    },
});
/**
 * this function to process the data and figure out the hourly temperature and labels.
 * @param {Object} data this parameter represent all API data. 
 */
function dataForChart(data) {
    todayWeather = [];
    todayLabels = [];
    tomorrowWeather = [];
    tomorrowLabels = [];
    let allDays = data.hourlyTemp;
    for (let i = 0; i < 24; i++) {
        todayWeather.push(allDays[i].temp);
        if (allDays[i].time >= 12) {
            (allDays[i].time === 12) ? todayLabels.push(12 + "PM") : todayLabels.push(allDays[i].time - 12 + "PM");
        } else todayLabels.push(allDays[i].time == 0 ? ("12AM") : allDays[i].time + " AM");
    }
    for (let i = 24; i < 48; i++) {
        tomorrowWeather.push(allDays[i].temp);
        if (allDays[i].time >= 12) {
            (allDays[i].time === 12) ? tomorrowLabels.push(12 + "PM") : tomorrowLabels.push(allDays[i].time - 12 + "PM");
        } else tomorrowLabels.push(allDays[i].time == 0 ? ("12AM") : allDays[i].time + " AM");
    }
    myChart.data.datasets[0].data = todayWeather;
    myChart.data.labels = todayLabels;
    document.getElementById('highest-temp').innerHTML = Math.max.apply(Math, todayWeather);
    document.getElementById('lowest-temp').innerHTML = Math.min.apply(Math, todayWeather);
    myChart.update();
}
/**
 * add here the array of tempreture for this day from API.
 * note : the size of array should be 24 elements (first 24h)
 */
function today() {

    myChart.data.datasets[0].data = todayWeather;
    myChart.data.labels = todayLabels;
    document.getElementById('highest-temp').innerHTML = Math.max.apply(Math, todayWeather);
    document.getElementById('lowest-temp').innerHTML = Math.min.apply(Math, todayWeather);
    myChart.update();
    document.getElementById("dropdownMenuLink").innerHTML = "Today"
}
/**
 * add here the array of tempreture for this day from API.
 * note : the size of array should be 24 elements (second 24h)
 */
function tomorrow() {
    myChart.data.datasets[0].data = tomorrowWeather;
    myChart.data.labels = tomorrowLabels;
    document.getElementById('highest-temp').innerHTML = Math.max.apply(Math, tomorrowWeather);
    document.getElementById('lowest-temp').innerHTML = Math.min.apply(Math, tomorrowWeather);
    myChart.update();
    document.getElementById("dropdownMenuLink").innerHTML = "Tomorrow"
}