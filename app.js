const apiKey = '86f58b0baa80b2546430cf7ec51a40c7'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

const weatherIcon = document.querySelector('.weather-icon')
//for the searchbox 
const searchBox = document.querySelector('.search input')
console.log(searchBox)
const searchBtn = document.querySelector('.search button')
const city = document.querySelector('.city')
const weatherDiv = document.querySelector('.weather')
const card = document.querySelector('.card')

searchBtn.addEventListener('click', function(){
    city.innerHTML = searchBox.value
    checkWeather(searchBox.value)
})
function invalidMessage () { 
    const errMessage = document.createElement('p')
    errMessage.style.marginTop = "30px"
    errMessage.innerText = "Invalid City Name" 
    card.appendChild(errMessage)

    //removing the errmessage element with set timeout function
    setTimeout(function(){
        card.removeChild(errMessage)
    }, 3000)
    
}


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    
    if(response.status == 404){
        weatherDiv.style.display = "none" 
        invalidMessage()
        
    }
    else{
        weatherDiv.style.display = 'block'
        let data = await response.json()
        console.log(data)
        
        const temp = document.querySelector('.temp')
        temp.innerHTML = `${Math.round(data.main.temp)}°c`
    
        const humidity = document.querySelector('.humidity')
        humidity.innerHTML =` ${data.main.humidity}%`
    
        const wind = document.querySelector('.wind')
        wind.innerHTML = `${data.wind.speed}km/hr`
    
        console.log(data.weather[0].main)
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png"
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png"
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png"
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png"
        }
        else if(data.weather[0].main == "Humidity"){
            weatherIcon.src = "images/humidity.png"
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "images/snow.png"
        }
        else if(data.weather[0].main == "Wind"){
            weatherIcon.src = "images/wind.png"
        }
    }
}


