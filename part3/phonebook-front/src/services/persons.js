import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
        .then( response => {
            return response.data
        })
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
        .then( response => {
            return response.data
        })
}

const create = (person) => {
    return axios.post(baseUrl,person)
        .then( response => {
            return response.data
        })
}

const update = (person) => {
    return axios.put(`${baseUrl}/${person.id}`,person)
        .then( response => {
            return response.data
        })
}

export default {getAll, create, remove, update}