import React from "react"

const Country =({country, showCountry}) =>{

    return(
      <li>{country.name.common}<button value ={country.name.common} onClick={showCountry}> show</button></li>
      )
}
export default Country