<template>
  <router-view/>
</template>

<style>
  /* Width of scrollbar */
  ::-webkit-scrollbar{
    width: 7px;
    background-color: transparent;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 20px;

  }
  /* Handle */
  ::-webkit-scrollbar-thumb{
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.9); 
  }
</style>

