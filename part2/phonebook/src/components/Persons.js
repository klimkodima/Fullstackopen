import React from "react"
import Person  from "./Person"

const Persons = ({ persons, deletePerson }) => {
  return (<ul>
    {persons.map((person) => <Person key={person.id} name={person.name} number={person.number}
     deletePerson={()=>deletePerson(person.id, person.name)}/>)}
   </ul>)
}
export default Persons