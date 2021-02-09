function attachEvents() {
    let getWeatherEl = document.getElementById('submit');
    let searchedLocationEl = document.getElementById('location');

    let forecastEl = document.querySelector('#forecast');
    let forecastCurrentEl = forecastEl.querySelector("#current");
    let forecastUpcomingEl = forecastEl.querySelector("#upcoming");

    getWeatherEl.addEventListener('click', getDataAboutCities);

    function getDataAboutCities() {
        forecastEl.style.display = 'block';
        //delete old info
        if(forecastCurrentEl.querySelector('.forecast') != null) {
            forecastCurrentEl.querySelector('.forecast').outerHTML = '';
        }

        if(forecastUpcomingEl.querySelector('.forecast-info') != null) {
            forecastUpcomingEl.querySelector('.forecast-info').outerHTML = '';
        }

        //get query
        let location = searchedLocationEl.value;
        let url = 'https://judgetests.firebaseio.com/locations.json';
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                let data = JSON.parse(xhr.responseText);
                getCode(data, location);
            }
        };
        xhr.open("GET", url);
        xhr.send();
    }

    function getCode(data, location) {
        let code = undefined;
        for (const key in data) {
            if (data[key].name == location) {
                code = data[key].code;
            }
        }

        if (code != undefined) {
            getForecast(code);
            getThreeDayForecast(code);
            forecastEl.style.display = "block";
        }
    }

    function getForecast(code) {
        let url = `https://judgetests.firebaseio.com/forecast/today/${code}.json`;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                let data = JSON.parse(xhr.responseText);
                renderCurrentForecast(data);
            }
        };
        xhr.open("GET", url);
        xhr.send();
    }

    function getThreeDayForecast(code) {
        let url = `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                let data = JSON.parse(xhr.responseText);
                renderUpcommingForecast(data);
            }
        };
        xhr.open("GET", url);
        xhr.send();
    }

    function renderCurrentForecast(data) {
        let divForecast = document.createElement('div');
        divForecast.className = 'forecast';
        //span with symbol
        let spanSymbol = document.createElement('span');
        spanSymbol.className = 'condition symbol';
        if (data.forecast.condition == 'Sunny') {
            spanSymbol.innerHTML = '&#x2600;';
        } else if (data.forecast.condition == 'Partly sunny') {
            spanSymbol.innerHTML = '&#x26C5;';
        } else if (data.forecast.condition == 'Overcast') {
            spanSymbol.innerHTML = '&#x2601;';
        } else if (data.forecast.condition == 'Rain') {
            spanSymbol.innerHTML = '&#x2614;';
        }

        //span condition
        let spanCondition = document.createElement('span');
        spanCondition.className = 'condition';
        //children for span condition
        let spanDataOne = document.createElement('span');
        spanDataOne.className = 'forecast-data';
        spanDataOne.innerHTML = data.name;
        let spanDataTwo = document.createElement('span');
        spanDataTwo.className = 'forecast-data';
        spanDataTwo.innerHTML = data.forecast.low + "&#176;/" + data.forecast.high + '&#176;';
        let spanDataThree = document.createElement('span');
        spanDataThree.className = 'forecast-data';
        spanDataThree.innerHTML = data.forecast.condition;

        //append children
        spanCondition.appendChild(spanDataOne);
        spanCondition.appendChild(spanDataTwo);
        spanCondition.appendChild(spanDataThree);
        divForecast.appendChild(spanSymbol);
        divForecast.appendChild(spanCondition);
        forecastCurrentEl.appendChild(divForecast);

    }

    function renderUpcommingForecast(data) {
        let divForecastInfo = document.createElement('div');
        divForecastInfo.className = 'forecast-info';

        for (let i = 0; i < data.forecast.length; i++) {
            let spanUpcoming = document.createElement('span');
            spanUpcoming.className = 'upcoming';
            //first span element
            let spanDataOne = document.createElement('span');
            spanDataOne.className = 'symbol';
            if (data.forecast[i].condition == 'Sunny') {
                spanDataOne.innerHTML = '&#x2600;';
            } else if (data.forecast[i].condition == 'Partly sunny') {
                spanDataOne.innerHTML = '&#x26C5;';
            } else if (data.forecast[i].condition == 'Overcast') {
                spanDataOne.innerHTML = '&#x2601;';
            } else if (data.forecast[i].condition == 'Rain') {
                spanDataOne.innerHTML = '&#x2614;';
            }

            //second span element
            let spanDataTwo = document.createElement('span');
            spanDataTwo.className = 'forecast-data';
            spanDataTwo.innerHTML = data.forecast[i].low + "&#176;/" + data.forecast[i].high + '&#176;';

            //third span element
            let spanDataThree = document.createElement('span');
            spanDataThree.className = 'forecast-data';
            spanDataThree.innerHTML = data.forecast[i].condition;

            //append children
            spanUpcoming.appendChild(spanDataOne);
            spanUpcoming.appendChild(spanDataTwo);
            spanUpcoming.appendChild(spanDataThree);
            
            divForecastInfo.appendChild(spanUpcoming);
            forecastUpcomingEl.appendChild(divForecastInfo);
        }
    }

}

attachEvents();