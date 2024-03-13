<template>
  <div class="header-wrapper">
    <div class="header-container page-content">
      <div class="header-menu-mobile">
          <v-app-bar-nav-icon  @click.stop="drawer = !drawer" />
        <v-navigation-drawer v-model="drawer" temporary class="header-menu-mobile-drawer">
          <v-list nav>
            <v-list-item class="font-regular">
                <v-list-item-title>Books</v-list-item-title>
                <v-divider />
                <v-list-item
                  v-for="(book, index) in books"
                    :key="index"
                    :value="index"
                    class="font-regular"
                  >
                    <v-list-item-title>
                      <a :href="`/livres/${book.slug}---${book.id}`">{{ book.description }}</a>
                    </v-list-item-title>
                </v-list-item>
            </v-list-item>
          </v-list>
      </v-navigation-drawer>

      </div>
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
                    <a :href="`/livres/${book.slug}---${book.id}`">{{ book.description }}</a>
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
  import type { WPCategory } from '~/types';
  const books = ref()
  const drawer = ref(false)

  const { apiBasePath } = useRuntimeConfig();
  const { data, error } = await useAsyncData(() => $fetch(`${apiBasePath}/categories`)) 
  try{
    if (data && data.value) {
      const categoryList = data.value as WPCategory[]
      const booksCategory = categoryList.filter((cat: WPCategory) => cat.slug === 'livres')[0]
      const bookList = categoryList.filter((cat: WPCategory) => cat.parent === booksCategory.id )
      books.value = bookList
    }
  }
  catch (e) {
    console.error(e)
  }
</script>

<style scoped lang="scss">
  .header-wrapper {
    background-color: #D5E3E8;
    width: 100vw;
    height: 60px;
  }
  .header-container {
    display: flex;
    padding: 10px 0px 0px 0px;
  }
  .header-menu-mobile {
    display: block;
    .header-menu-mobile-drawer{
      padding-top: 40px;
    }
    .v-list-item-title {
      font-size: 1.25em;
      line-height: 2em;
    }
  }
  .header-title {
    font-size: 1em;
    line-height: 1.25em;
    margin-left: auto;
    text-align: right;
    padding-right: 1em;
    a {
        text-decoration: none;
        color: #003366;
      }
  }
  .header-menu {
    width: 45%;
    justify-content: flex-end;
    font-size: 1.5em;
    display: none;
  }

  .v-list-item-title {
    a {
      text-decoration: none;
      color: #003366;
    }
  }

  @media only screen  and (min-width : 768px) {
    .header-wrapper {
      height: 100px;
    }
    .header-title {
      width: 50%;
      font-size: 2em;
      line-height: 1.25em;
      text-align: left;
      padding-right: 0;
    }

    .header-menu-mobile {
      display: none;
    }
    .header-menu {
      display: flex;
    }
  }

</style>