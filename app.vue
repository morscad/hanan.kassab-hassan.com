<template>
  <v-app>
    <AppHeader />
    <NuxtPage />
  </v-app>
</template>

<script setup lang="ts">
  import AppHeader from '~/components/layouts/AppHeader.vue'

</script>

<style>
@font-face {
    font-family: 'Lotus Linotype Light';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/LotusLight.otf') format('opentype');
}

@font-face {
    font-family: 'Lotus Linotype Bold';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/LotusBold.otf') format('opentype');
}

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
  font-family: "Lotus Linotype Light";
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
}
.font-bold {
  font-family: "Lotus Linotype Bold";
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}
@media only screen  and (min-width : 960px) {
  .page-content {
    margin: 0 auto;
    padding: 0;
  }
}
</style>


