const generateBtn = document.querySelector('#generate-btn');
const recipeContainer = document.querySelector('#recipe-container');

generateBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('/recipe');
    const data = await response.json();

    const { name, instructions, ingredients, link, tutorial } = data;

    let ingredientsHtml = '';
    for (const ingredient of ingredients) {
      ingredientsHtml += `<li>${ingredient}</li>`;
    }

    const recipeHtml = `
    <div class="rep_head">
      <h2>${name}</h2>
    </div>
      <div class="tasty">
      <img src=${link} alt=${name}>
      </div>

      <h3>Ingredients:</h3>
      <ul>${ingredientsHtml}</ul>

      <h3>Preparation:</h3>
      <p>${instructions}</p>
      <a href="${tutorial}">Source</a>
    `;
    recipeContainer.innerHTML = recipeHtml;
    recipeContainer.style.display = 'block';
  } catch (error) {
    console.error(error);
    alert('Error generating recipe');
  }
});
