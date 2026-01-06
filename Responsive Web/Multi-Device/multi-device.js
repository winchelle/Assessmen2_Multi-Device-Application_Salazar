
//Get all the images with class slide
let slides = document.querySelectorAll(".slide");
let index = 0;

// Show the first slide at the start
slides[index].style.display = "block";

// Function to show a specific slide
function showSlide(i) {
  slides.forEach(slide => slide.style.display = "none");
  slides[i].style.display = "block";
}

// Function to go to the next slide
function nextSlide() {
  index++; 
  if (index >= slides.length) { // Go back to the first slide
    index = 0;
  }
  showSlide(index);
}

// Function to go to the previous slide
function prevSlide() {
  index--;
  if (index < 0) { // Go to the previous slide
    index = slides.length - 1;
  }
  showSlide(index);
}


// Select the container in HTML
const recipeBox = document.querySelector(".recipe-box");

// Function to display a single recipe
const dessertRecipies = (recipe) => { 
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        const ing = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ing && ing.trim() !== "") {
            ingredients += `<li>${ing} - ${measure}</li>`; // Add ingredient and measure to the list
        }
    }
// Split instructions into steps
    const steps = recipe.strInstructions
        .split(/\r?\n/) 
        .filter(step => step.trim() !== "") 
        .map(step => `<li>${step}</li>`) 
        .join("");

    const htmlStr = `
    <div class="recipe">
        <div class="name">${recipe.strMeal}</div>
        <div class="image">
            <img src="${recipe.strMealThumb}" class="picture" alt="${recipe.strMeal}">
        </div>
        <div class="description">
            <h3>Ingredients</h3>
            <ul>${ingredients}</ul>
            <h3>Steps</h3>
            <ul>${steps}</ul>
        </div>
    </div>`;

    recipeBox.insertAdjacentHTML("beforeend", htmlStr); // Add the recipe HTML to the container
}

// get the dessert data from the server.js
const loadDessert = () => {
    fetch("/api/desserts") 
        .then(res => res.json()) 
        .then(data => {
            data.meals.slice(0, 9).forEach(meal => {
                // You may need another fetch to get full meal details
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                    .then(res => res.json())
                    .then(fullData => dessertRecipies(fullData.meals[0]));
            });
        })
        .catch(error => console.error("Error fetching desserts:", error));
}

// Run the loadDessert when the DOM is already loaded
document.addEventListener("DOMContentLoaded", () => {
    loadDessert();
});
