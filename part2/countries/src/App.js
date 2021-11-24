import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Content from './components/Content'
import axios from 'axios'



const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ filter, setFilter ] = useState('')
  const[selectedCountry , setSelectedCountry ] = useState([])
  
  useEffect(() => {
   axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setSelectedCountry (response.data)
      })
  }, [])
  
  const showCountry = (e) => {
    const checkedCountry =  countries.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    console.log(checkedCountry)
    setSelectedCountry(checkedCountry)    
}
  const handleFilter = (e) => {
    setFilter(e.target.value)
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    setSelectedCountry(filteredCountries)

  }

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <Content countries={selectedCountry} showCountry={showCountry}/>
    </div> 
  )
}

export default App