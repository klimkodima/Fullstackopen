import React from "react"
import Country from "./Country"

const Countries =({countries}) =>{
let counter = countries.length
  if(counter === 0){
    return(
      <div>Too many matches, specity another filter</div>
    )
  } else if(counter === 1){
    return(
      <Country country={countries[0]}/>
    )
  } else {
    return(
    <>
    <ul>
        {countries.map(country => 
        <li key={country.name.common}>{country.name.common}<button onClick={`window.location.href=${country.maps.googleMaps}`}> show</button></li>
        )}
      </ul>
      </>
    )
  }
}
export default Countries