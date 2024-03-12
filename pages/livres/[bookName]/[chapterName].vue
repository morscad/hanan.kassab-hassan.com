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
  import { ref, watch } from 'vue'
  const { params: { bookName, chapterName} } = useRoute()
  const { apiBasePath } = useRuntimeConfig();
  const chapter = ref()
  try {
    const { data, error } = await useAsyncData(() => $fetch(`${apiBasePath}/posts?slug=${chapterName}`)) 
    const chapterData: WPArticle = ((data as WPArticleData)._rawValue as WPArticle[])[0] || null
    chapter.value = chapterData
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