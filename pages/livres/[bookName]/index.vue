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
    
    const { data, error} = await useAsyncData(`book-category-${bookName}`, async () => {
      const categoryData = await $fetch(`${apiBasePath}/categories`); 
      const categoryList = categoryData as WPCategory[];
      
      const currentBook = categoryList.filter((book: WPCategory) => book.slug === bookName)[0]
      const categoryID = currentBook.id
      
      const chapters = await $fetch(`${apiBasePath}/posts?categories=${categoryID}`);
      const chapterList: WPArticle[] = (chapters as WPArticle[]) || []
      const bookResult = chapterList.toSorted((a, b) => new Date(a.date) - new Date(b.date))
      
      return  { chapters: bookResult, book: currentBook }
    })
    if (error) {
      throw new Error(error)
    }
    const { chapters, book } = data._rawValue
    bookCategory.value = book
    bookCover.value = chapters[0]
    bookChapters.value = chapters.slice(1)
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