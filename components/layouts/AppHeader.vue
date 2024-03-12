<template>
  <div class="header-wrapper">
    <div class="header-container page-content">
      <div class="header-title font-bold">
      <a href="/">  حنان قصاب حسن<br />Hanan Kassab Hassan</a>
      </div>
      <div class="header-menu font-regular">
        <v-btn class="font-bold" variant="plain">
          Books
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                v-for="(book, index) in books"
                  :key="index"
                  :value="index"
                  class="font-regular"
                >
                  <v-list-item-title>
                    <a :href="`/livres/${book.slug}`">{{ book.description }}</a>
                  </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const books = ref()

  const { apiBasePath } = useRuntimeConfig();
  const { data, error } = await useAsyncData(() => $fetch(`${apiBasePath}/categories`)) 
  try{
    const categoryList = (data as WPCategoriesData)._rawValue as WPCategory[]
    const booksCategory = categoryList.filter((cat: WPCategory) => cat.slug === 'livres')[0]
    const bookList = categoryList.filter((cat: WPCategory) => cat.parent === booksCategory.id )
    books.value = bookList
  }
  catch (e) {
    console.error(e)
  }
</script>

<style scoped lang="scss">
  .header-wrapper {
    background-color: #D5E3E8;
    width: 100vw;
    height: 100px;

  }
  .header-container {
    display: flex;
    padding: 10px 0px 0px 0px;
  }

  .header-title {
    width: 50%;
    font-size: 2em;
    line-height: 1.25em;

    a {
        text-decoration: none;
        color: #003366;
      }
  }
  .header-menu {
    width: 45%;
    display: flex;
    justify-content: flex-end;
    font-size: 1.5em;
    display: flex;
  }

  .v-list-item-title {
      a {
        text-decoration: none;
        color: #003366;
      }
    }

</style>