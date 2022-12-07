import ListCountries from './ListCountries'
import CountryDetails from './CountryDetails'

const SearchCountries = ({countries,filter}) => {
    const countriesFiltered = countries.filter( country => {
        return country.name.common.toLowerCase().includes(filter.toLowerCase()) || country.name.official.toLowerCase().includes(filter.toLowerCase())
    })
    console.log("coutries filtered", countriesFiltered.length)
    if(countriesFiltered.length > 10){
        console.log("Mais de 10")
    }else if(countriesFiltered.length > 1){
        console.log("Mais de 1")
    }else{
        console.log("Apenas 1")
    }

    return(
        <>
            {countriesFiltered.length > 10 ? <div>Too many matches, specify another filter</div> : ''}
            {countriesFiltered.length > 1 && countriesFiltered.length <= 10  ? <ListCountries countriesFiltered={countriesFiltered}/> : ''}
            {countriesFiltered.length === 1 ? <CountryDetails country={countriesFiltered[0]}/> : ''}
        </>
    )
}

export default SearchCountries