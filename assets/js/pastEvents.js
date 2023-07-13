const cardsContainer = document.getElementById("cards-container");

// submit search value
const form = document.getElementById("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let inputValue = e.target[0].value
    
    emptyElement(cardsContainer)

    filterAndPrintCards(inputValue);
})

function filterAndPrintCards(searchInput) {
    const filteredEventsSearch = data.events.filter(event => event.name.toLowerCase().includes(searchInput.toLowerCase()))
    const filteredEventsAll = filterCheckboxCategories(filteredEventsSearch);
    printCards(filteredEventsAll, data.currentDate, cardsContainer);

    if (cardsContainer.childNodes.length === 0) {
        cardsContainer.innerHTML = `
        <h3 class="search-message text-center">No elements match your search... Try again!</h3>
        `
    }
}

// checkbox functions
const checkboxContainer = document.getElementById("checkbox-container")
const uniqueEventCategories = Array.from(new Set(data.events.map(event => event.category)))

function filterCheckboxCategories(events){
    const checkedCheckbox =  Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(check => check.value)
    const filteredResult = events.filter(event => checkedCheckbox.includes(event.category))

    if(checkedCheckbox.length === 0) {
        return events
    } else {
        return filteredResult
    }
}

function createCheckbox(eventCategory) {
    return `
    <div class="form-check">
        <input class="form-check-input" type="checkbox" id="${eventCategory}" value="${eventCategory}">
        <label class="form-check-label" for="${eventCategory}">${eventCategory}</label>
    </div>
    `
}

function printCheckboxes(categories, container) {
    let template = ""

    for (let category of categories) {
        template += createCheckbox(category)
    }

    container.innerHTML += template
}

printCheckboxes(uniqueEventCategories, checkboxContainer)

// card functions
function createCard(obj) {
    return `
    <div class="card shadow card-events">
        <img src="${obj.image}" class="card-img-top" alt="${obj.name} event">
        <div class="card-body text-center d-flex flex-column justify-content-between">
            <h3 class="card-title fw-bold">
                ${obj.name}
            </h3>
            <p class="card-text">
                ${obj.description}
            </p>
            <div class="d-flex justify-content-around align-items-center">
                <span>
                    Price: $${obj.price}
                </span>
                <a href="../pages/details.html?eventId=${obj._id}" class="btn fw-bold details">
                    Details
                </a>
            </div>
        </div>
    </div>
    `
}

function printCards(events, currentDate, container) {
    let template = "";

    for (let event of events) {
        if (event.date < currentDate) {
            template += createCard(event)
        }
    }
    container.innerHTML += template;
}

printCards(data.events, data.currentDate, cardsContainer)

// clean element
const clearButton = document.querySelector(".clear-btn")
const clearButtonMobile = document.querySelector(".clear-btn-mobile")

clearButton.addEventListener("click", () => {
    emptyElement(cardsContainer)
    printCards(data.events, data.currentDate, cardsContainer)
})

clearButtonMobile.addEventListener("click", () => {
    emptyElement(cardsContainer)
    printCards(data.events, data.currentDate, cardsContainer)
})

function emptyElement(element){
    element.innerHTML = ""
}