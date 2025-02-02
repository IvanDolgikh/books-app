<template>
  <section class="books">
    <Preloader v-if="isLoadingData" />
    <div class="books__container">
      <Toast />
      <BookSearch @search-book="searchBook" />
      <table class="books__table">
        <thead class="books__table-head">
          <tr>
            <th>Наименование книги</th>
            <th>Автор(ы)</th>
            <th>Дата публикации</th>
            <th>Категории</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="books__table-body">
          <tr
            v-for="item in books"
            :key="item.id"
            @click.stop="openInfoModal(item)"
            @close-modal="isOpenedInfoModal = !isOpenedInfoModal"
          >
            <td>{{ item.volumeInfo.title }}</td>
            <td>{{ item.volumeInfo.authors?.join(', ') ?? '-' }}</td>
            <td>{{ item.volumeInfo.publishedDate ?? '-' }}</td>
            <td>{{ item.volumeInfo.categories?.join(', ') ?? '-' }}</td>
            <td>
              <Button
                class="books__button-edit"
                icon="pi pi-pencil"
                aria-label="Edit"
                @click.stop="openEditingModal(item)"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Button
        class="books__button-load"
        label="Загрузить еще"
        icon="pi pi-refresh"
        iconPos="right"
        @click="loadMoreResults"
      />

      <Teleport to="body">
        <transition name="modal-fade">
          <DetailInfoModal
            v-if="isOpenedInfoModal"
            :bookInfo="selectedBook"
            @close-modal="isOpenedInfoModal = !isOpenedInfoModal"
          />
        </transition>
      </Teleport>

      <Teleport to="body">
        <transition name="modal-fade">
          <EditingModal
            v-if="isOpenedEditingModal"
            :bookInfo="selectedBook"
            @close-modal="isOpenedEditingModal = !isOpenedEditingModal"
            @update-book="updateBook"
          />
        </transition>
      </Teleport>

    </div>
  </section>
</template>

<script
  setup
  lang="ts"
>
import { onMounted, ref, computed } from 'vue'
import { APIKEY, getBooks } from '../api/getBooks'

import Preloader from '../components/Preloader.vue'
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

import DetailInfoModal from '../components/BooksDetailInfoModal.vue'
import EditingModal from '../components/BooksEditingModal.vue'
import BookSearch from '../components/BooksSearch.vue'

import type { IBook } from '../types/book'

const toast = useToast();

const isLoadingData = ref<boolean>(false)
const isOpenedInfoModal = ref<boolean>(false)
const isOpenedEditingModal = ref<boolean>(false)
const selectedBook = ref<IBook | null>(null)
const books = ref<IBook[]>([])

const maxResults = ref<number>(10);
const startIndex = ref<number>(0);
const bookTitle = ref<string>('Собака');

const url = computed(() => `https://www.googleapis.com/books/v1/volumes?q=${bookTitle.value}&key=${APIKEY}&maxResults=${maxResults.value}&startIndex=${startIndex.value}`);

/**
 * Управляет состоянием загрузки, обрабатывает ошибки.
 * @async
 * @function handleLoading
 * @template T
 * @param {() => Promise<T>} asyncFn Асинхронная функция для выполнения.
 * @returns {Promise<T | undefined>} Результат выполнения асинхронной функции или undefined в случае ошибки.
 * @throws {Error} Если асинхронная функция выбрасывает ошибку.
 * @example
 *  const books = await handleLoading(() => getBooks(url));
 */
const handleLoading = async <T>(asyncFn: () => Promise<T>): Promise<T | undefined> => {
  isLoadingData.value = true;
  try {
    return await asyncFn();
  } catch (error) {
    showError();
  } finally {
    isLoadingData.value = false;
  }
};

/**
 * Загружает больше книг. Создает массив из существующих книг и добавлет к ним новые. 
 * Подзагрузка книг происходит за счет увеличения стартового индекса при запросе 
 * и сохранения существующих книг и книг полученных при новом запросе.
 * @async
 * @function loadMoreResults
 */
const loadMoreResults = async () => {
  startIndex.value += 10;
  const newBooks = await handleLoading(() => getBooks(url.value));
  if (newBooks) {
    books.value = [...books.value, ...newBooks];
  }
};

const openInfoModal = (item: IBook) => {
  isOpenedInfoModal.value = !isOpenedInfoModal.value
  selectedBook.value = item
}

const openEditingModal = (item: IBook) => {
  isOpenedEditingModal.value = !isOpenedEditingModal.value
  selectedBook.value = item
}

/**
 * Обновляет книгу после изменения.
 * @param {IBook} book редактируемая книга
 */
const updateBook = (book: IBook) => {
  const index = books.value.findIndex(item => item.id === book.id)
  if (index !== -1) {
    books.value[index] = book
  }
}

/**
 * Поиск книг.
 * @async
 * @function searchBook
 * @param {string} title заголовок вводимый в поиск.
 */
const searchBook = async (title: string) => {
  startIndex.value = 0;
  bookTitle.value = title;
  const foundBooks = await handleLoading(() => getBooks(url.value));
  if (foundBooks) {
    books.value = foundBooks;
  }
};

const showError = () => {
  toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Перезагрузите страницу или попробуйте позже', life: 3000 });
};

onMounted(async () => {
  const initialBooks = await handleLoading(() => getBooks(url.value));
  if (initialBooks) {
    books.value = initialBooks;
  }
});
</script>

<style
  lang="scss"
  scoped
>
.books {

  &__table {
    width: 100%;
    border: none;
    margin-bottom: 20px;
    border-collapse: collapse;
  }

  &__table-head {
    display: table;
    width: 100%;

    th {
      width: 22%;
      font-weight: bold;
      text-align: left;
      border: none;
      padding: 10px 15px;
      background: #444444;
      font-size: 14px;
    }

    tr {
      th:first-child {
        border-radius: 8px 0 0 8px;
      }

      th:last-child {
        border-radius: 0 8px 8px 0;
        width: 8%;
      }
    }
  }

  &__table-body {
    display: block;
    overflow-y: auto;
    height: 500px;

    td {
      width: 22%;
      text-align: left;
      border: none;
      padding: 10px 15px;
      font-size: 14px;
    }

    &::-webkit-scrollbar {
      width: 4px;
      background-color: rgb(57, 57, 57);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgb(122, 122, 122);
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }

    tr:nth-child(even) {
      background: #2e2e2e;
    }

    tr {
      td:first-child {
        border-radius: 8px 0 0 8px;
      }

      td:last-child {
        border-radius: 0 8px 8px 0;
        width: 8%;
      }
    }
  }

  &__button-load {
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

  &__button-edit {
    background-color: transparent;
    border: none;
    color: #ffffff;
    font-size: 14px;

    &.p-button:not(:disabled):hover {
      background-color: transparent;
      border: none;
      transition: 0.2s;
      color: rgb(142, 81, 255);
    }

    &.p-button:not(:disabled):active {
      background-color: transparent;
      border: none;
      color: rgb(187, 150, 255);
    }

    &.p-button:focus-visible {
      outline-color: rgb(217, 217, 217);
    }
  }


  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-to,
  .modal-fade-leave-from {
    opacity: 1;
  }
}
</style>../types/book