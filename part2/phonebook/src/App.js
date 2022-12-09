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

  const addPerson = (person) => {
    personsService.create({name: newName, number: newNumber})
      .then( person => {
        setPersons([...persons, person])
      })
      .catch( e => {
        console.log("Person not created: ",e)
      })
    setNewName('')
    setNewNumber('')
  }

  const updatePerson = (person) => {
    personsService.update(person)
      .then( personUpdated => {
        setPersons(persons.map(x => x.id === person.id ? person : x))
      })
      .catch( e => {
        console.log(`${person.name} do not exist in the server`)
        setPersons(persons.filter( x => x.id !== person.id))
      })
    setNewName('')
    setNewNumber('')
  }

  const onSubmitPersonHandler = (event) => {
    event.preventDefault()
    if(newName === '' || newNumber === ''){
      alert("Fill all forms")
      return null
    }

    const personAlreadyExist = persons.find( person => person.name === newName ) 
    if( personAlreadyExist !== undefined && personAlreadyExist.number === newNumber){
      alert(`${newName} is already added to phonebook`)
      return null
    }else if(personAlreadyExist){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        updatePerson({name: newName, number: newNumber, id: personAlreadyExist.id})
      return null
    }
    
    addPerson({name: newName, number: newNumber})
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
        onSubmitPersonHandler={onSubmitPersonHandler}
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