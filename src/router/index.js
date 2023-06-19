import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
// import MyComponent from "../views/MyComponentView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/myComponent',
    name: 'myComponent',
    // можна підключити компонент двома способами:
    component: () => import(/* webpackChunkName: "about" */ '../views/MyComponentView.vue')
    // component: MyComponent // який резон через функцію це робити? (строка 17)
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
