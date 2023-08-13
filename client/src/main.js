import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import Dashboard from './components/DashboardForm.vue';
import NewLabel from  './components/NewLabel.vue';
import RegisterUser from "@/components/RegisterUser";
import MastercardSearch from "@/components/MastercardSearch";
import CostingPage from "@/components/CostingPage";
import NewCosting from "@/components/NewCosting";


const routes = [
  { path: '/', component: LoginForm },
  { path: '/dashboard', component: Dashboard },
  { path: '/newlabel', component: NewLabel },
  { path: '/register', component: RegisterUser},
  { path: '/mastercardsearch', component: MastercardSearch},
  { path: '/costingpage', component: CostingPage},
  { path: '/newcosting', component: NewCosting},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
