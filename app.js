const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

const trending = document.getElementById("trending");
const discounts = document.getElementById("discounts");
const freeStuff = document.getElementById("freeStuff");

let businesses = [];

fetch("businesses.json")
  .then(response => response.json())
  .then(data => {
    businesses = data;

    displayBusinesses(businesses, results);
    displayBusinesses(businesses.filter(place => place.section === "trending"), trending);
    displayBusinesses(businesses.filter(place => place.section === "discounts"), discounts);
    displayBusinesses(businesses.filter(place => place.section === "free"), freeStuff);
  });

function displayBusinesses(list, container) {
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No listings yet.</p>";
    return;
  }

  list.forEach(place => {
    container.innerHTML += `
      <div class="card">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <p><strong>Hours:</strong> ${place.hours}</p>
        <p><strong>Address:</strong> ${place.address}</p>
      </div>
    `;
  });
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();

  const filtered = businesses.filter(place =>
    place.name.toLowerCase().includes(keyword) ||
    place.category.toLowerCase().includes(keyword) ||
    place.description.toLowerCase().includes(keyword)
  );

  displayBusinesses(filtered, results);
});

function filterCategory(category) {
  const filtered = businesses.filter(place =>
    place.category.includes(category)
  );

  displayBusinesses(filtered, results);
}