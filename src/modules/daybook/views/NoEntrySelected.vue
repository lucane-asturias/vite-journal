<template>
  <div class="d-flex justify-center">
    <h1 class="align-self-center text-h4">Não tem nada selecionado</h1>
  </div>

  <Fab @on:click="createNewEntry" />
</template>


<script setup>
  import { useRouter } from 'vue-router'
  import { defineAsyncComponent } from 'vue'

  const router = useRouter()

  const Fab = defineAsyncComponent(() => import('../components/Fab.vue'))

  const createNewEntry = () => {
    router.push({ name: 'entry', params: { id: 'new' } })
  }
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>