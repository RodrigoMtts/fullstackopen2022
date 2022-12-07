import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect( () => {
    axios.get("http://localhost:3001/persons")
      .then( response => {
        console.log("response.data",response.data)
        setPersons(response.data)
      })
  },[])

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