import React, { useState } from 'react'
import Filter from "./components/Filter"
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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