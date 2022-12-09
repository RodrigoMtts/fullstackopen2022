import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect( () => {
    personsService.getAll().then( initialPersons => {
      console.log("intial persons", initialPersons)
      setPersons(initialPersons)
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.find( person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return null
    }
    
    personsService.create({name: newName, number: newNumber})
      .then( person => {
        setPersons([...persons, person])
      })
      .catch( e => {
        console.log("Person not created: ",e)
      })
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

  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name} ?`))
    personsService.remove(person.id)
      .then( personDeleted => {
        setPersons(persons.filter( x => x.id !== person.id))

      })
      .catch( e => {
        console.log(`${person.name} was already deleted from server`)
        setPersons(persons.filter( x => x.id !== person.id))
      })
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
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App