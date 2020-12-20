const seats = document.querySelectorAll(".seat");
const cinema = document.getElementsByClassName("cinemaview");
const date = document.getElementById("dates");
const session = document.getElementById("sessions");
const next = document.getElementById("next");
const submitSelection = document.getElementById("submit");

// CALENDAR
const today = new Date();
const currdate = today.getDate();
const currtime = today.getHours();
const currmonth = today.getMonth();
const monthString = today.toLocaleString('default', { month: 'long' });
const calendar = document.querySelector(".calendar");

calendar.insertAdjacentHTML("beforebegin",
`<h2 class="monthname">${monthString}</h2>`);

for (let day = 1; day < 31 + 1; day++){
    calendar.insertAdjacentHTML("beforeend", 
    `<option id="day" class="day" value=${day}>${day}</option>`)
}
const days = document.querySelectorAll(".day");

// disable selection of time less then now + select day 
const op = document.getElementById("sessions").getElementsByTagName("option");

const select = (event) => {
    event.target.classList.toggle("selectedDate");
    const selectedDay = event.target.value;
    // disable selection of todays past time
    for (var i = 0; i < op.length; i++) {
        (op[i].value < currtime && selectedDay === currdate) 
        ? op[i].disabled = true 
        : op[i].disabled = false;
    }
}

// show today and past days
for (let day = 0; day < days.length; day++){ 
    days[day].addEventListener("click", select);
    if (day < currdate-1) {       
        days[day].classList.add("disabled");
    } else if (day === currdate-1) {
        days[day].classList.toggle("selection");
    } 
}


// create ID for the day and session 
const getDateId = () => {
    let dayId = "";
    for (let i = 0; i < days.length ; i++){
        if (days[i].classList[1] === "selectedDate" || days[i].classList[2] === "selectedDate"){
            dayId = days[i]; 
        }
    }
    if (session.value === "" || dayId.value === undefined){
        alert("Please select valid time")
    } else {
        let dateId = `${dayId.value}-${currmonth+1}-${session.value}`; 
        return dateId;
    }
 }

// SHOW AVAILABLE SEATS 
const getAvailableSeats = (event) => {
    event.preventDefault();
    
    let dateId = getDateId();
    if (dateId === undefined){
        console.log("valid time session not provided")
    } else {cinema[0].classList.add("active")};   

    const unavailable = JSON.parse(localStorage.getItem(dateId));
    console.log(unavailable);

    for (let i = 0; i < unavailable.length ; i++){
        for (var l = 0; l < seats.length; l++) {
            if (unavailable === null)
            {seats[l].classList.remove("selected");
            } else if (unavailable[i] === seats[l].id){
                seats[l].classList.add("selected");
                seats[l].removeEventListener("click", getSeats);
             //} else if (unavailable[i] !== seats[l].id){
            //seats[l].classList.remove("selected");}
        }
    }
}};

session.addEventListener("change", getAvailableSeats);
next.addEventListener("click", getAvailableSeats);

// SELECT SEATS

function addEventListenerList() {
    // if day is less then now, show without possibility to change
    let dayId = "";
    for (let i = 0; i < days.length ; i++){
        if (days[i].classList[2] === "selectedDate" || days[i].classList[3] === "selectedDate"){
            dayId = days[i]; 
        }
    }
    for (var i = 0; i < seats.length; i++) {
        (dayId.value < currdate-1) ?
        console.log("past day selected") :
        seats[i].addEventListener("click", selectSeats, false);
    }
}

const selectSeats = (event) =>{
    let seat = event.target;
    if (seat.classList[1] === "selected"){
        console.log("unavailable seat selected")
    } else
    {seat.classList.toggle("selection");} 
}
next.addEventListener("click", addEventListenerList);

// FETCH SELECTION OF SEATS
let selectedSeats = [];
const getSeats = () => {
    for (var i = 0; i < seats.length; i++) {
        if (seats[i].classList[1] === "selection")
        {selectedSeats.push(seats[i].id);
    }
}  
}

/*
submitSelection.insertAdjacentHTML("beforebegin", 
    `<h3>You have selected seats ${selectedSeats[0]}</h3>`)

*/

// UPDATE LOCAL STORAGE WITH NEW SELECTION 

const fetchData = () => {
    getSeats();
    let dateId = getDateId();
    let newSelection = "";
    const unavailable = JSON.parse(localStorage.getItem(dateId));
    if (unavailable === null){
         newSelection = selectedSeats;
    } else {newSelection = [...unavailable, ...selectedSeats];}
    const duplicate = [...new Set(newSelection)];
    localStorage.setItem(dateId, JSON.stringify(duplicate))
}
submitSelection.addEventListener("click", fetchData);

