<template>
  <div class="detail-info">
    <div
      class="detail-info__modal-overlay"
      @click="closeModalOutside"
    >
      <div class="detail-info__modal">
        <Button
          icon="pi pi-times"
          aria-label="Close"
          @click="$emit('close-modal')"
        />

        <p class="detail-info__description">
          <span>Наименование:</span>
          {{ bookInfo?.volumeInfo.title }}
        </p>
        <p class="detail-info__description">
          <span>Автор(ы):</span>
          {{ bookInfo?.volumeInfo.authors?.join(', ') ?? '-' }}
        </p>
        <p class="detail-info__description">
          <span>Дата публикации:</span>
          {{ bookInfo?.volumeInfo.publishedDate ?? '-' }}
        </p>
        <p class="detail-info__description">
          <span>Категории:</span>
          {{ bookInfo?.volumeInfo.categories?.join(', ') ?? '-' }}
        </p>
        <p class="detail-info__description">
          <span>Описание:</span>
          {{ bookInfo?.volumeInfo.description }}
        </p>
      </div>
    </div>

  </div>
</template>

<script
  setup
  lang="ts"
>
import { onMounted, onUnmounted } from 'vue'
import Button from 'primevue/button';
import type { IBook } from '../types/book'

const emit = defineEmits(['close-modal']);

const props = defineProps<{
  bookInfo: IBook | null
}>()


/**
 * Закрывает модальное окно при клике вне его области
 * @param {Event} evt Событие
 */
const closeModalOutside = (evt: Event) => {
  if (evt.target instanceof HTMLElement && evt.target.classList.contains('detail-info__modal-overlay')) {
    emit('close-modal');
  }
};

/**
 * Закрывает модальное окно при клике на esc
 * @param {Event} evt Событие
 */
const handleEscKey = (evt: Event) => {
  if (evt instanceof KeyboardEvent && evt.key === 'Escape') {
    emit('close-modal');
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey);
});

</script>

<style lang="scss">
.detail-info {
  &__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
    background-color: rgb(59, 59, 59);
    border-radius: 10px;
    padding: 20px;
    max-width: 45%;
  }

  &__modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
  }

  &__description {
    span {
      font-weight: 600;
    }
  }

  &__modal-close-button {
    font-size: 18px;
  }

  .p-button {
    display: flex;
    margin: 0 0 14px auto;
    background-color: transparent;
    color: #ffffff;
    padding: 0;
    width: fit-content;
    border: none;
  }

  .p-button:not(:disabled):hover {
    background: transparent;
    border: none;
    color: #d9d9d9;
  }

  .p-button-icon {
    font-size: 18px;
  }
}
</style>../types/book