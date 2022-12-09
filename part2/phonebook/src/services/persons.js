import axios from 'axios'

const getAll = () => {
    return axios.get("http://localhost:3001/persons")
        .then( response => {
            console.log("response /persons", response.data)
            return response.data
        })
}

const get = (id) => {

}

const remove = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
        .then( response => {
            return response.data
        })
}

const create = (note) => {
    return axios.post("http://localhost:3001/persons",note)
        .then( response => {
            return response.data
        })
}

const update = (note) => {

}

export default {getAll, create, remove}