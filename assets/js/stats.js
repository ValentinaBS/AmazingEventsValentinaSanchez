const highestAssistanceContainer = document.getElementById("highest-assistance");
const lowestAssistanceContainer = document.getElementById("lowest-assistance");
const largestCapacityContainer = document.getElementById("largest-capacity");
const upcomingRows = document.getElementById("upcoming-rows");
const pastRows = document.getElementById("past-rows");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(res => res.json())
    .then(data => {
        let allEvents = data.events;
        let currentDate = data.currentDate;

        let filteredPastEvents = allEvents.filter(event => event.date < currentDate);
        let filteredUpcomingEvents = allEvents.filter(event => event.date > currentDate);

        sortEvents(filteredPastEvents);
        sortEvents(filteredUpcomingEvents);
        
        printGeneralStatistics(allEvents)
        printRows(filteredUpcomingEvents, upcomingRows)
        printRows(filteredPastEvents, pastRows)
    })
    .catch(error => console.error(error))

function sortEvents(events) {
    events.sort((a, b) => a.category.localeCompare(b.category));
}

function printGeneralStatistics(events) {
    let lowestPercentage = 100;
    let highestPercentage = 0;
    let largestCapacity = 0;
    let highestEvent;
    let lowestEvent;
    let largestEvent;

    for (let event of events) {
        let percentage = event.assistance
            ? Math.round((event.assistance / event.capacity) * 100)
            : Math.round((event.estimate / event.capacity) * 100);
        let capacity = event.capacity

        if (percentage > highestPercentage) {
            highestPercentage = percentage;
            highestEvent = event.name;
        } 
        if (percentage < lowestPercentage) {
            lowestPercentage = percentage;
            lowestEvent = event.name;
        }
        if (capacity > largestCapacity) {
            largestCapacity = capacity;
            largestEvent = event.name;
        } 
    }

    highestAssistanceContainer.textContent = `${highestEvent} - ${highestPercentage}%`;
    lowestAssistanceContainer.textContent = `${lowestEvent} - ${lowestPercentage}%`;
    largestCapacityContainer.textContent = `${largestEvent} - ${largestCapacity} people`;
}

function createRow(stats) {
    let assistanceOrEstimate = stats.assistance || stats.estimate;
    let assistanceOrEstimatePercentage = Math.round((assistanceOrEstimate / stats.capacity) * 100);

    return `
    <tr>
        <td>${stats.category}</td>
        <td>$${(stats.price * assistanceOrEstimate).toLocaleString("en-EN")}</td>
        <td>${assistanceOrEstimatePercentage}%</td>
    </tr>
    `
}

function printRows(events, container) {
    let template = "";

    for (let event of events) {
        template += createRow(event)
    }

    container.innerHTML += template;
}