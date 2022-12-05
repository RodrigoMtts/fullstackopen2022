import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.find( person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return null
    }
    
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }

  const nameEventHandler = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={nameEventHandler} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map( (person,i) => {
          return <div key={i}>{person.name}</div>
        })
      }
    </div>
  )
}

export default App