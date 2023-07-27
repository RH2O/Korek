import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DarkLightMode from '@/components/DarkLightMode.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/main.css'
import axios from 'axios';
window.axios = axios;

const app = createApp(App)

app.use(router)

app.component('dark-light-mode', DarkLightMode);

app.mount('#app')
