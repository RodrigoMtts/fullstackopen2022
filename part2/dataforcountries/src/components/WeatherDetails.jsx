import {useState, useEffect } from "react"
import axios from 'axios'

const WeatherDetails = ({country}) => {
    const [weather, setWeather] = useState(0)

    useEffect( () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
            .then( (response) => {
               setWeather( response.data)
            })
    },[])

    const temp = weather !== 0 ? `${Math.round(weather.main.temp - 273)}°` : '0'
    const linkIcon = weather !== 0 ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : ''
    const wind = weather !== 0 ? `${weather.wind.speed} m/s` : '0 m/s'

    return (
        <>
            <h2>Weather in {country.capital}</h2>
            <div>temperature {temp} Celsius </div>
            <img src={linkIcon} alt="Image of weather error" />
            <div>wind {wind}</div>
        </>
    )
}

export default WeatherDetails