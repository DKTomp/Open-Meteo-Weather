const pressE = [
    "950hPa",
    "925hPa",  
    "875hPa", 
    "850hPa", 
    "825hPa", 
    "775hPa",
    "750hPa",
    "725hPa",
    "700hPa",
    "675hPa",
    "650hPa",
    "625hPa",
    "600hPa",
    "575hPa",
    "550hPa"
]

let hour = 1
let upperDataVar;
let weatherData;
let upperSpeed;
let upperTemp;
let forecastSpeed;
let forecastTemp;

const prevButton = document.getElementById("prevHour")
const nextButton = document.getElementById("nextHour")
const celButton = document.getElementById('cel')
const farButton = document.getElementById('far')
const kphButton = document.getElementById('kph')
const mphButton = document.getElementById('mph')
const ktsButton = document.getElementById('kts')
prevButton.addEventListener("click", prevHour)
nextButton.addEventListener("click", nextHour)
celButton.addEventListener("click", calculateC)
farButton.addEventListener('click', CalculateF)
kphButton.addEventListener('click', calculateKPH)
mphButton.addEventListener('click', calcuateMPH)
ktsButton.addEventListener('click', calculateKTS)

async function generalData() {
    try {
        let weatherResponse = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=33.45&longitude=-96.38&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,cloud_cover,apparent_temperature,relative_humidity_2m,&current=is_day&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
        weatherData = await weatherResponse.json()
        currentSurfaceWeather()
        
        } catch (error) {
        console.log(error)
    }
}

function currentSurfaceWeather() {
    let isDay = weatherData.current.is_day

    let clock = getTime()
    document.getElementById("time").innerText = clock

    let curTemp = Math.round(weatherData.current.temperature_2m)
    document.getElementById("cur-temp").innerText = `${curTemp}°F`
    let feelTemp = Math.round(weatherData.current.apparent_temperature)
    document.getElementById("feels-temp").innerText = `${feelTemp}°F`
    let surWind = Math.round(weatherData.current.wind_speed_10m)
    let windDir = determineWindDir(weatherData.current.wind_direction_10m)
    document.getElementById("sur-wind").innerText = `${windDir} ${surWind} mph`
    let windGust = Math.round(weatherData.current.wind_gusts_10m)
    document.getElementById("wind-gust").innerText = `${windGust} mph`
    let cloudCvr = Math.round(weatherData.current.cloud_cover)
    document.getElementById("cloud-cvr").innerText = `${cloudCvr}%`
    let humidity = Math.round(weatherData.current.relative_humidity_2m)
    document.getElementById("humidity").innerText = `${humidity}%`

    svgIcon(cloudCvr, isDay)   
}

function calculateC() {
    if (!celButton.classList.contains('selected')) {
        celButton.classList.toggle('selected')
        farButton.classList.toggle('selected')

        let curTemp = weatherData.current.temperature_2m
        curTemp = Math.round((curTemp - 32) * (5 / 9))
        document.getElementById("cur-temp").innerText = `${curTemp}°C`

        let feelTemp = weatherData.current.apparent_temperature
        feelTemp = Math.round((feelTemp - 32) * (5 / 9))
        document.getElementById("feels-temp").innerText = `${feelTemp}°C`

        for (let i = 0; i < upperTemp.length; i++) {
            let upperTempC = Math.round((upperTemp[i] - 32) * (5 / 9))
            let forUpperTempC = Math.round((forecastTemp[i] - 32) * (5 / 9))
            document.getElementById('temp' + i).innerText = `${upperTempC}°C`
            document.getElementById('fortemp' + i).innerText = `${forUpperTempC}°C`
        }
    }
}

function CalculateF() {
    if (!farButton.classList.contains('selected')) {
        celButton.classList.toggle('selected')
        farButton.classList.toggle('selected')

        let curTemp = Math.round(weatherData.current.temperature_2m)
        document.getElementById("cur-temp").innerText = `${curTemp}°F`

        let feelTemp = Math.round(weatherData.current.apparent_temperature)
        document.getElementById("feels-temp").innerText = `${feelTemp}°C`

        for (let i = 0; i < upperTemp.length; i++) {
            document.getElementById('temp' + i).innerText = `${upperTemp[i]}°F`
            document.getElementById('fortemp' + i).innerText = `${forecastTemp[i]}°F`
        }
    }
}

