"use strict";

const men = [];
const women = [];
//JavaScript to populate leaderboard
document.addEventListener("DOMContentLoaded", function () {

    const url = "https://compete-strongest-com.global.ssl.fastly.net/api/p/divisions/BFRAAW/leaderboard/?p=1&d=asc";
    const url2 = "https://compete-strongest-com.global.ssl.fastly.net/api/p/divisions/WGPVFH/leaderboard/?p=1&d=asc";
    
    populateLeaderboardTable(url, men, "leaderboard-men");
    populateLeaderboardTable(url2, women, "leaderboard-women");
    
    // Debug
    // fetch(url2)
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    
});
function populateLeaderboardTable(url, ldrdata, leaderboardId) {
    fetch(url)
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Convert the response data to JSON
        })
        .then(raw_leaderboard => {
            
            const bodyRows = raw_leaderboard.data.body_rows;
            // Debug
            // console.log(bodyRows);

            for (let i = 0; i < bodyRows.length; i++) {
                const competitor = bodyRows[i][0];
                const add_data = {
                    rank: competitor.ordinalRank,
                    name: competitor.competitor_name,
                    score: competitor.cum_workout_rank
                };
                ldrdata.push(add_data);
            }

            // Update the leaderboard once the data is populated
            updateLeaderboard(ldrdata,leaderboardId);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    // Function to update the leaderboard table
    function updateLeaderboard(data, leaderboardId) {
        // Get the table body element
        const leaderboardBody = document.getElementById(leaderboardId).getElementsByTagName('tbody')[0];
        leaderboardBody.innerHTML = ""; // Clear any existing rows

        // Populate the leaderboard table
        data.forEach((competitor) => {
            const row = leaderboardBody.insertRow();
            const cellRank = row.insertCell(0);
            const cellName = row.insertCell(1);
            const cellScore = row.insertCell(2);

            cellRank.textContent = competitor.rank;
            cellName.textContent = competitor.name;
            cellScore.textContent = competitor.score;
        });
    }
}

