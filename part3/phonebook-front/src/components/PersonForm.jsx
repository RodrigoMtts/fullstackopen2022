const PersonForm = ({onSubmitPersonHandler,nameEventHandler,phoneEventHandler,newName,newNumber}) => {
    return (
    <>
    <h2>Add a new</h2>
    <form onSubmit={onSubmitPersonHandler}>
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