function calculateKPH() {
    if (!kphButton.classList.contains('selected')) {
        kphButton.classList.toggle('selected')
        if (mphButton.classList.contains('selected')) {
            mphButton.classList.toggle('selected')
        }
        if (ktsButton.classList.contains('selected')) {
            ktsButton.classList.toggle('selected')
        }
        
        let surWind = weatherData.current.wind_speed_10m
        let windDir = determineWindDir(weatherData.current.wind_direction_10m)
        surWind = Math.round(surWind * 1.609)
        document.getElementById("sur-wind").innerText = `${windDir} ${surWind} km/h`
        let windGust = weatherData.current.wind_gusts_10m
        windGust = Math.round(windGust * 1.609)
        document.getElementById("wind-gust").innerText = `${windGust} km/h`
        
        for ( let i = 0; i <  15; i++) {
            let calcKPH = Math.round(upperSpeed[i] * 1.609)
            let calcforKPH = Math.round(forecastSpeed[i] * 1.151)
            document.getElementById('speed' + i).innerText = `at ${calcKPH} km/h`
            document.getElementById('forspeed' + i).innerText = `at ${calcforKPH} km/h`
        }
    }
}

function calcuateMPH() {
    if (!mphButton.classList.contains('selected')) {
        mphButton.classList.toggle('selected')
        if (kphButton.classList.contains('selected')) {
            kphButton.classList.toggle('selected')
        }
        if (ktsButton.classList.contains('selected')) {
            ktsButton.classList.toggle('selected')
        }
    }

    let surWind = Math.round(weatherData.current.wind_speed_10m)
    let windDir = determineWindDir(weatherData.current.wind_direction_10m)
    document.getElementById("sur-wind").innerText = `${windDir} ${surWind} mph`
    let windGust = Math.round(weatherData.current.wind_gusts_10m)
    document.getElementById("wind-gust").innerText = `${windGust} mph`

    for (let i = 0; i <  15; i++) {
        document.getElementById('speed' + i).innerText = `at ${upperSpeed[i]} mph`
        document.getElementById('forspeed' + i).innerText = `at ${forecastSpeed[i]} mph`
    }
}

function calculateKTS() {
    if (!ktsButton.classList.contains('selected')) {
        ktsButton.classList.toggle('selected')
        if (kphButton.classList.contains('selected')) {
            kphButton.classList.toggle('selected')
        }
        if (mphButton.classList.contains('selected')) {
            mphButton.classList.toggle('selected')
        }
    }

    let surWind = weatherData.current.wind_speed_10m
    let windDir = determineWindDir(weatherData.current.wind_direction_10m)
    surWind = Math.round(surWind * 1.151)
    document.getElementById("sur-wind").innerText = `${windDir} ${surWind} kts`
    let windGust = weatherData.current.wind_gusts_10m
    windGust = Math.round(windGust * 1.151)
    document.getElementById("wind-gust").innerText = `${windGust} kts`

    for (let i = 0; i <  15; i++) {
        let calcKTS = Math.round(upperSpeed[i] * 1.151)
        let calcforKTS = Math.round(forecastSpeed[i] * 1.151)
        document.getElementById('speed' + i).innerText = `at ${calcKTS} kts`
        document.getElementById('forspeed' + i).innerText = `at ${calcforKTS} kts`
    }
}

