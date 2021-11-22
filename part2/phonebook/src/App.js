import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const  existPersons = persons.filter((person) => person.name === newName)

    if(existPersons.length !== 0){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPersons = persons.concat({name:newName})
    setPersons(newPersons)
    setNewName("")
  }
  const handlePersonChange = (e) =>
  setNewName(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App