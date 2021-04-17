//import Pages
import PageHome from '../pages/PageHome.vue';
import PageAbout from '../pages/PageAbout.vue';

//import auth
import AuthPage from '../pages/auth/AuthPage.vue';
import LoginPage from '../pages/auth/LoginPage.vue';
import RegisterPage from '../pages/auth/RegisterPage.vue';
import router from '.';
import { store } from 'quasar/wrappers';




const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: PageHome, name:'Home',meta: {requiresAuth: true} },
      { path: '/about', component: PageAbout, name: 'About', meta: {requiresAuth: true}  }
    ],
    meta: {requiresAuth: true} 
  },

  { path: '/auth', component: AuthPage, meta: {requiresUnAuth: true} },

  { path: '/login', component: LoginPage, meta: {requiresUnAuth: true}  },

  { path: '/register', component: RegisterPage, meta: {requiresUnAuth: true}  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
