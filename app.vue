<template>
  <v-app>
    <AppHeader />
    <NuxtPage />
  </v-app>
</template>

<script setup lang="ts">
  import AppHeader from './components/layouts/AppHeader'

</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f7f5eb;
  color: #003366;
}

.page-content {
  width: 100%;
  max-width: 960px;
  padding: 0 20px;
}

.font-regular {
  font-family: "Noto Naskh Arabic", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
.font-bold {
  font-family: "Noto Naskh Arabic", serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}
@media only screen  and (min-width : 768px) {
  .page-content {
    margin: 0 auto;
    padding: 0;
  }
}
</style>


