<template>
  <div class="page-content cover-layout">
    <div v-if="bookCover" class="book-intro-wrapper">
      <h1 class="font-bold book-title">{{ bookCover.title.rendered }}</h1>
      <div class="font-regular book-intro" v-html="bookCover.content.rendered" />
    </div>
    <div v-if="bookChapters && bookCategory" class="table-of-content">
      <div class="font-bold table-of-content-title">قائمة المحتويات</div>
      <ul>
        <li v-for="chapter in bookChapters" class="font-regular">
          <a :href="`/livres/${bookName}/${chapter.slug}`">{{ chapter.title.rendered }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import type { WPArticle } from '~/types'

  const { apiBasePath } = useRuntimeConfig();
  const { fullPath, params: { bookName }} = useRoute()
  const [ ,categoryID ] =  (bookName as string).split('---')
  const bookCategory = ref()
  const bookCover = ref()
  const bookChapters = ref<WPArticle[]>([])

  const { data, error} = await useAsyncData(`book-category-${bookName}`, () =>  $fetch(`${apiBasePath}/posts?categories=${categoryID}`));
  try {
    if (data && data.value) {
      const chapterList: WPArticle[] = data.value as WPArticle[] || []
      const bookResult = chapterList.toSorted((a: WPArticle, b: WPArticle) => { return new Date(a.date) >= new Date(b.date) ? 1 : -1 })
      bookCategory.value = categoryID
      bookCover.value = bookResult[0]
      bookChapters.value = bookResult.slice(1)

      useHead({
        title: `Hanan Kassab Hassan - حنان قصاب حسن | ${bookCover.value.title.rendered}`,
        meta: [
          { name: 'title', content: `Hanan Kassab Hassan - حنان قصاب حسن | ${bookCover.value.title.rendered}` },
          { name: 'description', content: bookCover.value.excerpt.rendered.replace('<p>', '').replace('</p>', '') },
          { name: 'og:title', content: `Hanan Kassab Hassan - حنان قصاب حسن | ${bookCover.value.title.rendered}` },
          { name: 'og:description', content: bookCover.value.excerpt.rendered.replace('<p>', '').replace('</p>', '').replace('\n', '') },
          { name: 'og:type', content: 'website' },
          { name: 'og:image', content: 'https://hanan.kassab-hassan.com/images/books/hanan-and-sharif.jpg' },
          { name: 'og:url', content: `https://hanan.kassab-hassan.com${fullPath}` },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: `Hanan Kassab Hassan - حنان قصاب حسن | ${bookCover.value.title.rendered}` },
          { name: 'twitter:description', content: bookCover.value.excerpt.rendered.replace('<p>', '').replace('</p>', '').replace('\n', '') },
          { name: 'twitter:image', content: 'https://hanan.kassab-hassan.com/images/books/hanan-and-sharif.jpg' },
          { name: 'twitter:url', content: `https://hanan.kassab-hassan.com${fullPath}` },
        ]
      })
    }
  }
  catch (e) {
    console.error(e)
  }

</script>
<style lang="scss">
.cover-layout {
  display: flex;
  flex-direction: column;
}
h3 {
    font-size: 2em;
}
.book-intro-wrapper {
  .book-title {
    text-align: center;
    font-size: 2.5em;
    margin: 40px 0;
    padding: 0;
  }
  .book-intro {
    text-align: center;
  }
}
.table-of-content {
  margin: 30px 0 ;
  a {
    text-decoration: none;
    color: #003366;
    font-size: 1.25em;;
    &:hover {
      text-decoration: underline;
      color: #000000;
    }
  }

  .table-of-content-title {
    font-size: 2em;
  }
  ul {
    margin-left: 20px;
  }
}
@media only screen  and (min-width : 768px) {
  .cover-layout {
    display: flex;
    flex-direction: row;
  }
  .table-of-content {
    margin: 50px 0 0 80px;
  }
  .book-intro-wrapper {
    .book-title {
      padding: 0 20px;
    }
  }
}
</style>