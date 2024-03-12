<template>
  <div class="font-regular page-content">
    <div class="homepage-content-wrapper">
      <div class="homepage-text" v-html="pageContent" />
      <div class="homepage-image"> 
        <img src="/images/hanan.jpg" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'

  const pageContent = ref('') 
  const { apiBasePath } = useRuntimeConfig();
  const { data, error } = await useAsyncData(() => $fetch(`${apiBasePath}/pages`)) 
  try {
    const homePage: WPPage = ((data as WPPageData)._rawValue as WPPage[]).filter((p: WPPage) => p.title.rendered === 'home')[0]
    pageContent.value = homePage.content.rendered
  }
  catch(e) {
    console.error(e)
  }
</script>
<style scoped lang="scss">

.homepage-content-wrapper {
  display: flex;
  flex-direction: column-reverse;
  padding-top: 30px;
}

.homepage-image {
  width: 100%;
  margin: 0 auto;
  & img {
    width: 100%;
    height: auto;
  }
}

.homepage-text {
  width: 100%;
  direction: rtl;
  font-size: 1.25em;
  > p {
    margin: 0;
  }
}

@media only screen  and (min-width : 768px) {
  .homepage-content-wrapper {
    display: flex;
    flex-direction: row;
  }

  .homepage-image {
    width: 25%;
  }
  .homepage-text {
    width: 75%;
    padding-right: 20px;
    font-size: 1.25em;
  }
}
</style>
