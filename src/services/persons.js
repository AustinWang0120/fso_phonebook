import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  return axios.get(baseUrl).then((res) => (res.data))
}

const create = (newPersonObject) => {
  return axios.post(baseUrl, newPersonObject).then((res) => (res.data))
}

const update = (id, changedPersonObject) => {
  return axios.put(`${baseUrl}/${id}`, changedPersonObject).then((res) => (res.data))
}

const serviceObject = {
  getAll, create, update
}

export default serviceObject
