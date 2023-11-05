import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import "./style.css";

import App from "./App.vue";
import Home from "./pages/Home.vue";
import Chat from "./pages/Chat.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/chat", component: Chat },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
