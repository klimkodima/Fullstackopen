import React from "react"
import Language from "./Language"

const SelectedCountry =({country}) =>{

    return(
      <>
      <h2>{country.name.common}</h2>
      <br/>
      <p>{`capital ${country.capital}`}</p>
      <p>{`population ${country.population}`}</p>
      <br/>
      <h3>languages</h3>
      <Language languages={country.languages}/>
      <img src={country.flags.svg} alt="flag"/>
      </>)
}
export default SelectedCountry