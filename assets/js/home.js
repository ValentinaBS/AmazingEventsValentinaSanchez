import { filterAndPrintCards, printCheckboxes, printCards, emptyElement } from "../modules/functions.js";

const cardsContainer = document.getElementById("cards-container");
const checkboxContainer = document.getElementById("checkbox-container")

let allEvents;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(res => res.json())
    .then(data => {
        allEvents = data.events;
        const uniqueEventCategories = Array.from(new Set(allEvents.map(event => event.category)))
        
        printCards(allEvents, cardsContainer)
        printCheckboxes(uniqueEventCategories, checkboxContainer)
    })
    .catch(error => console.error(error))

// submit search value
const form = document.getElementById("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let inputValueSubmit = e.target[0].value
    
    emptyElement(cardsContainer)

    filterAndPrintCards(inputValueSubmit, allEvents, cardsContainer);
})

// clear element
const clearButton = document.querySelector(".clear-btn")

clearButton.addEventListener("click", () => {
    emptyElement(cardsContainer)
    printCards(allEvents, cardsContainer)
})