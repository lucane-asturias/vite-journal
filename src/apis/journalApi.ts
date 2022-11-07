import axios from 'axios'

const journalApi = axios.create({
  baseURL: 'https://vite-journal-default-rtdb.firebaseio.com'
})

export default journalApi