import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Favoris from "@/views/Favoris.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/Favoris", name: "Favoris", component: Favoris },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
