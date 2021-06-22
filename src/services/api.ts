import axios from 'axios'

export default axios.create({
  baseURL: 'https://consultabackend.herokuapp.com/api'
})
