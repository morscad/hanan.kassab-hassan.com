<template>
  <template v-for="book in books">
    <div><a :href="`/livres/${book.slug}`">{{ book.description }}</a></div>
  </template>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  
  // const books = ref([]) 
  // const { apiBasePath } = useRuntimeConfig();
  // const { data, error } = await useAsyncData(() => $fetch(`${apiBasePath}/categories`)) 
  // try {
  //   const { _rawValue: categoryList } = data
  //   const booksCategory = categoryList.filter(cat => cat.slug === 'livres' )[0]
  //   const bookList = categoryList.filter(cat => cat.parent === booksCategory.id )
  //   if (bookList && bookList.length) {
  //     books.value = bookList
  //   }
  // }
  // catch(e) {
  //   console.error(e)
  // }

</script>