function svgIcon(cvr, day) {
    let cloudImg = document.getElementById("sky-cond")

    if (day === 1) {
        if (cvr >= 88) {
            cloudImg.src = "./images/cloudy.svg"
        } else if (cvr < 88 && cvr > 50) {
            cloudImg.src = "./images/mostly-cloudy-day.svg"
        } else if (cvr <= 50 && cvr > 10) {
            cloudImg.src = "./images/mostly-sunny-day.svg"
        } else if (cvr <= 10) {
            cloudImg.src = "./images/sunny.svg"
        }
    } else {
        if (cvr >= 88) {
            cloudImg.src = "./images/cloudy.svg"
        } else if (cvr < 88 && cvr > 50) {
            cloudImg.src = "./images/mostly-cloudy-night.svg"
        } else if (cvr <= 50 && cvr > 10) {
            cloudImg.src = "./images/partly-cloudy-night.svg"
        } else if (cvr <= 10) {
            cloudImg.src = "./images/clear-night.svg"
        }
    }
}

function determineWindDir(dir) {
    let cardDir = ""

    const directions = [
        {min: 348.5, max: 10.5, val: "N"},
        {min: 10.5, max: 33.5, val: "NNE"},
        {min: 33.5, max: 56.5, val: "NE"},
        {min: 56.5, max: 78.5, val: "ENE"},
        {min: 78.5, max: 101.5, val: "E"},
        {min: 101.5, max: 123.5, val: "ESE"},
        {min: 123.5, max: 146.5, val: "SE"},
        {min: 146.5, max: 168.5, val: "SSE"},
        {min: 168.5, max: 191.5, val: "S"},
        {min: 191.5, max: 213.5, val: "SSW"},
        {min: 213.5, max: 236.5, val: "SW"},
        {min: 236.5, max: 258.5, val: "WSW"},
        {min: 258.5, max: 281.5, val: "W"},
        {min: 281.5, max: 303.5, val: "WNW"},
        {min: 303.5, max: 326.5, val: "NW"},
        {min: 326.5, max: 348.5, val: "NNW"},
    ]

    if (dir > 348.5) {
        dir = dir - 360
    }

    for (let i = 0; i <= 15; i++){
        if (dir < 10.5) {
            cardDir = directions[i].val
            return cardDir
        } else if (dir > directions[i].min && dir < directions[i].max) {
            cardDir = directions[i].val
            return cardDir
        } else {
            continue
        }
    }
}

