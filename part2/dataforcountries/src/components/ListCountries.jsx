const ListCountries = ({countriesFiltered}) => {
    return countriesFiltered.map(country => {
        return (
            <div key={country.name.common}>{country.name.common}</div>
        )
    })
}

export default ListCountries