import axios from 'axios'

const getAll = () => {
    return axios.get("http://localhost:3001/persons")
        .then( response => {
            console.log("response /persons", response.data)
            return response.data
        })
}

const remove = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
        .then( response => {
            return response.data
        })
}

const create = (person) => {
    return axios.post("http://localhost:3001/persons",person)
        .then( response => {
            return response.data
        })
}

const update = (person) => {
    console.log("Person in update",person)
    return axios.put(`http://localhost:3001/persons/${person.id}`,person)
        .then( response => {
            return response.data
        })
}

export default {getAll, create, remove, update}