import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import UserList from "./components/UserList.vue";
import EditUser from "./components/EditUser.vue";

import App from "./App.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: { name: "users" } },
    {
      path: "/user-managment-app/",
      redirect: { name: "users" },
    },
    { path: "/user-managment-app/users", name: "users", component: UserList },
    {
      path: "/user-managment-app/users/:userId(.*)",
      component: EditUser,
      props: true,
    },
  ],
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 300);
    });
  },
});

const app = createApp(App);

app.use(router);

app.mount("#app");
