<template>
  <div class="editing-modal">
    <div
      class="editing-modal__modal-overlay"
      @click="closeModalOutside"
    >
      <div class="editing-modal__modal">
        <Button
          class="editing-modal__button-close"
          icon="pi pi-times"
          aria-label="Close"
          @click="$emit('close-modal')"
        />

        <Toast />

        <Form
          class="editing-modal__form"
          v-slot="$form"
          :initialValues
          :resolver
          :validateOnValueUpdate="false"
          :validateOnBlur="true"
          :validateOnMount="['firstName']"
          @submit="onFormSubmit"
        >
          <label for="title">Наименование книги</label>
          <InputText
            id="title"
            name="title"
            v-model="initialValues.title"
            type="text"
            placeholder="Книга о собаках"
            fluid
            maxlength="250"
          />
          <Message
            class="editing-modal__message"
            v-if="$form.title?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >{{ $form.title.error.message }}</Message>

          <Button
            class="editing-modal__button-save"
            type="submit"
            label="Сохранить"
          />
        </Form>

      </div>
    </div>

  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'

import { useToast } from 'primevue/usetoast';
import { Form } from '@primevue/forms';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';

import type { IBook } from '../types/book'

const emit = defineEmits(['close-modal', 'update-book']);

const props = defineProps<{
  bookInfo: IBook | null
}>()

const toast = useToast();

const initialValues = ref({
  title: props.bookInfo?.volumeInfo.title || '',
});

type TResolver = Record<string, any>

/**
 * Проверяет наличие текста в инпуте. В случае, если оно пустое покажет сообщение об ошибке
 * @param {TResolver} obj Событие
 */
const resolver = (obj: TResolver) => {
  const errors: TResolver = {};

  if (!obj.values.title) {
    errors.title = [{ message: 'Обязательно для заполнения' }];
  }
  return {
    errors
  };
};

/**
 * Проверяет валидность перед отправкой. В случае, если все хорошо, создает и передает новый объект в родительский компонент.
 * В случае успеха добавляет сообщение об успешном изменении.
 * @param {TResolver} obj Событие
 */
const onFormSubmit = (obj: TResolver) => {
  if (obj.valid && props.bookInfo) {
    emit('update-book', {
      ...props.bookInfo,
      volumeInfo: {
        ...props.bookInfo.volumeInfo,
        title: obj.states.title.value
      }
    });

    setTimeout(() => {
      emit('close-modal');
    }, 3000);

    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Изменение прошло успешно', life: 3000 });
  }
}

/**
 * Закрывает модальное окно при клике вне его области
 * @param {Event} evt Событие
 */
const closeModalOutside = (evt: Event) => {
  if (evt.target instanceof HTMLElement && evt.target.classList.contains('editing-modal__modal-overlay')) {
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

<style
  lang="scss"
  scoped
>
.editing-modal {
  &__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
    background-color: rgb(59, 59, 59);
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    max-width: 35%;
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

  &__form {
    label {
      display: block;
      margin-bottom: 12px;
    }
  }

  &__message {
    font-size: 14px;
    color: rgb(252, 165, 165);
  }

  &__button-close {
    display: flex;
    margin: 0 0 14px auto;
    background-color: transparent;
    color: rgb(255, 255, 255);
    padding: 0;
    width: fit-content;
    border: none;

    &.p-button:not(:disabled):hover {
      background-color: transparent;
      border: none;
      color: rgb(217, 217, 217);
    }

    &.p-button:focus-visible {
      outline-color: rgb(217, 217, 217);
    }
  }

  &__button-save {
    display: block;
    width: 40%;
    margin: 15px auto 0 auto;
    background-color: rgb(142, 81, 255);
    color: rgb(255, 255, 255);
    border: none;

    &.p-button:not(:disabled):hover {
      background-color: rgb(198, 167, 255);
      border: none;
      color: rgb(39, 39, 39);
    }

    &.p-button:focus-visible {
      outline-color: rgb(217, 217, 217);
    }
  }

  .p-inputtext {
    background-color: transparent;

    &::placeholder {
      color: rgba(255, 255, 255, 0.581);
    }
  }

  .p-inputtext:enabled:focus {
    border-color: rgb(142, 81, 255);
  }
}
</style>../types/book