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

var submitBtn = document.getElementById('submit');
var newItemBtn = document.getElementById('new-item');


var exp_wifi = document.getElementById('expenditure_wifi')
var exp_auto = document.getElementById('expenditure_auto')
var exp_food = document.getElementById('expenditure_food')
var exp_travel = document.getElementById('expenditure_travel')
var exp_misc = document.getElementById('expenditure_misc')




// exp_wifi.disabled = true
// exp_auto.disabled = true
// exp_food.disabled = true
// exp_travel.disabled = true
// exp_misc.disabled = true

var date = new Date();
// maybe for convenience create arr and through index show month name
var month = `${date.getMonth() + 1}-${date.getFullYear()}`
document.getElementById('month').innerHTML = `For --> ${month}`



// var expList = []
const obj = {wifi: 0, auto: 0, food: 0, travel: 0, misc: 0};
var expMap = new Map(Object.entries(obj));
var items = ["wifi", "auto", "food", "travel", "misc"]
for (let i in items) {
    expMap[items[i]] = 0
}


// ----------------------Reading data----------------------

function getDataRealtime() {
    var i = 0;

    const dbRef = ref(db, `Expenditure/${month}`)
    onValue(dbRef, (snapshot) => {

        snapshot.forEach(childSnapshot => {
            // expList.push(childSnapshot.val())
            expMap[Object.keys(snapshot.val())[i]] = childSnapshot.val()
            i++;
        });

    
        setDataInTable(expMap)
    })

}

window.onload = getDataRealtime;




//--------============== SEE while reading theres a problem. When solved, just write this data to input fields too.


function setDataInTable(expMap) {
    var items = ["wifi", "auto", "food", "travel", "misc"]
    for (let i in items) {
        document.getElementById(`val_${items[i]}`).innerHTML = `Rs. ${expMap[items[i]]}`
        // document.getElementById(`expenditure_${items[i]}`).value = `${expMap[items[i]]}`
        if(items[i] != "misc")
            document.getElementById(`expenditure_${items[i]}`).value = 0

        else
        document.getElementById(`expenditure_misc`).value = `${expMap["misc"]}`
    }
}



submitBtn.addEventListener("click", async() => {
    // ----------------------Submitting new Expenditure if any, else keep it unchanged----------------------
    // Put NULL CHECK

    const expRef = ref(db, `Expenditure/${month}`)
    // const expMonthRef = ref(expRef, month.value)
    set(expRef, {
        wifi: parseInt(exp_wifi.value, 10) + expMap["wifi"],
        auto: parseInt(exp_auto.value, 10) + expMap["auto"],
        travel: parseInt(exp_travel.value, 10) + expMap["travel"],
        food: parseInt(exp_food.value, 10) + expMap["food"],
        misc: exp_misc.value
    });


    window.alert(month + " Written to database")

    await window.location.reload()

})


// unlockBtn.addEventListener("click", () => {
//     exp_wifi.disabled = false
//     exp_auto.disabled = false
//     exp_food.disabled = false
//     exp_travel.disabled = false
//     exp_misc.disabled = false
//     window.alert('Expenditure Unlocked')
// })