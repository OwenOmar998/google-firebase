import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxKXye-GN6DsOhA9sg0SFYDl8A-BvN3Ac",
  authDomain: "loginform-b937a.firebaseapp.com",
  projectId: "loginform-b937a",
  storageBucket: "loginform-b937a.appspot.com",
  messagingSenderId: "288828545257",
  appId: "1:288828545257:web:8877f836a35cd17a7d3878",
};

firebase.initializeApp(firebaseConfig);
createApp(App).use(router).use(createPinia()).mount("#app");
