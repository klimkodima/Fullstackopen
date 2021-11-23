import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Countries from './components/Countries'
import axios from 'axios'



const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ filter, setFilter ] = useState('')
  
  useEffect(() => {
   axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (e) => {
    setFilter(e.target.value)

  }
   const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  
  const countriesToShow = filter && filterCountries.length <= 10
  ?  filterCountries
  : []

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App