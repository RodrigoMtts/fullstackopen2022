import Person from './Person'

const Persons = ({persons,filter}) => {
    const personView = persons.filter( person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map( (person) => {
        return <Person key={person.id} person={person}/>
    })
    return (
        <>
            <h2>Numbers</h2>
            {personView}
        </>
    )
}

export default Persons