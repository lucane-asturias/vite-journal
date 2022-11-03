<template>
  <div class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: entry.id }})"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">{{ entryDay }}</span>
      <span class="mx-1 fs-5">{{ entryMonth }}</span>
      <span class="mx-2 text-muted mt-1">{{ entryYear }}</span>
    </div>

    <div class="entry-description mt-1">
      {{ shortText }}
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    entry: {
      type: Object,
      required: true
    }
  })

  const shortText = computed(() => {
    return props.entry.text.length > 135
      ? props.entry.text.substring(0, 135) + '...'
      : props.entry.text
  })

  const entryDay = computed(() => {
    return new Date(props.entry.date).getDate()
  }) 
   
  const entryMonth = computed(() => {
    return new Date(props.entry.date).toLocaleString("default", { month: "long" })
  })
      
  const entryYear = computed(() => {
    const options = { year: "numeric", weekday: "long" }
    const year_and_week = new Date(props.entry.date).toLocaleString("default", options)
    return year_and_week.substring(0, 4) + ',' + year_and_week.substring(4) // add a comma between 
  })

</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 42);
    transition: 0.2s all ease-in;
  }

  span:nth-of-type(2) {
    text-transform: capitalize;
  }
  
  .entry-description {
    font-size: 13.3px;
  }
}


</style>