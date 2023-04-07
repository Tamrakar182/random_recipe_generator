const express = require('express');
const axios = require('axios')

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/recipe', async (req, res) => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      const recipe = response.data.meals[0];
  
      const name = recipe.strMeal;
      const instructions = recipe.strInstructions;
      const tutorial = recipe.strSource;
      const link = recipe.strMealThumb;
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe['strIngredient' + i];
        const measure = recipe['strMeasure' + i];
        if (ingredient && measure) {
          ingredients.push(`${ingredient} (${measure})`);
        }
      }

      const recipeObj = {
        name,
        instructions,
        ingredients,
        link,
        tutorial
      };
  
      res.json(recipeObj);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching recipe');
    }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
