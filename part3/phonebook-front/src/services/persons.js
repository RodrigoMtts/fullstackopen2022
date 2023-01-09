import axios from 'axios'

// const baseUrl = 'http://localhost/api/persons'
const baseUrl = 'https://fragrant-shadow-8123.fly.dev/api/persons'

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
            console.log(response)
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