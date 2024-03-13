<template>
  <div class="font-regular page-content">
    <div class="homepage-content-wrapper">
      <div class="homepage-wrapper">
        <div class="homepage-title font-bold">حنان قصاب حسن</div>
        <div class="homepage-text" v-html="pageContent" />
      </div>
      <div class="homepage-image"> 
        <img src="/images/hanan.jpg" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
import type { WPPage } from '~/types';

  const pageContent = ref('') 
  const pageSummary = ref('') 
  const { fullPath } = useRoute()
  const { apiBasePath } = useRuntimeConfig();
  const { data, error } = await useAsyncData(() => $fetch(`${apiBasePath}/posts?categories=6`)) 
  try {
    const homePage: WPPage = (data.value as WPPage[]).filter((p: WPPage) => p.title.rendered === 'home')[0]
    pageContent.value = homePage.content.rendered
    pageSummary.value = homePage.excerpt.rendered.replace('<p>', '').replace('</p>', '')
  }
  catch(e) {
    console.error(e)
  }

  useHead({
    meta: [
      { name: 'title', content: 'Hanan Kassab Hassan - حنان قصاب حسن' },
      { name: 'description', content: pageSummary.value },
      { name: 'og:title', content: 'Hanan Kassab Hassan - حنان قصاب حسن' },
      { name: 'og:description', content: pageSummary.value },
      { name: 'og:type', content: 'website' },
      { name: 'og:image', content: 'https://hanan.kassab-hassan.com/images/hanan-og.jpg' },
      { name: 'og:url', content: `https://hanan.kassab-hassan.com${fullPath}` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Hanan Kassab Hassan - حنان قصاب حسن' },
      { name: 'twitter:description', content: pageSummary.value },
      { name: 'twitter:image', content: 'https://hanan.kassab-hassan.com/images/hanan-og.jpg' },
      { name: 'twitter:url', content: `https://hanan.kassab-hassan.com${fullPath}` },
    ]
  })
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

.homepage-wrapper {
  width: 100%;
  direction: rtl;
  > p {
    margin: 0;
  }
}
.homepage-title {
  font-size: 2em;
}
.homepage-text {
  font-size: 1.25em;
}

@media only screen  and (min-width : 768px) {
  .homepage-content-wrapper {
    display: flex;
    flex-direction: row;
  }

  .homepage-image {
    width: 25%;
  }
  .homepage-wrapper {
    width: 75%;
    direction: rtl;
    > p {
      margin: 0;
    }
  }

  .homepage-title {
    padding-right: 20px;
    font-size: 2em;
  }
  .homepage-text {
    padding-right: 20px;
    font-size: 1.25em;
  }
}
</style>
