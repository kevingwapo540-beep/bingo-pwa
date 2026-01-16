// Bingo number ranges per column
const bingoRanges = [
  [1, 15],   // B
  [16, 30],  // I
  [31, 45],  // N
  [46, 60],  // G
  [61, 75]   // O
];

// DOM elements
const bingoCard = document.getElementById("bingoCard");
const generateBtn = document.getElementById("generateBtn");
const playerNameInput = document.getElementById("playerName");

let hasMarkedNumber = false;

// Restore saved player name
playerNameInput.value = localStorage.getItem("bingoPlayerName") || "";

// Save player name
playerNameInput.addEventListener("input", () => {
  localStorage.setItem("bingoPlayerName", playerNameInput.value);
});

// Generate unique numbers per column
function generateNumbers(min, max) {
  const numbers = [];
  while (numbers.length < 5) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numbers.includes(n)) numbers.push(n);
  }
  return numbers;
}

// Disable Generate button once a number is marked
function disableGenerateButton() {
  generateBtn.disabled = true;
  generateBtn.style.opacity = "0.5";
  generateBtn.style.cursor = "not-allowed";
}

// Enable Generate button (new card)
function enableGenerateButton() {
  generateBtn.disabled = false;
  generateBtn.style.opacity = "1";
  generateBtn.style.cursor = "pointer";
}

// Generate Bingo card
function generateCard() {
  bingoCard.innerHTML = "";
  hasMarkedNumber = false;
  enableGenerateButton();

  const columns = bingoRanges.map(range =>
    generateNumbers(range[0], range[1])
  );

  for (let row = 0; row < 5; row++) {
    const tr = document.createElement("tr");

    for (let col = 0; col < 5; col++) {
      const td = document.createElement("td");

      // FREE space
      if (row === 2 && col === 2) {
        td.textContent = "FREE";
        td.classList.add("marked");
      } else {
        td.textContent = columns[col][row];

        td.addEventListener("click", () => {
          if (!td.classList.contains("marked")) {
            td.classList.add("marked");
            hasMarkedNumber = true;
            disableGenerateButton();
          }
        });
      }

      tr.appendChild(td);
    }

    bingoCard.appendChild(tr);
  }
}

// Button click
generateBtn.addEventListener("click", generateCard);

// Generate card on page load
generateCard();
