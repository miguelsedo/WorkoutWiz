
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';


//Configuracion Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBrQj0svyXKDsi665qThMoOL-METGaTapk",
    authDomain: "workoutwiz-7fb08.firebaseapp.com",
    projectId: "workoutwiz-7fb08",
    storageBucket: "workoutwiz-7fb08.appspot.com",
    messagingSenderId: "289478897073",
    appId: "1:289478897073:web:697e7d3b8b0104eb8c6190"
};

//Iniciar firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth (FirebaseApp);
export const FirebaseDB=getFirestore(FirebaseApp);