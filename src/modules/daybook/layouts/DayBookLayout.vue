<template>
  <Navbar />
</template>

<script setup>
  import { defineAsyncComponent } from 'vue'

  const Navbar = defineAsyncComponent(() => import('../components/Navbar.vue')
</script>

<style lang="css" scoped>
</style>
