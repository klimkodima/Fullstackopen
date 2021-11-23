import React from "react"
const Country =({country}) =>{

    return(
      <>
      <h2>{country.name.common}</h2>
      <br/>
      <p>{`capital ${country.capital}`}</p>
      <p>{`population ${country.population}`}</p>
      <br/>
      <h3>languages</h3>
      <br/>
      <ul>
          
      {Object.values(country.languages).map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt="flag"/>
      </>)
}
export default Country