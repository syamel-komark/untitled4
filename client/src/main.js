import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import Dashboard from './components/DashboardForm.vue';
import NewLabel from './components/mastercard/NewLabel.vue';
import RegisterUser from "@/components/admin/RegisterUser";
import MastercardSearch from "@/components/mastercard/MastercardSearch";
import CostingPage from "@/components/costing/CostingPage";
import NewCosting from "@/components/costing/NewCosting";
import NewQuotation from "@/components/quotation/QuotationPage";
import RegisterCustomer from "@/components/Customer/RegisterCustomer";


const routes = [
  { path: '/', component: LoginForm },
  { path: '/dashboard', component: Dashboard },
  { path: '/newlabel', component: NewLabel },
  { path: '/register', component: RegisterUser},
  { path: '/mastercardsearch', component: MastercardSearch},
  { path: '/costingpage', component: CostingPage},
  { path: '/newcosting', component: NewCosting},
  { path: '/newquotation', component: NewQuotation},
  { path: '/registercustomer', component: RegisterCustomer}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
