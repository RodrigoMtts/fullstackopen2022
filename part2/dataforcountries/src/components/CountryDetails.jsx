const CountryDetails = ({country}) => {
    const languages = []

    for(let x in country.languages){
        console.log("Language: ",x)
        console.log("Language: ",x)

        languages.push(<li key={x}>{country.languages[x]}</li>)
    }
    console.log("Country details", country)
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
        </>
    )
}

export default CountryDetails