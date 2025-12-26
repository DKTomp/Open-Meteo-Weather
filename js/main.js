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

const elevationA = [
    "1000 ft:",
    "2000 ft:",
    "3000 ft:",
    "4000 ft:",
    "5000 ft:",
    "6000 ft:",
    "7000 ft:",
    "8000 ft:",
    "9000 ft:",
    "10000 ft:",
    "11000 ft:",
    "12000 ft:",
    "13000 ft:",
    "14000 ft:",
    "15000 ft:"
]

let hour = 1
const prevButton = document.getElementById("prevHour")
const nextButton = document.getElementById("nextHour")
prevButton.addEventListener("click", prevHour)
nextButton.addEventListener("click", nextHour)

async function generalData() {
    try {
        let weatherResponse = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=33.45&longitude=-96.38&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,cloud_cover,apparent_temperature,relative_humidity_2m,&current=is_day&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
        let weatherData = await weatherResponse.json()
        //console.log(weatherData)
        //console.log(weatherData.current)

        dataArray = Object.values(weatherData.current)
        let roundedData = dataArray.map(num => Math.round(num))
        let isDay = weatherData.current.is_day

        let clock = getTime()
        document.getElementById("time").innerText = clock
        let curTemp = roundedData[2]
        document.getElementById("cur-temp").innerText = `${curTemp}°`
        let feelTemp = roundedData[7]
        document.getElementById("feels-temp").innerText = `Feels Like: ${feelTemp}°`
        let surWind = roundedData[3]
        let windDir = determineWindDir(roundedData[4])
        document.getElementById("sur-wind").innerText = `${windDir} ${surWind} mph`
        let windGust = roundedData[5]
        document.getElementById("wind-gust").innerText = `${windGust} mph`
        let cloudCvr = roundedData[6]
        document.getElementById("cloud-cvr").innerText = `${cloudCvr}%`
        let humidity = roundedData[8]
        document.getElementById("humidity").innerText = `${humidity}%`

        svgIcon(cloudCvr, isDay)
        
    } catch (error) {
        console.log("API Error")
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
    cardDir = ""

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

    for (i = 0; i <= 15; i++){
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
        let upperData = await upperResponse.json()
        return upperData

        } catch (error) {
        console.log("wind api error")
    }
}

async function parseCurrentData(pressElevation, elevationArray) {
    try{
        let upperData = await uppersData()
        let upperSpeed = []
        let upperDir = []
        let upperTemp = []

        for (e of pressElevation) {
            const speedConcact = "wind_speed_" + e
            const dirConcact = "wind_direction_" + e
            const tempConcact = "temperature_" + e
            
            let upSpeed = Math.round(upperData.hourly[speedConcact][0])
            let upDir = Math.round(upperData.hourly[dirConcact][0])
            let upTemp = Math.round(upperData.hourly[tempConcact][0])

            upperSpeed.push(upSpeed)
            upperDir.push(upDir)
            upperTemp.push(upTemp)
        }
        
        for (i = 0; i < pressElevation.length; i++) {
            newDiv = document.createElement('div')
            newDiv.classList.add('line-container')
            newDiv.id = 'upperLine' + i
            document.getElementById("upperWinds").appendChild(newDiv)

            newPar = document.createElement('p')
            newPar.innerText = `${elevationArray[i]} ${upperDir[i]}° at ${upperSpeed[i]} mph`
            document.getElementById("upperLine" + i).appendChild(newPar)

            newPar2 = document.createElement('p')
            newPar2.innerText = `${upperTemp[i]}°F`
            document.getElementById("upperLine" + i).appendChild(newPar2)

            if (i < pressElevation.length - 1) {
            newHR = document.createElement('hr')
            newHR.classList.add('col-12')
            newHR.classList.add('hr2')
            document.getElementById("upperWinds").appendChild(newHR)
            }
        }
    } catch (error) {
        console.log("wind api error")
    }
}

async function ParseForecastData(pressElevation, elevationArray, hour) {
    try {
        clock = getForecastTime()
        let forecastdisplay = `Forecast Time: ${clock}`
        


        document.getElementById("forecastUpperWinds").innerHTML = ""
        document.getElementById("forecastHeader").innerText = forecastdisplay
        let upperData = await uppersData()
        let forecastSpeed = []
        let forecastDir = []
        let forecastTemp = []


        for (e of pressElevation) {
            const speedConcact1 = "wind_speed_" + e
            const dirConcact1 = "wind_direction_" + e
            const tempConcact1 = "temperature_" + e

            let forSpeed = Math.round(upperData.hourly[speedConcact1][hour])
            let forDir = Math.round(upperData.hourly[dirConcact1][hour])
            let forTemp = Math.round(upperData.hourly[tempConcact1][hour])

            forecastSpeed.push(forSpeed)
            forecastDir.push(forDir)
            forecastTemp.push(forTemp)
        }
        

        for (i = 0; i < pressElevation.length; i++) {
            forNewDiv = document.createElement('div')
            forNewDiv.classList.add('line-container')
            forNewDiv.id = 'forupperLine' + i
            document.getElementById("forecastUpperWinds").appendChild(forNewDiv)

            forNewPar = document.createElement('p')
            forNewPar.innerText = `${elevationArray[i]} ${forecastDir[i]}° at ${forecastSpeed[i]} mph`
            document.getElementById("forupperLine" + i).appendChild(forNewPar)

            forNewPar2 = document.createElement('p')
            forNewPar2.innerText = `${forecastTemp[i]}°F`
            document.getElementById("forupperLine" + i).appendChild(forNewPar2)

            if (i < pressElevation.length - 1) {
            forNewHR = document.createElement('hr')
            forNewHR.classList.add('col-12')
            forNewHR.classList.add('hr2')
            document.getElementById("forecastUpperWinds").appendChild(forNewHR)
            }
        }
    } catch (error) {
        console.log(error)
        console.log("forecast api error")
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
    if (forecastHour > 36) {
        ampm = "PM"
        forecastHour = forecastHour - 36
    } else if (forecastHour === 36) {
        ampm = "PM"
        forecastHour = forecastHour - 24
    } else if (forecastHour > 24) {
        ampm = "AM"
        forecastHour = forecastHour - 24
    } else if (forecastHour === 24) {
        ampm = "AM"
        forecastHour = forecastHour - 12
    } else if (forecastHour >= 12) {
        ampm = "PM"
        forecastHour = forecastHour - 12
    }

    let display = `${forecastHour}:00 ${ampm}`
    return display
}

function prevHour(event) {
    if (hour > 1) {
        hour = hour - 1
        ParseForecastData(pressE, elevationA, hour)
    }
}

function nextHour(event) {
    if (hour < 23)
    hour = hour + 1
    ParseForecastData(pressE, elevationA, hour)
}

generalData()
uppersData()
parseCurrentData(pressE, elevationA)
ParseForecastData(pressE, elevationA, hour)
getTime()



