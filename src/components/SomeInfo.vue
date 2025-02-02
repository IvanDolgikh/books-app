<template>
  <section class="about-me">
    <router-link
      class="about-me__link-back"
      to="/"
    >
      <span class="pi pi-arrow-left"></span>
    </router-link>
    <div class="about-me__container">

      <div class="about-me__info">
        <img
          class="about-me__image"
          width="300"
          height="400"
          src="../assets/images/me.jpg"
          alt="Иван Долгих."
        >
        <p class="about-me__name">Долгих Иван, 22 года &#128075</p>
      </div>

      <div class="about-me__additional-info">
        <h1 class="about-me__title">Немного обо мне</h1>
        <p>
          Постоянно изучаю что-то новое из&nbsp;мира фронтенда, на&nbsp;данный момент это nuxt. В&nbsp;скором времени
          хочу углубиться в&nbsp;бекенд на&nbsp;node&nbsp;js. Я&nbsp;разработал два пет-проекта на&nbsp;Vue
          3&nbsp;совместно с&nbsp;backend-разработчиком: сервис для подбора путешествий на&nbsp;основе индивидуальных
          предпочтений и&nbsp;приложение для подбора тренера в&nbsp;спортивном зале. Писал парсер на&nbsp;node
          js&nbsp;для сбора объектов недвижимости на&nbsp;соответствующих сайтах.
        </p>
        <p>
          Регулярно занимаюсь в&nbsp;спортивном зале. Изучаю английский язык, на&nbsp;данный момент уровень владения
          языком&nbsp;&mdash; B1.
        </p>
        <p>
          Коммуникабельный, трудоспособен, с&nbsp;хорошим чувством юмора.
        </p>

        <div class="about-me__links-container">
          <a
            class="about-me__resume"
            href="https://disk.yandex.ru/i/qL9tyWzMvNd9BA"
            target="_blank"
          >Мое резюме (тык)</a>

          <a
            class="about-me__github"
            href="https://github.com/IvanDolgikh"
            target="_blank"
          >Мой гитхаб (тык)</a>
        </div>

      </div>
    </div>
  </section>
</template>


<script
  setup
  lang="ts"
>
</script>

<style
  scoped
  lang="scss"
>
.about-me {

  &__container {
    display: flex;
    text-align: left;
    column-gap: 40px;
  }

  &__title {
    margin: 0;
  }

  &__info {
    background-color: rgb(56, 56, 56);
    padding: 20px;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

  &__image {
    display: block;
    object-fit: cover;
    border-radius: 20px;
    margin-bottom: 20px;
  }


  &__name {
    margin: 0;
    font-size: 20px;
  }

  &__additional-info {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    background-color: rgb(56, 56, 56);
    padding: 20px;
    border-radius: 20px;

    p {
      margin: 0;
    }
  }

  &__links-container {
    display: flex;
    column-gap: 20px;
    margin-top: auto;
  }

  &__resume,
  &__github {
    display: inline-block;
    text-decoration: none;
    color: rgb(255, 255, 255);
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: rotate(30deg);
    }
  }

  &__link-back {
    display: block;
    width: fit-content;
    margin: 0 auto 30px 20px;
    color: rgb(255, 255, 255);
    transition: transform 0.2s ease-in-out;

    span {
      font-size: 20px;
    }

    &:hover {
      transform: translateX(-12px);
    }
  }
}
</style>