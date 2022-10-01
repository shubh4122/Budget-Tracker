// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQX8rBWNCgqd-aUtizJoJK1drTKtqjnqw",
    authDomain: "budgettracker-eb548.firebaseapp.com",
    databaseURL: "https://budgettracker-eb548-default-rtdb.firebaseio.com",
    projectId: "budgettracker-eb548",
    storageBucket: "budgettracker-eb548.appspot.com",
    messagingSenderId: "1037630041958",
    appId: "1:1037630041958:web:4c344e71e0c67d0d5b22a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, child, onValue } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js"
const db = getDatabase()



function getDataRealtime() {

    const dbRef = ref(db, 'test')
    onValue(dbRef, (snapshot) => {

        console.log('Entering')
        console.log(snapshot.val())
        // snapshot.forEach(childSnapshot => {
        //     // alert(childSnapshot.val())
        // console.log('Entered')
        // });
        console.log('Exiting')

    })

}

window.onload = getDataRealtime;
