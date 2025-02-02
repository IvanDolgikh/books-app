import { createRouter, createWebHistory } from "vue-router";

const BooksTable = () => import("../components/BooksTable.vue")
const SomeInfo = () => import("../components/SomeInfo.vue")

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "books-table",
      component: BooksTable,
    },
    {
      path: "/some-info",
      name: "some-info",
      component: SomeInfo,
    }
  ],
});
