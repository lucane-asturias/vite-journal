import axios from 'axios'

const journalApi = axios.create({
  baseURL: 'https://vue-journal-188fb-default-rtdb.firebaseio.com'
})

export default journalApi