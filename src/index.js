import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from "firebase/compat/app";
// import reportWebVitals from './reportWebVitals';


const firebaseConfig = {
  apiKey: "AIzaSyCdQw0nTA8WmcsZI5y8OZ99tSAonJDdUpM",
  authDomain: "cart-9e51f.firebaseapp.com",
  projectId: "cart-9e51f",
  storageBucket: "cart-9e51f.appspot.com",
  messagingSenderId: "1009304499763",
  appId: "1:1009304499763:web:7361edd4eae44189731546"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
