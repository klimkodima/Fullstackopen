import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <br/>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <li key={person.id}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App