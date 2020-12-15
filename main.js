const seats = document.querySelectorAll(".seat");
const today = new Date();

// date.value == what is the value of selected when submited. 

// AKTUÁLNÍ DATA select dates
//const currentDate = document.getElementById("today");
//currentDate.setAttribute('value', today.toLocaleDateString());
//console.log(date.value)
//window.localStorage.setItem("date", today);

// SHOW AVAILABLE SEATS 
const date = document.getElementById("dates")
const session = document.getElementById("sessions");
const next = document.getElementById("next");

const dateId = (event) => {
    event.preventDefault();
    let dateId = `${date.value}-${session.value}`;
    const unavailable = JSON.parse(localStorage.getItem(dateId));
    console.log(unavailable);
    for (let i = 0; i < unavailable.length ; i++){
        for (var l = 0; l < seats.length; l++) {
            if (unavailable[i] === seats[l].id){
                seats[l].classList.add("selected");
                seats[i].removeEventListener("click", getSeats);
}}
    }};
next.addEventListener("click", dateId);

// SELECT SEATS

function addEventListenerList() {
    for (var i = 0; i < seats.length; i++) {
        seats[i].addEventListener("click", getSeats, false);
    }
}

let selectedSeats = [];
const getSeats = (event) =>{
    selectedSeats.push(event.target.id);
    console.log(selectedSeats)
}

addEventListenerList();

// UPDATE LOCAL STORAGE WITH NEW SELECTION 

const submitSelection = document.getElementById("submit");

const fetchData = (event, dateId) => {
    event.preventDefault();
    const unavailable = JSON.parse(localStorage.getItem("15-10"));
    console.log(unavailable);
    let newSelection = [...unavailable, ...selectedSeats];
    // ZBAVIT SE DUPLIKÁTŮ
    console.log(newSelection);
    localStorage.setItem("15-10", JSON.stringify(newSelection))
}
submitSelection.addEventListener("click", fetchData);


/*

var names = [];
names[0] = prompt("New member name?");
localStorage.setItem("names", JSON.stringify(names));

//...
var storedNames = JSON.parse(localStorage.getItem("names"))


// show only available seats.
const isOccupied = (dateID) => {
    JSON.parse(
               // seats[l].removeEventListener("click", getSeats)
            }  
        }; 

}}

next.addEventListener("click", isOccupied);

// SELECT SEATS

const occupied = ["A3", "A4", "A1"]
localStorage.setItem("15-10", JSON.stringify(occupied));
console.log(JSON.parse(localStorage.getItem("15-10")));


//console.log(selectedSeats)
*/