const highestAssistanceContainer = document.getElementById("highest-assistance");
const lowestAssistanceContainer = document.getElementById("lowest-assistance");
const largestCapacityContainer = document.getElementById("largest-capacity");
const upcomingRows = document.getElementById("upcoming-rows");
const pastRows = document.getElementById("past-rows");

let allEvents;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(res => res.json())
    .then(data => {
        let allEvents = data.events;
        let currentDate = data.currentDate;

        let filteredPastEvents = allEvents.filter(event => event.date < currentDate);
        let filteredUpcomingEvents = allEvents.filter(event => event.date > currentDate);

        sortEvents(filteredPastEvents);
        sortEvents(filteredUpcomingEvents);

        printAssistance(filteredPastEvents)
        printLargestCapacity(allEvents)
        printRows(filteredUpcomingEvents, upcomingRows)
        printRows(filteredPastEvents, pastRows)
    })
    .catch(error => console.error(error))

function sortEvents(events) {
    events.sort((a, b) => a.category.localeCompare(b.category));
}

// Table 1
function printAssistance(events) {
    let lowestPercentage = 100;
    let highestPercentage = 0;
    let highestEvent, lowestEvent;

    for (let event of events) {
        let percentage = event.assistance
            ? (event.assistance / event.capacity) * 100
            : (event.estimate / event.capacity) * 100;

        if (percentage > highestPercentage) {
            highestPercentage = percentage;
            highestEvent = event.name;
        }
        if (percentage < lowestPercentage) {
            lowestPercentage = percentage;
            lowestEvent = event.name;
        }
    }

    highestAssistanceContainer.textContent = `${highestEvent} - ${highestPercentage.toFixed(2)}%`;
    lowestAssistanceContainer.textContent = `${lowestEvent} - ${lowestPercentage.toFixed(2)}%`;
}

function printLargestCapacity(events) {
    let orderByCapacity = events.sort((a, b) => b.capacity - a.capacity)
    let largestEvent = orderByCapacity[0].name;
    let largestCapacity = orderByCapacity[0].capacity;

    largestCapacityContainer.textContent = `${largestEvent} - ${largestCapacity.toLocaleString("en-EN")} people`;
}

// Table 2 & 3
function createRow(stats) {
    let percentage = ((stats.assistance / stats.capacity) * 100).toFixed(2);

    return `
    <tr>
        <td>${stats.category}</td>
        <td>$${(stats.price * stats.assistance).toLocaleString("en-EN")}</td>
        <td>${percentage}%</td>
    </tr>
    `
}

function printRows(events, container) {
    const unifiedEvents = unifyCategoryEvents(events);

    let template = "";

    for (let category of unifiedEvents) {
        template += createRow(category);
    }

    container.innerHTML += template;
}

function unifyCategoryEvents(events) {
    const unifiedEvents = events.reduce((result, event) => {
        const existingEvent = result.find(item => item.category === event.category);

        if (existingEvent) {
            existingEvent.price += event.price;
            existingEvent.assistance += event.assistance || event.estimate;
            existingEvent.capacity += event.capacity;
        } else {
            result.push({
                category: event.category,
                price: event.price,
                assistance: event.assistance || event.estimate,
                capacity: event.capacity
            });
        }

        return result;
    }, []);

    return unifiedEvents;
}