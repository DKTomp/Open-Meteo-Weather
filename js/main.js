async function generalData() {
    try {
        let weatherResponse = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=33.45&longitude=-96.38&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,cloud_cover,apparent_temperature,relative_humidity_2m,&current=is_day&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
        let weatherData = await weatherResponse.json()
        //console.log(weatherData)
        //console.log(weatherData.current)

        dataArray = Object.values(weatherData.current)
        let roundedData = dataArray.map(num => Math.round(num))
        let isDay = weatherData.current.is_day

        let curTemp = roundedData[2]
        document.getElementById("cur-temp").innerText = `${curTemp}°`
        let feelTemp = roundedData[7]
        document.getElementById("feels-temp").innerText = `Feels Like: ${feelTemp}°`
        let surWind = roundedData[3]
        let windDir = roundedData[4]
        document.getElementById("sur-wind").innerText = `${windDir}° ${surWind} mph`
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

async function uppersData() {
    try {
        let windResponse = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=33.45&longitude=-96.38&hourly=,wind_speed_975hPa,wind_speed_950hPa,wind_speed_925hPa,wind_speed_900hPa,wind_speed_850hPa,wind_speed_800hPa,wind_speed_700hPa,wind_speed_600hPa,wind_direction_975hPa,wind_direction_950hPa,wind_direction_925hPa,wind_direction_900hPa,wind_direction_850hPa,wind_direction_800hPa,wind_direction_700hPa,wind_direction_600hPa&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit`)
        let windData = await windResponse.json()
        //console.log(windData)

        let upperResponse = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=33.45&longitude=-96.38&hourly=temperature_2m,temperature_950hPa,temperature_925hPa,temperature_875hPa,temperature_850hPa,temperature_825hPa,temperature_775hPa,temperature_750hPa,temperature_725hPa,temperature_700hPa,temperature_675hPa,temperature_650hPa,temperature_625hPa,temperature_600hPa,temperature_575hPa,temperature_550hPa,wind_speed_950hPa,wind_speed_925hPa,wind_speed_875hPa,wind_speed_850hPa,wind_speed_825hPa,wind_speed_775hPa,wind_speed_750hPa,wind_speed_725hPa,wind_speed_700hPa,wind_speed_675hPa,wind_speed_650hPa,wind_speed_625hPa,wind_speed_600hPa,wind_speed_575hPa,wind_speed_550hPa,wind_direction_950hPa,wind_direction_925hPa,wind_direction_875hPa,wind_direction_850hPa,wind_direction_825hPa,wind_direction_775hPa,wind_direction_750hPa,wind_direction_725hPa,wind_direction_700hPa,wind_direction_675hPa,wind_direction_650hPa,wind_direction_625hPa,wind_direction_600hPa,wind_direction_575hPa,wind_direction_550hPa&models=gfs_seamless&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit`)
        let upperData = await upperResponse.json()
        //console.log(upperData)

        const elevationArray = [
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

        const upperspeedArray = [ 
            "wind_speed_950hPa",
            "wind_speed_925hPa",  
            "wind_speed_875hPa", 
            "wind_speed_850hPa", 
            "wind_speed_825hPa", 
            "wind_speed_775hPa",
            "wind_speed_750hPa",
            "wind_speed_725hPa",
            "wind_speed_700hPa",
            "wind_speed_675hPa",
            "wind_speed_650hPa",
            "wind_speed_625hPa",
            "wind_speed_600hPa",
            "wind_speed_575hPa",
            "wind_speed_550hPa",
        ]

        const upperdirArray = [ 
            "wind_direction_950hPa",
            "wind_direction_925hPa",  
            "wind_direction_875hPa", 
            "wind_direction_850hPa", 
            "wind_direction_825hPa", 
            "wind_direction_775hPa",
            "wind_direction_750hPa",
            "wind_direction_725hPa",
            "wind_direction_700hPa",
            "wind_direction_675hPa",
            "wind_direction_650hPa",
            "wind_direction_625hPa",
            "wind_direction_600hPa",
            "wind_direction_575hPa",
            "wind_direction_550hPa",
        ]

        const uppertempArray = [ 
            "temperature_950hPa",
            "temperature_925hPa",  
            "temperature_875hPa", 
            "temperature_850hPa", 
            "temperature_825hPa", 
            "temperature_775hPa",
            "temperature_750hPa",
            "temperature_725hPa",
            "temperature_700hPa",
            "temperature_675hPa",
            "temperature_650hPa",
            "temperature_625hPa",
            "temperature_600hPa",
            "temperature_575hPa",
            "temperature_550hPa",
        ]

        let upperSpeed = []
        let upperDir = []
        let upperTemp = []

        for (e of upperspeedArray) {
            let upSpeed = Math.round(upperData.hourly[e][0])
            upperSpeed.push(upSpeed)
        }

        for (e of upperdirArray) {
            let upDir = Math.round(upperData.hourly[e][0])
            upperDir.push(upDir)
        }

        for (e of uppertempArray) {
            let upTemp = Math.round(upperData.hourly[e][0])
            upperTemp.push(upTemp)
        }

        for (i = 0; i < upperspeedArray.length; i++) {
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

            newHR = document.createElement('hr')
            newHR.classList.add('hr2')
            document.getElementById("upperWinds").appendChild(newHR)
        }
    
    } catch (error) {
        console.log("wind api error")
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

    formattedTime = now.toLocaleTimeString(undefined, options)
    document.getElementById("time").innerText = formattedTime
}

generalData()
uppersData()
getTime()
