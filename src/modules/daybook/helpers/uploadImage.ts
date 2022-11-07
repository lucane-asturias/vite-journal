import axios from 'axios'

const uploadImage = async (file: File) => {
  if (!file) return

    try {
      const formData = new FormData()
      // add key/value pairs → name of an unsigned upload preset
      formData.append('upload_preset', 'vite-journal')
      formData.append('file', file as File) // // file to upload

      const url = 'https://api.cloudinary.com/v1_1/dyswc6bns/image/upload'
      const { data } = await axios.post(url, formData)
      
      console.log(data)

      return data.secure_url

    } catch (error) {
      console.error('Error ao carregar a imagem, revise os logs')
      console.log(error)
      return null
    }
}

export default uploadImage