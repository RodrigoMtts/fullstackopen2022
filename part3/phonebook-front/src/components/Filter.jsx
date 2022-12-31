const Filter = ({filterEventHandler,filter}) => {
    return (
    <div>
        filter shown with: <input onChange={filterEventHandler} value={filter}/>
    </div>
    )
}

export default Filter