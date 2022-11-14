<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <h1>Hello World</h1>

    <v-btn color="primary" @click="goToDaybook">Primary</v-btn>
    <v-btn color="secondary" @click="goToDaybook">Secondary</v-btn>
    <v-btn color="success" @click="goToDaybook">Success</v-btn>

    <div class="text-h5">Vuetify Working</div>
  </div>
</template>


<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const goToDaybook = () => {
    router.push({ name: 'no-entry' })
  }  
  
</script>

