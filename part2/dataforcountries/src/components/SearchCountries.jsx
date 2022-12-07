import ListCountries from './ListCountries'
import CountryDetails from './CountryDetails'

const SearchCountries = ({countries,filter}) => {
    const countriesFiltered = countries.filter( country => {
        return country.name.common.toLowerCase().includes(filter.toLowerCase()) || country.name.official.toLowerCase().includes(filter.toLowerCase())
    })

    return(
        <>
            {countriesFiltered.length > 10 && filter.length > 0 ? <div>Too many matches, specify another filter</div> : ''}
            {countriesFiltered.length > 1 && countriesFiltered.length <= 10  ? <ListCountries countriesFiltered={countriesFiltered}/> : ''}
            {countriesFiltered.length === 1 ? <CountryDetails country={countriesFiltered[0]}/> : ''}
        </>
    )
}

export default SearchCountries