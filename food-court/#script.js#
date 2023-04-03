const form = document.querySelector('form');
const recipeContainer = document.querySelector('#recipe');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkedIngredients = [];

    checkboxes.forEach(function(checkbox) {
	if (checkbox.checked) {
	    checkedIngredients.push(checkbox.value);
	}
    });

    if (checkedIngredients.length === 0) {
	recipeContainer.innerHTML = 'Please select at least one ingredient.';
    } else {
	const recipe = generateRecipe(checkedIngredients);
	recipeContainer.innerHTML = recipe;
    }
});

function generateRecipe(ingredients) {
    const proteins = ['chicken', 'beef', 'pork'];
    const veggies = ['carrots', 'peppers', 'broccoli'];
    const pastas = ['penne', 'spaghetti', 'blah'];

    const protein = getRandomItemFromArray(proteins.filter(function(p))
					  }
