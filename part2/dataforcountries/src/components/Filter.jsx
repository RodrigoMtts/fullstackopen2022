const Filter = ({filter, onChangeFilterHandler}) => {
    return (
        <div>
            find coutries <input value={filter} onChange={onChangeFilterHandler}/>
        </div>
    )
}

export default Filter