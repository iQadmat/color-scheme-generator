const body = document.querySelector("body");
const section = document.querySelector("section");
const colorRectangles = document.querySelectorAll(".colors");
const hexCodes = document.querySelectorAll(".hexs");
const seedColor = document.querySelector("#seed-color");
const selectInput = document.querySelector("select");
const options = document.querySelectorAll("option");
const themeBtn = document.querySelector(".theme");
const submitBtn = document.querySelector(".submit");

// Generate color palette
submitBtn.addEventListener("click", generatePalette);

// Copy hex code to clipboard
hexCodes.forEach((hex) => {
  hex.addEventListener("click", copyToClipboard);
});

// Light mode and dark mode functionality
themeBtn.addEventListener("click", () => {
  themeBtn.classList.contains("light-mode") ? darkMode() : lightMode();
});

function generatePalette() {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColor.value.slice(1)}&mode=${
      selectInput.value
    }&count=5`
  ).then((res) =>
    res.json().then((data) => {
      const colors = data.colors.map((color) => color.hex.value);
      const hexValues = data.colors.map((color) => color.hex.clean);
      colorRectangles.forEach((div, index) => {
        div.style.backgroundColor = colors[index];
      });
      hexCodes.forEach((hex, index) => {
        hex.textContent = `#${hexValues[index]}`;
      });
    })
  );
}

function copyToClipboard(e) {
  const hex = e.target.textContent;
  // hex.select();
  // hex.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(hex);
  alert("Copied to clipboard!");
}

function lightMode() {
  // Remove dark mode and add light mode class
  themeBtn.classList.remove("dark-mode");
  themeBtn.classList.add("light-mode");
  themeBtn.innerHTML = `<i class="bx bx-moon"></i>`;

  // Arrow and border customization
  selectInput.style.background = `url("images/arrow-dark.svg") no-repeat right 0.25em center`;
  submitBtn.style.border = "1px solid var(--border-color)";

  // Background color
  section.style.backgroundColor = "var(--light-bg)";
  seedColor.style.backgroundColor = "var(--light-bg)";
  selectInput.style.backgroundColor = "var(--light-bg)";
  options.forEach((option) => {
    option.style.backgroundColor = "var(--light-bg)";
    option.style.color = "var(--dark-text)";
  });
  submitBtn.style.backgroundColor = "var(--light-bg)";

  // Text color
  body.style.color = "var(--dark-text)";
  selectInput.style.color = "var(--dark-text)";
  submitBtn.style.color = "var(--dark-text)";
}

function darkMode() {
  // Remove light mode and add dark mode class
  themeBtn.classList.remove("light-mode");
  themeBtn.classList.add("dark-mode");
  themeBtn.innerHTML = `<i class='bx bx-sun'></i>`;

  // Background and border
  selectInput.style.background = `url("images/arrow-light.png") no-repeat right 0.25em center`;
  submitBtn.style.border = "none";

  // Background color
  section.style.backgroundColor = "var(--dark-bg)";
  seedColor.style.backgroundColor = "var(--dark-bg)";
  selectInput.style.backgroundColor = "var(--dark-bg)";
  options.forEach((option) => {
    option.style.backgroundColor = "var(--dark-bg)";
    option.style.color = "var(--light-text)";
  });
  submitBtn.style.backgroundColor = "var(--dark-submit)";

  // Text color
  body.style.color = "var(--light-text)";
  selectInput.style.color = "var(--light-text)";
  submitBtn.style.color = "var(--light-text)";
}
