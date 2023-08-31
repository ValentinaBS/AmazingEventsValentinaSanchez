import { filterAndPrintCards, printCheckboxes, printCards, emptyElement } from "../modules/functions.js";import {} from "../modules/functions.js"

const cardsContainer = document.getElementById("cards-container");
const checkboxContainer = document.getElementById("checkbox-container")

let filteredUpcomingEvents;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(res => res.json())
    .then(data => {
        let allEvents = data.events;
        let currentDate = data.currentDate;
        const uniqueEventCategories = Array.from(new Set(allEvents.map(event => event.category)))
        filteredUpcomingEvents = allEvents.filter(event => event.date > currentDate);

        printCards(filteredUpcomingEvents, cardsContainer)
        printCheckboxes(uniqueEventCategories, checkboxContainer)
    })
    .catch(error => console.error(error))

// submit search value
const form = document.getElementById("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let inputValueSubmit = e.target[0].value
    
    emptyElement(cardsContainer)

    filterAndPrintCards(inputValueSubmit, filteredUpcomingEvents, cardsContainer);
})

// clean element
const clearButton = document.querySelector(".clear-btn")

clearButton.addEventListener("click", () => {
    emptyElement(cardsContainer)
    printCards(filteredUpcomingEvents, cardsContainer)
})