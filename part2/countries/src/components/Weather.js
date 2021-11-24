import React, {useState, useEffect} from "react"
import axios from 'axios'

const Weather =({capital}) => {
    const [ weather, setWeather ] = useState()
    const params = {
        access_key: "1fc4410fad178d7bb5ea98c03b74296a",
        query: "New York" 
      }
    useEffect(() => {
             axios.get('http://api.weatherstack.com/current', {params})
           .then(response => {
            setWeather(response.data)
           })
       },[capital] )
    //   let t = weather.current.temperature

    return(
      <>
      <h2>{`Weather in ${capital}`}</h2>
      <br/>
      <p>{`Current temperature  is ${capital}℃`}</p>
      <img src="" alt={capital}/>
      <p>{`wind ${capital}`}</p>
      </>)
}
export default Weather