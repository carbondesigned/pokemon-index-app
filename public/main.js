const deleteBtn = document.querySelectorAll(".del");

Array.from(deleteBtn).forEach((ele) => {
  ele.addEventListener("click", deletePokemon);
});

async function deletePokemon() {
  const pokemonName = this.parentNode.childNodes[1].innerText;
  const pokemonType = this.parentNode.childNodes[3].innerText;
  console.log(pokemonName, pokemonType);
  try {
    const response = await fetch("/deletePokemon", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: pokemonName,
        type: pokemonType,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}
