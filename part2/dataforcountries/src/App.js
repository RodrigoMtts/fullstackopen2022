import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import SearchCountries from './components/SearchCountries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const onChangeFilterHandler = (event) => {
    setFilter(event.target.value)
  }

  useEffect( () => {
    axios.get("https://restcountries.com/v3.1/all")
      .then( response => {
        setCountries(response.data)
      })
  }, [])
  
  return (
    <>
      <Filter filter={filter} onChangeFilterHandler={onChangeFilterHandler}/>
      <SearchCountries countries={countries} filter={filter}/>
    </>
  )
}

export default App;
