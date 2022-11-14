<template>
  <nav>

    <v-toolbar prominent class="bg-primary">
      <v-app-bar-nav-icon @click="$router.push('/')">
        <img src="@/assets/logo.png" 
         alt="Vue Logo"
         width="33"
         height="30"
         class="d-inline-block align-text-top mx-2" />
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-white text-h5">
        Daybook
      </v-toolbar-title>

      <div class="d-flex">
        <v-btn color="info" variant="outlined" ripple rounded class="mx-2">
          <v-icon icon="fa fa-sign-out-alt"></v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    
  </nav>
</template>