const person1 = {
    name: 'Available',
    picks: ["TBD"],
    points: 0
};

const person2 = {
    name: 'Available',
    picks: ["TBD"],
    points: 0
};

const person3 = {
    name: 'Available',
    picks: ["TBD"],
    points: 0
};

const person4 = {
    name: 'Available',
    picks: ["TBD"],
    points: 0
};

const draft_pool = [];


document.addEventListener("DOMContentLoaded", function () {

    const pooldata = [person1, person2, person3, person4];

    updatePool(pooldata);

    getDraftPool();
    makePool(draft_pool);

    const form = document.querySelector('.pool-names');
    // console.log(pooldata);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        person1.name = document.querySelector('#person1').value;
        person2.name = document.querySelector('#person2').value;
        person3.name = document.querySelector('#person3').value;
        person4.name = document.querySelector('#person4').value;
        updatePool(pooldata);
    })

})

function updatePool(data) {
    const draft_body = document.querySelector('#draft-table tbody');
    draft_body.innerHTML = ""; // Clear any existing rows
    data.forEach((person) => {
        const row = draft_body.insertRow();
        const cell1 = row.insertCell();
        const cell2 = row.insertCell();
        cell1.textContent = person.name;
        cell2.textContent = person.picks;
    })
}

function getDraftPool() {
    const url1 = "https://compete-strongest-com.global.ssl.fastly.net/api/p/divisions/BFRAAW/leaderboard/?p=1&d=asc";
    const url2 = "https://compete-strongest-com.global.ssl.fastly.net/api/p/divisions/WGPVFH/leaderboard/?p=1&d=asc";

    fetch(url1)
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Convert the response data to JSON
        })
        .then(raw_leaderboard => {

            const bodyRows = raw_leaderboard.data.body_rows;

            for (let i = 0; i < bodyRows.length; i++) {
                const competitor = bodyRows[i][0];
                // console.log(competitor);
                const add_data = String(competitor.competitor_name);
                console.log(add_data);
                draft_pool.push(add_data);
            }
            // console.log(draft_pool);
        })
    fetch(url2)
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Convert the response data to JSON
        })
        .then(raw_leaderboard => {

            const bodyRows = raw_leaderboard.data.body_rows;

            for (let i = 0; i < bodyRows.length; i++) {
                const competitor = bodyRows[i][0];
                const add_data = competitor.competitor_name;
                draft_pool.push(add_data);
            }
            // console.log(draft_pool);
        })
}

function makePool(data) {
    const draft_pool_body = document.querySelector('#draft-pool tbody');
    draft_pool_body.innerHTML = ""; // Clear any existing rows
    console.log(data);

}
