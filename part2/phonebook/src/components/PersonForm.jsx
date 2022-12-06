const PersonForm = ({addPerson,nameEventHandler,phoneEventHandler,newName,newNumber}) => {
    return (
    <>
    <h2>Add a new</h2>
    <form onSubmit={addPerson}>
        <div>
          name: <input onChange={nameEventHandler} value={newName}/>
        </div>
        <div>
          phone: <input onChange={phoneEventHandler} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
    </>
    )
}

export default PersonForm