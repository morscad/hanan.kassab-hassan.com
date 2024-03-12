<template>
  <div class="page-content cover-layout">
    <div v-if="bookCover" class="book-intro-wrapper">
      <h1 class="font-bold book-title">{{ bookCover.title.rendered }}</h1>
      <div class="font-regular book-intro" v-html="bookCover.content.rendered" />
    </div>
    <div v-if="bookChapters" class="table-of-content">
      <div class="font-bold table-of-content-title">قائمة المحتويات</div>
      <ul>
        <li v-for="chapter in bookChapters" class="font-regular">
          <a :href="`/livres/${bookCategory.slug}/${chapter.slug}`">{{ chapter.title.rendered }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, watch } from 'vue'
  import type { WPCategory, WPArticle, WPArticleData } from '../../types'

  const { apiBasePath } = useRuntimeConfig();
  const { params: { bookName }} = useRoute()
  const bookCategory = ref()
  const bookCover = ref()
  const bookChapters = ref([])

  try {
    
    const { data: categoryData, error:categoryError } = await useAsyncData(() => $fetch(`${apiBasePath}/categories`)) 
    const categoryList = (categoryData as WPCategoriesData)._rawValue as WPCategory[]

    const currentBook = categoryList.filter((book: WPCategory) => book.slug === bookName)[0]
    const categoryID = currentBook.id
    bookCategory.value = currentBook

    const { data, error } = await useAsyncData(() => $fetch(`${apiBasePath}/posts?categories=${categoryID}`)) 
    const chapterList: WPArticle[] = ((data as WPArticleData)._rawValue as WPArticle[]) || []
    const book = chapterList.toSorted((a, b) => new Date(a.date) - new Date(b.date))
    // const chapterList: WPArticle[] = articleStore.articleList.get(categoryID) || []
    // const book = chapterList.toSorted((a, b) => new Date(a.date) - new Date(b.date))

    bookCover.value = book[0]
    bookChapters.value = book.slice(1)
  }
  catch (e) {
    console.error(e)
  }

</script>
<style scoped lang="scss">
.cover-layout {
  display: flex;
}

.book-intro-wrapper {
  .book-title {
    text-align: center;
    font-size: 3em;
    margin: 40px 0;
  }
  .book-intro {
    text-align: center;
  }
}
.table-of-content {
  margin: 50px 0 0 80px;
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
</style>