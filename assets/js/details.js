const detailsContainer = document.getElementById("details-container");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(res => res.json())
    .then(data => {
        allEvents = data.events;
        let eventToPrint = allEvents.find(eventObject => eventObject._id == eventId)
        printDetails(detailsContainer, eventToPrint)
    })
    .catch(error => console.error(error))

let urlParams = new URLSearchParams(location.search)
let eventId = urlParams.get("eventId")

function printDetails(container, eventObject) {
    container.innerHTML = `
    <div class="col-md-4">
        <img src="${eventObject.image}" class="details-img rounded-start" alt="${eventObject.name}">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h3 class="card-title fw-bold">${eventObject.name}</h3>
            <p class="card-text">${eventObject.description}</p>
            <ul class="list-group">
                <li class="list-group-item">
                    <span class="fw-bold">Date: </span>${eventObject.date}
                </li>
                <li class="list-group-item">
                    <span class="fw-bold">Category: </span>${eventObject.category}
                </li>
                <li class="list-group-item">
                    <span class="fw-bold">Place: </span>${eventObject.place}
                </li>
                <li class="list-group-item">
                    <span class="fw-bold">Capacity: </span>${eventObject.capacity}
                </li>
                <li class="list-group-item">
                    <span class="fw-bold">${eventObject["assistance"] ? "Assistance: " : "Estimate: "}</span>
                    ${eventObject["assistance"] ? eventObject.assistance : eventObject.estimate}
                </li>
                <li class="list-group-item">
                    <span class="fw-bold">Price: </span>$${eventObject.price}
                </li>
            </ul>
        </div>
    </div>
    `
}