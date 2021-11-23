import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
   axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const  existPersons = persons.filter((person) => person.name === newName)

    if(existPersons.length !== 0){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPersons = persons.concat({name:newName, number:newNumber, id:persons.length + 1})
    setPersons(newPersons)
    setNewName("")
  }
  const handlePersonChange = (e) =>
  setNewName(e.target.value)

  const handleNumberChange = (e) =>
  setNewNumber(e.target.value)

  const handleFilter = (e) =>
  setFilter(e.target.value)

  const personsToShow = filter
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson}  handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App