export function filterAndPrintCards(searchInput, events, container) {
    const filteredEventsSearch = events.filter(event => event.name.toLowerCase().includes(searchInput.toLowerCase()))
    const filteredEventsAll = filterCheckboxCategories(filteredEventsSearch);
    printCards(filteredEventsAll, container);

    if (container.childNodes.length === 0) {
        container.innerHTML = `
        <h3 class="search-message text-center">No elements match your search... Try again!</h3>
        `
    }
}

// checkbox functions
function filterCheckboxCategories(events){
    const checkedCheckbox =  Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(check => check.value)
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

export function printCheckboxes(categories, container) {
    let template = ""

    for (let category of categories) {
        template += createCheckbox(category)
    }

    container.innerHTML += template
}

// card functions
function createCard(obj) {
    return `
    <div class="card shadow card-events">
        <img src="${obj.image}" class="card-img-top" alt="${obj.name} event">
        <div class="card-body text-center d-flex flex-column justify-content-between my-1">
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
                <a href="assets/pages/details.html?eventId=${obj._id}" class="btn fw-bold details">
                    Details
                </a>
            </div>
        </div>
    </div>
    `
}

export function printCards(events, container) {
    let template = "";

    for (let event of events) {
        template += createCard(event)
    }

    container.innerHTML += template;
}

// clear element
export function emptyElement(element){
    element.innerHTML = ""
}