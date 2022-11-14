<template>

  <template v-if="entryData.entry">
    <div class="entry-title d-flex justify-space-between my-1">
        
      <div>
          <span class="text-h4 font-weight-bold">{{ dayMonthYear.day }}</span>
          <span class="mx-2 text-h4">{{ dayMonthYear.month }}</span>
          <span class="mx-2 text-h5 fw-light">{{ dayMonthYear.yearDay }}</span>
      </div>

      <div>
          <!-- Image selection simulator -->
          <input type="file" v-show="false" ref="imageSelector"
            accept="image/png, image/jpeg" @change="onSelectedImage($event)" />

          <v-btn color="danger" class="mx-2 my-1"
              v-if="entryData.entry.id"
              @click="deleteEntry">
              Borrar
              <i class="fa fa-trash-alt"></i>
          </v-btn>

          <v-btn color="primary" @click="onSelectImage">
              Subir foto
              <i class="fa fa-upload"></i>
          </v-btn>
      </div>

    </div>

    <v-divider color="primary" class="my-4"></v-divider>

    <div class="d-flex flex-column px-3 h-75">
      <v-textarea
        clearable
        clear-icon="fas fa-times-circle"
        variant="filled"
        auto-grow
        v-model="entryData.entry.text"
        placeholder="O que aconteceu hoje?"
      ></v-textarea>
    </div>

    <img
      v-if="entryData.picture && !localImage" 
      :src="entryData.entry.picture" 
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
  import { computed, defineAsyncComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useJournal } from '../composables/useJournal'

  import Swal from 'sweetalert2'

  import getDayMonthYear from '../helpers/getDayMonthYear'
  import uploadImage from '../helpers/uploadImage'

  const Fab = defineAsyncComponent(() => import('../components/Fab.vue'))
  const router = useRouter()

  const { getEntriesById, createEntry, updateEntry, destroyEntry } = useJournal()

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })

  const propsIdRef = toRefs(props).id // a reactive reference

  const imageSelector = ref<HTMLInputElement>(null)
  const localImage = ref()

  const entryData = reactive({
    entry: null,
    localImage: null,
    file: null
  })
 
  const dayMonthYear = computed(() => {
    const { day, month, yearDay } = getDayMonthYear(entryData.entry.date)
    return { day, month, yearDay }
  })

  const loadEntry = () => {
    let entryObj

    if (props.id === 'new') {
      entryObj = {
        text: '',
        date: new Date().getTime()
      }
    } else {
      entryObj = getEntriesById( props.id )
      if ( !entryObj && undefined ) return router.push({ name: 'no-entry' })
    }

    entryData.entry = entryObj
  }

  const onSelectImage = () => {
    imageSelector.value.click()
  }

  const onSelectedImage = async ($event: Event<HTMLInputElement>) => {
    const file: File = $event.target.files[0]
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
    Swal.fire({
      title: 'Espere por favor',
      allowOutsideClick: false
    })
    Swal.showLoading()

    const picture = await uploadImage(entryData.file)

    entryData.entry.picture = picture

    if (!entryData.entry.id) {
      // Post de uma nova entrada
      const id = await createEntry(entryData.entry)
      router.push({ name: "entry", params: { id } })
      Swal.fire('Salvo', 'Entrada registrada con éxito', 'success')
    } else {
      await updateEntry(entryData.entry)
      Swal.fire('Editado', 'Entrada editada con éxito', 'success')
    }

    entryData.file = null
  }
  
  const deleteEntry = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Tem certeza?',
      text: "Una vez borrado, no se puede recuperar",
      showDenyButton: true,
      confirmButtonText: 'Sim, tenho certeza'
    })

    if (isConfirmed) {
      Swal.fire({
        title: 'Espere por favor',
        allowOutsideClick: false
      })
      Swal.showLoading()
      await destroyEntry(entryData.entry.id)
      router.push({ name: "no-entry" })

      Swal.fire('Eliminado', '', 'success')
    }
  }

  onMounted(() => {
    loadEntry()
  })

  watch(propsIdRef, () => {
    loadEntry()
  })

  // watchEffect(() => props.id, loadEntry())

</script>

<style lang="scss" scoped>

span:nth-of-type(1) {
    color: #198754 !important;
  }

span:nth-of-type(2) {
  text-transform: capitalize !important;
}

span:nth-of-type(3) {
  margin-top: 6.4px;
  font-size: 15px;
  color: #757575 !important;
  margin-left: 6px !important;
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}

</style>