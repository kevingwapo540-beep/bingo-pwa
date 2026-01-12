function generateBingoCard() {
    const columns = {
        B: range(1, 15),
        I: range(16, 30),
        N: range(31, 45),
        G: range(46, 60),
        O: range(61, 75)
    };

    const card = {};

    for (let col in columns) {
        card[col] = getRandomNumbers(columns[col], 5);
    }

    card["N"][2] = "FREE"; // middle cell

    renderCard(card);
}

function range(start, end) {
    const arr = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
}

function getRandomNumbers(array, n) {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

function renderCard(card) {
    let html = "<table><tr>";
    for (let col of "BINGO") html += `<th>${col}</th>`;
    html += "</tr>";

    for (let i = 0; i < 5; i++) {
        html += "<tr>";
        for (let col of "BINGO") {
            let value = card[col][i];
            if (value === "FREE") {
                html += `<td class="free marked">${value}</td>`;
            } else {
                html += `<td onclick="markCell(this)">${value}</td>`;
            }
        }
        html += "</tr>";
    }

    html += "</table>";
    document.getElementById("bingo-card").innerHTML = html;
}

function markCell(cell) {
    cell.classList.toggle("marked");
}

// Register service worker for offline support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(err => console.log('Service Worker Failed:', err));
}

// Generate initial card
generateBingoCard();
