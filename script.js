document.addEventListener("DOMContentLoaded", () => {

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
  const bingoBtn = document.getElementById("bingoBtn");
  const playerNameInput = document.getElementById("playerName");

  let hasMarkedNumber = false;

  /* =========================
     PLAYER NAME (SAVE/RESTORE)
     ========================= */
  playerNameInput.value =
    localStorage.getItem("bingoPlayerName") || "";

  playerNameInput.addEventListener("input", () => {
    localStorage.setItem(
      "bingoPlayerName",
      playerNameInput.value
    );
  });

  /* =========================
     HELPER FUNCTIONS
     ========================= */

  function generateNumbers(min, max) {
    const numbers = [];
    while (numbers.length < 5) {
      const n =
        Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(n)) numbers.push(n);
    }
    return numbers;
  }

  function disableGenerateButton() {
    generateBtn.disabled = true;
    generateBtn.style.opacity = "0.5";
    generateBtn.style.cursor = "not-allowed";
  }

  function enableGenerateButton() {
    generateBtn.disabled = false;
    generateBtn.style.opacity = "1";
    generateBtn.style.cursor = "pointer";
  }

  /* =========================
     CONFETTI 🎉
     ========================= */

  function launchConfetti() {
    const container =
      document.getElementById("confetti-container");

    const colors = [
      "#ff5252",
      "#ffeb3b",
      "#4caf50",
      "#2196f3",
      "#e040fb"
    ];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";

      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration =
        2 + Math.random() * 2 + "s";

      container.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }
  }

  /* =========================
     GENERATE BINGO CARD
     ========================= */

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

  /* =========================
     EVENT LISTENERS
     ========================= */

  generateBtn.addEventListener("click", generateCard);

  bingoBtn.addEventListener("click", () => {
    launchConfetti();

    setTimeout(() => {
      if (confirm("Start a new Bingo card?")) {
        generateCard();
      }
    }, 300);
  });

  /* =========================
     INITIAL LOAD
     ========================= */

  generateCard();

});
