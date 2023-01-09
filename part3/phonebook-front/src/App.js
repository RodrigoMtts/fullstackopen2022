import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [messageNotification, setMessageNotification] = useState({msg: '', type: '', visible: false})
  const [timer, setTimer] = useState(0)
  
  const messageTypes = {error: 'erro', success: 'success'}

  useEffect( () => {
    personsService.getAll().then( initialPersons => {
      setPersons(initialPersons)
    })
  },[])

  const msgVisibleHandler = (msg, type) => {
    if(messageNotification.visible){
      setMessageNotification({msg, type, visible: messageNotification.visible})
      clearTimeout(timer)
      setTimer(setTimeout( () => {
        setMessageNotification({msg, type, visible: !messageNotification.visible})
      }, 5000))
    }
    else{
      setMessageNotification({msg, type, visible: !messageNotification.visible})
      setTimer(setTimeout( () => {
        setMessageNotification({msg, type, visible: messageNotification.visible})
      }, 5000))
    }
  }

  const addPerson = () => {
    personsService.create({name: newName, number: newNumber})
      .then( person => {
        setPersons([...persons, person])
        msgVisibleHandler(`Added ${newName}`, messageTypes.success)
      })
      .catch( e => {
        msgVisibleHandler(e.response.data.error, messageTypes.error)
      })
    setNewName('')
    setNewNumber('')
  }

  const updatePerson = (person) => {
    personsService.update(person)
      .then( personUpdated => {
        setPersons(persons.map(x => x.id === person.id ? person : x))
        msgVisibleHandler(`${newName} updated`, messageTypes.success)
      })
      .catch( e => {
        console.log(e.response)
        e.response.status === 404 
          ? msgVisibleHandler(`${person.name} do not exist in the server`,messageTypes.error)
          : msgVisibleHandler(e.response.data.error,messageTypes.error)
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
      msgVisibleHandler(`${newName} is already added to phonebook`,messageTypes.error)
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
        msgVisibleHandler(`Information of ${person.name} was deleted from server`,messageTypes.success)
      })
      .catch( e => {
        msgVisibleHandler(`Information of ${person.name} was already deleted from server`,messageTypes.error)
        setPersons(persons.filter( x => x.id !== person.id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageNotification={messageNotification} />
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