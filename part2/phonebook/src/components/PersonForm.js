import React from "react"
const PersonForm =({newName,newNumber, handleNumberChange, handlePersonChange, addPerson }) =>{
    return(<form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <br/>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)
}
export default PersonForm