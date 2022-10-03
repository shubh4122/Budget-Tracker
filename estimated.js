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
import { getDatabase, ref, child, onValue, push, set } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js"
const db = getDatabase(app)



// ----------------------Getting all buttons----------------------

var lockBtn = document.getElementById('lockBtn');
var unlockBtn = document.getElementById('unlockBtn');


var est_wifi = document.getElementById('estimation_wifi')
var est_auto = document.getElementById('estimation_auto')
var est_food = document.getElementById('estimation_food')
var est_travel = document.getElementById('estimation_travel')
var est_misc = document.getElementById('estimation_misc')




est_wifi.disabled = true
est_auto.disabled = true
est_food.disabled = true
est_travel.disabled = true
est_misc.disabled = true

var date = new Date();
// maybe for convenience create arr and through index show month name
var month = `${date.getMonth() + 1}-${date.getFullYear()}`
document.getElementById('month').innerHTML = `For --> ${month}`



// var estList = []
const obj = {wifi: '0', auto: '0', food: '0', travel: '0', misc: '0'};
var estMap = new Map(Object.entries(obj));


// ----------------------Reading data----------------------

function getDataRealtime() {
    var i = 0;

    const dbRef = ref(db, `Estimation/${month}`)
    onValue(dbRef, (snapshot) => {

        snapshot.forEach(childSnapshot => {
            // estList.push(childSnapshot.val())
            estMap[Object.keys(snapshot.val())[i]] = childSnapshot.val()
            i++;
        });

    
        setDataInTable(estMap)
    })

}

window.onload = getDataRealtime;




//--------============== SEE while reading theres a problem. When solved, just write this data to input fields too.


function setDataInTable(estMap) {
    var items = ["wifi", "auto", "food", "travel", "misc"]
    for (let i in items) {
        document.getElementById(`val_${items[i]}`).innerHTML = `Rs. ${estMap[items[i]]}`
        document.getElementById(`estimation_${items[i]}`).value = `${estMap[items[i]]}`
    }
}



lockBtn.addEventListener("click", async() => {
    // ----------------------Submitting new Estimation if any, else keep it unchanged----------------------
    // Put NULL CHECK

    const estRef = ref(db, `Estimation/${month}`)
    // const estMonthRef = ref(estRef, month.value)
    set(estRef, {
        wifi: est_wifi.value,
        auto: est_auto.value,
        travel: est_travel.value,
        food: est_food.value,
        misc: est_misc.value
    });


    window.alert(month + " Written to database")

    await window.location.reload()

})


unlockBtn.addEventListener("click", () => {
    est_wifi.disabled = false
    est_auto.disabled = false
    est_food.disabled = false
    est_travel.disabled = false
    est_misc.disabled = false
    window.alert('Estimation Unlocked')
})