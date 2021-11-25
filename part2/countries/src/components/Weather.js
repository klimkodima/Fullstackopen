import React, { useState, useEffect } from "react"
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState()
  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: capital[0]
  }
  useEffect(() => {
    axios.get('http://api.weatherstack.com/current', { params })
      .then(response => {
        setWeather(response.data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capital])
  if (weather === undefined) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>{`Weather in ${capital}`}</h2>
        <br />
        <p> <b>temperature</b> {`${weather.current.temperature} Celcius`}</p>
        <img src={weather.current.weather_icons} alt={capital} />
        <p> <b>wind</b>{` ${weather.current.wind_speed} kilometers/hour direction `} <b>{weather.current.wind_dir}</b></p>
      </>)
  }
}
export default Weather