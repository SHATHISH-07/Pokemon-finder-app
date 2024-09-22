document.getElementById("search-button").addEventListener("click", function () {
  const searchInput = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        alert("Pokémon not found");
        throw new Error("Pokémon not found");
      }
      return response.json();
    })
    .then((data) => {
      updatePokemonInfo(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function updatePokemonInfo(data) {
  // Update name and ID
  document.getElementById("pokemon-name").innerText = data.name.toUpperCase();
  document.getElementById("pokemon-id").innerText = `#${data.id}`;

  // Update weight and height
  document.getElementById("weight").innerText = `Weight: ${data.weight}`;
  document.getElementById("height").innerText = `Height: ${data.height}`;

  // Update types
  const typesElement = document.getElementById("types");
  typesElement.innerHTML = ""; // Clear previous types
  data.types.forEach((typeInfo) => {
    const typeDiv = document.createElement("div");
    typeDiv.innerText = typeInfo.type.name.toUpperCase();
    typesElement.appendChild(typeDiv);
  });

  // Update image
  const imgContainer = document.getElementById("img-container");
  imgContainer.innerHTML = ""; // Clear previous image
  const imgElement = document.createElement("img");
  imgElement.id = "sprite";
  imgElement.src = data.sprites.front_default;
  imgElement.alt = data.name;
  imgContainer.appendChild(imgElement);

  // Update base stats
  document.getElementById("hp").innerText = data.stats[0].base_stat;
  document.getElementById("attack").innerText = data.stats[1].base_stat;
  document.getElementById("defense").innerText = data.stats[2].base_stat;
  document.getElementById("special-attack").innerText = data.stats[3].base_stat;
  document.getElementById("special-defense").innerText =
    data.stats[4].base_stat;
  document.getElementById("speed").innerText = data.stats[5].base_stat;
}
