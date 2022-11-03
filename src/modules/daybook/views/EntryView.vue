<template>

  <template v-if="entryData">
    <div class="S-title d-flex justify-content-between p-2">
        
      <div>
          <span class="text-success fs-3 fw-bold">{{ dayMonthYear.day }}</span>
          <span class="mx-1 fs-3">{{ dayMonthYear.month }}</span>
          <span class="mx-2 fs-4 fw-light">{{ dayMonthYear.yearDay }}</span>
      </div>

      <div>
          <input type="file" v-show="false" ref="imageSelector"
            accept="image/png, image/jpeg" @change="onSelectedImage($event)" />

          <button class="btn btn-danger mx-2"
              v-if="entryData.entry.id"
              @click="deleteEntry">
              Borrar
              <i class="fa fa-trash-alt"></i>
          </button>

          <button class="btn btn-primary" @click="onSelectImage">
              Subir foto
              <i class="fa fa-upload"></i>
          </button>
      </div>

    </div>

    <hr>

    <div class="d-flex flex-column px-3 h-75">
      <textarea
        v-model="entryData.entry.text"
        placeholder="O que aconteceu hoje?"
      ></textarea>
    </div>

    <img
      v-if="entryData.picture && !localImage" 
      :src="entry.picture" 
      alt="entry-picture"
      class="img-thumbnail" />

    <img 
      v-if="entryData.localImage"
      :src="entryData.localImage" 
      alt="entry-picture"
      class="img-thumbnail" />

  </template>

  <Fab 
    icon="fa-save"
    @on:click="saveEntry"
  />

</template>

<script lang="ts" setup>
  import { ref, reactive, defineAsyncComponent, onMounted, watch } from 'vue'
  import { router } from 'vue-router'
  import { getEntriesById } from '../composables/useJournal'

  import Swal from 'sweetalert2'

  import getDayMonthYear from '../helpers/getDayMonthYear'
  import uploadImage from '../helpers/uploadImage'

  const Fab = defineAsyncComponent(() => import('../components/Fab.vue'))

  const props = defineProps(() => {
    id: {
      type: String,
      required: true
    }
  })

  const imageSelector = ref<HTMLInputElement>(null)

  const entryData = reactive({
    entry: null,
    localImage: null,
    file: null
  })
 
  const dayMonthYear = computed(() => {
    const { day, month, yearDay } = getDayMonthYear(this.entry.date)
    return { day, month, yearDay }
  })

  const loadEntry = () => {
    let entryObj;

    if (this.id === 'new') {
      entryObj = {
        text: '',
        date: new Date().getTime()
      }
    } else {
      entryObj = getEntriesById( props.id )
      if ( !entryObj ) return router.push({ name: 'no-entry' })
    }

    entryData.entry = entryObj
  }

  const onSelectImage = () => {
    imageSelector.value.click()
  }

  const onSelectedImage = async ($event: Event<HTMLInputElement>) => {
    const file = $event.target.files[0]
    console.log('file', file)

    if (!file) {
      entryData.localImage = null
      entryData.file = null
      return
    }

    entryData.file = file

    const reader = new FileReader()
    reader.onload = () => entryData.localImage = reader.result
    reader.readAsDataURL(file)
  }

  const saveEntry = async () => {
    new Swal({
      title: 'Espere por favor',
      allowOutsideClick: false
    })
    Swal.showLoading()

    const picture = await uploadImage(this.file)

    this.entry.picture = picture

    if (this.entry.id) {
      await this.updateEntry(this.entry)
    } else {
      // console.log('Post de uma nueva entrada')
      const id = await this.createEntry(this.entry)
      this.$router.push({ name: "entry", params: { id } })
    }

    this.file = null
    Swal.fire('Salvo', 'Entrada registrada con éxito', 'success')
  }
  
  const deleteEntry = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Tem certeza?',
      text: "Una vez borrado, no se puede recuperar",
      showDenyButton: true,
      confirmButtonText: 'Sim, tenho certeza'
    })

    if (isConfirmed) {
      new Swal({
        title: 'Espere por favor',
        allowOutsideClick: false
      })
      Swal.showLoading()

      await this.destroyEntry(this.entry.id)
      router.push({ name: "no-entry" })

      Swal.fire('Eliminado', '', 'success')
    }
  }

  onMounted(() => {
    this.loadEntry()
  })

  watch(props.id, () => ) {
    this.loadEntry()
  }

</script>

<style lang="scss" scoped>

textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

span:nth-of-type(2) {
  text-transform: capitalize;
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}

</style>