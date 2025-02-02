<template>
  <div class="book-search">
    <div class="book-search__container">
      <FloatLabel variant="on">
        <InputText
          id="search"
          v-model="title"
          autocomplete="off"
        />
        <label for="search">Поиск</label>
      </FloatLabel>

      <Button
        class="book-search__button-search"
        label="Найти"
        @click="searchBook"
      />

      <router-link
        class="book-search__link"
        to="/some-info"
      >About me</router-link>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue'

import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const emit = defineEmits(['search-book']);

const title = ref<string>('')

const searchBook = async () => {
  emit('search-book', title.value)
}
</script>

<style
  scoped
  lang="scss"
>
.book-search {
  &__container {
    display: flex;
    column-gap: 40px;
    width: 100%;
    margin-bottom: 20px;
  }

  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    padding: 8px 12px;
    text-decoration: none;
    color: rgb(255, 255, 255);
    font-size: 14px;
    border: 1px solid rgb(142, 81, 255);
    border-radius: 6px;
  }

  .p-floatlabel {
    width: 30%;
  }

  .p-inputtext {
    width: 100%;
    background-color: transparent;
  }

  .p-inputtext:enabled:focus {
    border-color: rgb(142, 81, 255);
  }

  .p-floatlabel:has(input:focus) label {
    background-color: rgb(36, 36, 36);
    color: rgb(142, 81, 255);
  }

  &__button-search {
    background-color: transparent;
    border-color: rgb(142, 81, 255);
    color: rgb(255, 255, 255);
    font-size: 14px;

    &.p-button:not(:disabled):hover {
      background-color: transparent;
      border-color: rgb(187, 150, 255);
      color: #ffffff;
    }

    &.p-button:not(:disabled):active {
      background-color: transparent;
      border-color: rgb(187, 150, 255);
      color: rgb(255, 255, 255);
    }

    &.p-button:focus-visible {
      outline-color: rgb(217, 217, 217);
    }
  }
}
</style>