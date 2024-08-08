import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAxH3oQz_Ydeia0BXe7MG4Yc9Uzxb5AqWo",
  authDomain: "chat-app-2e400.firebaseapp.com",
  projectId: "chat-app-2e400",
  storageBucket: "chat-app-2e400.appspot.com",
  messagingSenderId: "470396935683",
  appId: "1:470396935683:web:f994aef2dc130b7a08f836",
  databaseURL:'https://chat-app-2e400-default-rtdb.firebaseio.com/'
};
export const app = initializeApp(firebaseConfig);