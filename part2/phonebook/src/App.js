import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import phonebookService from "./servises/phonebook"



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebookService.getAll().then(data => {
      setPersons(data)
    }).catch(error => {
      alert("Something went wrong.")
    })
  }, [])

  const addPerson = e => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const existPersons = persons.filter((person) => person.name === newName)
    if (existPersons.length !== 0) {
      let a = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (a) {
        
        phonebookService.update( existPersons[0].id, personObject).then( data => {
          setPersons(persons.map(person => person.id !== existPersons[0].id ? person : data))
        }).catch(error => {
          alert("Something went wrong.")
        })
      }
      setNewName("")
      setNewNumber("")
      return
    }
    phonebookService.create(personObject).then(data => {
      setPersons(persons.concat(data))
    }).catch(error => {
      alert("Something went wrong.")
    })
    setNewName("")
    setNewNumber("")
  }

  const deletePerson = (id, name) => () => {
    let a = window.confirm(`Are you sure you want to delete ${name}?`);
    if (a) {
      phonebookService.deletePerson(id).then(
        () => {
          setPersons(persons.filter(n => n.id !== id));
        }
      ).catch(error => {
        alert("Something went wrong.")
      })
    }
  }

  const handlePersonChange = e => setNewName(e.target.value)

  const handleNumberChange = e => setNewNumber(e.target.value)

  const handleFilter = e => setFilter(e.target.value)

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App