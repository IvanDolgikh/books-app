<template>

  <div class="preloader">
    <div class="preloader__container">
      <ProgressSpinner
        class="preloader__circle"
        strokeWidth="3"
        aria-label="Loading"
      />
      <p class="preloader__title">Минутку, я думаю...</p>
    </div>
  </div>

</template>

<script
  lang="ts"
  setup
>
import ProgressSpinner from 'primevue/progressspinner';
</script>

<style
  lang="scss"
  scoped
>
.preloader {

  &__container {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(44 44 44 / 80%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__circle {
    width: 120px;
    height: 120px;
  }

  &__title {
    margin-top: 20px;
    font-size: 26px;
  }
}

.p-progress-spinner-circle {
  animation: p-progress-spinner-dash 1.5s ease-in-out infinite;
}
</style>