async function uppersData() {
    try {
        let upperResponse = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=33.45&longitude=-96.38&hourly=temperature_2m,temperature_950hPa,temperature_925hPa,temperature_875hPa,temperature_850hPa,temperature_825hPa,temperature_775hPa,temperature_750hPa,temperature_725hPa,temperature_700hPa,temperature_675hPa,temperature_650hPa,temperature_625hPa,temperature_600hPa,temperature_575hPa,temperature_550hPa,wind_speed_950hPa,wind_speed_925hPa,wind_speed_875hPa,wind_speed_850hPa,wind_speed_825hPa,wind_speed_775hPa,wind_speed_750hPa,wind_speed_725hPa,wind_speed_700hPa,wind_speed_675hPa,wind_speed_650hPa,wind_speed_625hPa,wind_speed_600hPa,wind_speed_575hPa,wind_speed_550hPa,wind_direction_950hPa,wind_direction_925hPa,wind_direction_875hPa,wind_direction_850hPa,wind_direction_825hPa,wind_direction_775hPa,wind_direction_750hPa,wind_direction_725hPa,wind_direction_700hPa,wind_direction_675hPa,wind_direction_650hPa,wind_direction_625hPa,wind_direction_600hPa,wind_direction_575hPa,wind_direction_550hPa&models=gfs_seamless&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit`)
        upperDataVar = await upperResponse.json()
        parseCurrentData(pressE)
        ParseForecastData(pressE)
        
        } catch (error) {
            console.log(error)
    }
}

function parseCurrentData(pressElevation) {
    upperSpeed = []
    let upperDir = []
    upperTemp = []

    for (let e of pressElevation) {
        const speedConcact = "wind_speed_" + e
        const dirConcact = "wind_direction_" + e
        const tempConcact = "temperature_" + e
        
        let upSpeed = Math.round(upperDataVar.hourly[speedConcact][0])
        let upDir = Math.round(upperDataVar.hourly[dirConcact][0])
        let upTemp = Math.round(upperDataVar.hourly[tempConcact][0])

        upperSpeed.push(upSpeed)
        upperDir.push(upDir)
        upperTemp.push(upTemp)
    }
    
    for (let i = 0; i < 15; i++) {
        document.getElementById('dir' + i).innerText = `${upperDir[i]}°`
        document.getElementById('speed' + i).innerText = `at ${upperSpeed[i]} mph`
        document.getElementById('temp' + i).innerText = `${upperTemp[i]}°F`
    }
}

function ParseForecastData(pressElevation) {
    let clock = getForecastTime()
    let forecastdisplay = `Forecast Time: ${clock}`
    document.getElementById("forecastHeader").innerText = forecastdisplay

    forecastSpeed = []
    let forecastDir = []
    forecastTemp = []

    for (let e of pressElevation) {
        const speedConcact1 = "wind_speed_" + e
        const dirConcact1 = "wind_direction_" + e
        const tempConcact1 = "temperature_" + e

        let forSpeed = Math.round(upperDataVar.hourly[speedConcact1][hour])
        let forDir = Math.round(upperDataVar.hourly[dirConcact1][hour])
        let forTemp = Math.round(upperDataVar.hourly[tempConcact1][hour])

        forecastSpeed.push(forSpeed)
        forecastDir.push(forDir)
        forecastTemp.push(forTemp)
    }

    if (mphButton.classList.contains('selected')) {
        for (let i = 0; i < 15; i++) {
            document.getElementById('fordir' + i).innerText = `${forecastDir[i]}°`
            document.getElementById('forspeed' + i).innerText = `at ${forecastSpeed[i]} mph`
        }
    } else if (kphButton.classList.contains('selected')) {
        for (let i = 0; i < 15; i++) {
            let forecastkphSpeed = Math.round(forecastSpeed[i] * 1.609)
            document.getElementById('fordir' + i).innerText = `${forecastDir[i]}°`
            document.getElementById('forspeed' + i).innerText = `at ${forecastkphSpeed} km/h`
        }
    } else if (ktsButton.classList.contains('selected')) {
        for (let i = 0; i < 15; i++) {
            let forecastktsSpeed = Math.round(forecastSpeed[i] * 1.151)
            document.getElementById('fordir' + i).innerText = `${forecastDir[i]}°`
            document.getElementById('forspeed' + i).innerText = `at ${forecastktsSpeed} kts`
        }
    }

    if (farButton.classList.contains('selected')) {
        for (let i = 0; i < 15; i++) {
            document.getElementById('fortemp' + i).innerText = `${forecastTemp[i]}°F`
        }
    } else if (celButton.classList.contains('selected')) {
        for (let i = 0; i < 15; i++) {
            let celtemp = Math.round((forecastTemp[i] - 32) * (5 / 9))
            document.getElementById('fortemp' + i).innerText = `${celtemp}°C`
        }
    }
}

function getTime() {
    const now = new Date()
    const options = {
        timeZone: 'America/Chicago',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }

    let formattedTime = now.toLocaleTimeString(undefined, options)
    return formattedTime
}

function getForecastTime() {
    const now = new Date()
    let hours = now.getHours()
    let forecastHour = hours + hour
    let ampm = "AM"
    if (forecastHour >= 36) {
        ampm = "PM"
        if (forecastHour === 36) {
            forecastHour -= 24
        } else {
            forecastHour -= 36
        }
    }  else if (forecastHour >= 24) {
        ampm = "AM"
        if (forecastHour === 24) {
            forecastHour -= 12
        } else {
            forecastHour -= 24
        }
    } else if (forecastHour >= 12) {
        ampm = "PM"
        if (forecastHour > 12) {
            forecastHour -= 12
        }
    }

    let display = `${forecastHour}:00 ${ampm}`
    return display
}

function prevHour() {
    if (hour > 1) {
        hour -= 1
        ParseForecastData(pressE)
    }
}

function nextHour() {
    if (hour < 23)
    hour += 1
    ParseForecastData(pressE)
}

generalData()
uppersData()
getTime()
