import WeatherDetails from "./WeatherDetails"

const CountryDetails = ({country}) => {
    const languages = []
    const env = process.env.REACT_APP_API_KEY

    for(let x in country.languages){
        languages.push(<li key={x}>{country.languages[x]}</li>)
    }

    return(
        <>
            <h1>{country.name.common}</h1>
            <div>capital: {country.capital}</div>
            <div>area: {country.area}</div>
            <h2>Languages:</h2>
            <ul>
                {languages}
            </ul>
            <img src={country.flags.png} alt={"Flag from " + country.name.common}/>
            <WeatherDetails country={country}/>
        </>
    )
}

export default CountryDetails