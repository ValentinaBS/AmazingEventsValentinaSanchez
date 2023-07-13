const cardsContainer = document.getElementById("cards-container");

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
                <a href="assets/pages/details.html" class="btn fw-bold details">
                    Details
                </a>
            </div>
        </div>
    </div>
    `
}

function printCards(events, container) {
    let template = "";

    for (let event of events) {
        template += createCard(event)
    }
    container.innerHTML += template;
}

printCards(data.events, cardsContainer)