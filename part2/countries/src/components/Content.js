import React from "react"
import SelectedCountry from "./SelectedCountry"
import Country from "./Country"

const Content =({countries, showCountry}) =>{
 let length = countries.length
 console.log(length)
  if( length > 10){
    return(
      <div>Too many matches, specity another filter</div>
    )
  }
   if(length === 1){

    return(
      <SelectedCountry country={countries[0]}/>
    )
  }  
    return(
      <ul>
        {countries.map(country => 
        <Country key={country.name.common} country={country} showCountry={showCountry}/>
        )}
      </ul>
    )
  
}
export default Content