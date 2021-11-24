import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import phonebookService from "./servises/phonebook"



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
     phonebookService.getAll().then(data => {
        setPersons(data)
      }).catch(error => {
        alert("Something went wrong.")
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const  existPersons = persons.filter((person) => person.name === newName)
    if(existPersons.length !== 0){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const postObject = {
      name: newName,
      number: newNumber,
    }
    phonebookService.create(postObject).then(data => {
      setPersons(persons.concat(data))
    }).catch(error => {
      alert("Something went wrong.")
    })
    setNewName("")
    setNewNumber("")
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