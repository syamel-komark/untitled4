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
import ECSCalculator from "@/components/costing/ECSCalculator";
import MaterialMaintenance from "@/components/costing/maintenance/MaterialMaintenance";
import CostingMaintenancePage from "@/components/costing/maintenance/CostingMaintenancePage";
import InkMaintenance from "@/components/costing/maintenance/InkMaintenance";
import LaminateMaintenance from "@/components/costing/maintenance/LaminateMaintenance";
import FoilMaintenance from "@/components/costing/maintenance/FoilMaintenance";
import HPClickMaintenance from "@/components/costing/maintenance/HPClickMaintenance";


const routes = [
  { path: '/', component: LoginForm },
  { path: '/dashboard', component: Dashboard },
  { path: '/newlabel', component: NewLabel },
  { path: '/register', component: RegisterUser},
  { path: '/mastercardsearch', component: MastercardSearch},
  { path: '/costingpage', component: CostingPage},
  { path: '/newcosting', component: NewCosting},
  { path: '/newquotation', component: NewQuotation},
  { path: '/registercustomer', component: RegisterCustomer},
  { path: '/ecscalculator', component: ECSCalculator},
  { path: '/materialmaintenance', component: MaterialMaintenance},
  { path: '/costingmaintenancepage', component: CostingMaintenancePage},
  { path: '/inkmaintenance', component: InkMaintenance},
  { path: '/laminatemaintenance', component: LaminateMaintenance},
  { path: '/foilmaintenance', component: FoilMaintenance},
  { path: '/hpclickmaintenance', component: HPClickMaintenance},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
