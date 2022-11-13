import { describe, expect, test } from "vitest"
import cloudinary from 'cloudinary'
import axios from 'axios'

import uploadImage from '@/modules/daybook/helpers/uploadImage'

cloudinary.config({
  cloud_name: 'dyswc6bns',
  api_key: '285158359659998',
  api_secret: 'P1WnXrh6Y8xnROiTVdOkhGNsJGs'
})

describe('Provas no uploadImage', () => {
  test('deve carregar um arquivo, retornar o url da imagem e deletar do cloudinary', async (done) => {
    // `responseType` indicates the type of data the server will respond with
    const { data } = await axios.get('https://res.cloudinary.com/dyswc6bns/image/upload/v1635391583/YelpCamp/oira0kbqe1u6ex3niudj.jpg', {
      responseType: 'arraybuffer'
    })
    const file = new File([data], 'foto.jpg')

    const url = await uploadImage(file)
    expect(typeof url).toBe('string')
    
    const segments = url.split('/')
    expect(typeof url).toBe('object')

    const imageId = segments[segments.length - 1].replace('.jpg', '')
    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done() // callback argument: when delete fc executed, test will be done
    })
  })
})