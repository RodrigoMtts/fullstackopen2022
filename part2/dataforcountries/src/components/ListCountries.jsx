import { useState } from "react"
import CountryDetails from "./CountryDetails"

const ListCountries = ({countriesFiltered}) => {
    const [toggles, setToggles] = useState(new Array(countriesFiltered.length).fill(false))

    const onClickToggleHandler = (i) => {
        const togglesTemp = [...toggles]
        togglesTemp[i] = !toggles[i]
        setToggles([...togglesTemp])
    }

    return countriesFiltered.map((country, i) => {
        return (
                <div key={country.population}>
                    {country.name.common}
                    <button onClick={ () => onClickToggleHandler(i)}>Show</button>
                    {toggles[i] ? <CountryDetails country={country} /> : ''}
                </div>
        )
    })
}

export default ListCountries