const Person = ({person,deletePerson}) => {
   console.log(deletePerson)
   return <div>{person.name} {person.number} <button onClick={ () => deletePerson(person)}>Delete</button></div>
}

export default Person