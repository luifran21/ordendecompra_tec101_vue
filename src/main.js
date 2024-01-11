import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import * as Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

window.axios = axios;
window.axios.defaults.baseURL="http://localhost:8000/api"


const app = createApp(App)

app.use(router)

const options = {

}

app.use(Toast,options)
app.use(VueAxios, axios)

app.mount('#app')
