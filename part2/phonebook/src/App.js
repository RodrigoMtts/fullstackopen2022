import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

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
      <Filter 
        filterEventHandler={filterEventHandler}
        value={filter}
      />
      <PersonForm
        addPerson={addPerson}
        nameEventHandler={nameEventHandler}
        phoneEventHandler={phoneEventHandler}
        newName={newName}
        newNumber={newNumber}
      />
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App