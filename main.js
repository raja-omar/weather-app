const input = document.querySelector('input')

const btn = document.querySelector('button')

const temperatureLabel = document.querySelector('#temperature')

const feelslikeLabel = document.querySelector('#feels-like')

const humidityLabel = document.querySelector('#humidity')

const windLabel = document.querySelector('#wind')

const errorLabel = document.querySelector('#error-message')



async function getWeatherInfo(city) {
    errorLabel.textContent = ""
    try {
        if (!city) {
            throw new Error("Empty city name")
        }
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=8dc8f22ed39043a590b185636230809&q=${city}`, { mode: "cors" })
        if (!response.ok) {
            throw new Error("Invalid city name")
        }
        const obj = await response.json()
        return obj

    } catch (e) {
        errorLabel.textContent = e

    }


}

btn.addEventListener('click', handleClick)

async function handleClick() {
    humidityLabel.textContent = ""
    temperatureLabel.textContent = ""
    windLabel.textContent = ""
    const weatherObj = await getWeatherInfo(input.value)
    if (weatherObj) {
        setLabels(weatherObj)
    }

}

async function setLabels(obj) {
    humidityLabel.textContent += obj.current.humidity
    temperatureLabel.textContent += obj.current.feelslike_c
    windLabel.textContent += obj.current.wind_kph

}