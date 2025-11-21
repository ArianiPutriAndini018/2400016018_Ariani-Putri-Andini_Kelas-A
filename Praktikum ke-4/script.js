const factElement = document.getElementById("fact");
const button = document.getElementById("generateBtn");

async function getRandomFact() {
  factElement.textContent = "Loading...";

  try {
    const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
    const data = await res.json();
    factElement.textContent = data.text;
  } catch (error) {
    factElement.textContent = "Error loading fact😢";
  }
}

button.addEventListener("click", getRandomFact);

getRandomFact();