<template>
<template>
  <div class="page-content chapter">
    <div v-if="chapter">
      <div class="chapter-return"><a :href="`/livres/${bookName}`">عودة الى قائمة المحتويات &raquo;</a></div>
      <h1 class="font-bold chapter-title">{{ chapter.title.rendered }}</h1>
      <div class="font-regular chapter-intro" v-html="chapter.content.rendered" />
      <div class="chapter-return"><a :href="`/livres/${bookName}`">عودة الى قائمة المحتويات &raquo;</a></div>
    </div>
  </div>
</template>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import type { WPArticle } from '~/types';
  const { fullPath, params: { bookName, chapterName} } = useRoute()
  const { apiBasePath } = useRuntimeConfig();
  const chapter = ref()
  try {
    const { data, error } = await useAsyncData(() => $fetch(`${apiBasePath}/posts?slug=${chapterName}`)) 
    if (data && data.value) {
      const chapterData: WPArticle = (data.value as WPArticle[])[0] || null
      chapter.value = chapterData

      useHead({
        meta: [
          { name: 'title', content: `Hanan Kassab Hassan - حنان قصاب حسن | ${(chapter.value.title.rendered)}` },
          { name: 'description', content: chapter.value.excerpt.rendered.replace('<p>', '').replace('</p>', '') },
          { name: 'og:title', content: `Hanan Kassab Hassan - حنان قصاب حسن | ${(chapter.value.title.rendered)}` },
          { name: 'og:description', content: chapter.value.excerpt.rendered.replace('<p>', '').replace('</p>', '') },
          { name: 'og:type', content: 'book' },
          { name: 'og:book:author', content: ['Hanan Kassab Hassan - حنان قصاب حسن'] },
          { name: 'og:book:release_date', content: new Date('March 8, 2024 09:00:00').toISOString() },
          { name: 'og:image', content: 'https://hanan.kassab-hassan.com/images/hanan-and-sharif.jpg' },
          { name: 'og:url', content: `https://hanan.kassab-hassan.com${fullPath}` },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: `Hanan Kassab Hassan - حنان قصاب حسن | ${(chapter.value.title.rendered)}` },
          { name: 'twitter:description', content: chapter.value.excerpt.rendered.replace('<p>', '').replace('</p>', '') },
          { name: 'twitter:image', content: 'https://hanan.kassab-hassan.com/images/hanan-and-sharif.jpg' },
          { name: 'twitter:url', content: `https://hanan.kassab-hassan.com${fullPath}` },
        ]
      })
    }
  }
  catch (e) {
    console.error(e)
  }
</script>
<style scoped lang="scss">
.chapter {
  direction: rtl;
  
  .chapter-title {
    font-size: 3em;
  }
  .chapter-intro {
    font-size: 1.5em;
    > p {
      strong {
        margin-top: 10px;
      }
    }
  }
  .chapter-return {
    padding: 20px 0 10px 0;
    a {
      text-decoration: none;
      color: #003366;
      font-size: 1.25em;;
      &:hover {
        text-decoration: underline;
        color: #000000;
      }
    }
  }
}
</style>