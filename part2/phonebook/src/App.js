import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.find( person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return null
    }
    setPersons(persons.concat({
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1
    }))
    setNewName('')
  }

  const nameEventHandler = (event) => {
    setNewName(event.target.value)
  } 

  const phoneEventHandler = (event) => {
      setNewNumber(event.target.value)
  }

  const filterEventHandler = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input onChange={filterEventHandler} value={filter}/>
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={nameEventHandler} value={newName}/>
          phone: <input onChange={phoneEventHandler} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {console.log("Filter", filter)}
      {
        persons.filter( person => person.name.toLocaleLowerCase().includes(filter)).map( (person,i) => {
          return <div key={person.id}>{person.name} {person.number}</div>
        })
      }
    </div>
  )
}

export default App