import axios from 'axios'

const uploadImage = async (file) => {
  if (!file) return

    try {
      const formData = new FormData()
      // add key/value pairs → name of an unsigned upload preset
      formData.append('upload_preset', 'curso-vue')
      // file to upload
      formData.append('file', file)

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