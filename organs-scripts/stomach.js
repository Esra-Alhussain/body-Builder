const usedRecipeIds = new Set();// keep track of the IDs that have already been displayed

//wrap the JavaScript code in an event listener for the 'DOMContentLoaded' event:
document.addEventListener('DOMContentLoaded', () => {

// const apiKey="7b69f97fbd564054bcf5536ac1af34bf"
let globalData; // Declare the variable outside the fetch block
// Define recipeContentsArray 
const recipeContentsArray = document.querySelectorAll(`.recipe-content`);

// make requests to the Spoonacular API's "Search Recipes by Ingredients" endpoint
// Construct API request URL
// const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${stomachIngredients}&apiKey=${apiKey}`;

const apiUrl= `https://65613af7dcd355c08323b50f.mockapi.io/RecipeGenerator`;
// `https://6557a470bd4bcef8b613033f.mockapi.io/RecipesGenerator`;
// Fetch recipes from the Spoonacular API
//Make an API request using the Fetch API
//the fetch operation is asynchrounous that means JavaScript doesn't wait for the request 
//to complete before moving on to the next line of code, The fetch function returns a Promise.
fetch(apiUrl)
//.then() method is used to handle the fulfillment of the Promise. It takes a callback function that will be executed when the Promise is resolved (when the API request is complete).
   .then(response => response.json()) //Parse the response as JSON
   .then(data => {
   // Store the fetched data in the 'data' variable
      globalData = data;
    // Process the response data using the displayRecipes function for further processing
    generateRecipes(globalData);
    
   })
   //Error handling => If any errors occur during the fetch, they are caught and logged to the console
   .catch(error => console.error('Error: ', error));

   const generateRecipeBtn = document.querySelector(".generateRecipesBtn");
   
   // Keep track of used recipe IDs for each card
   const usedRecipeIdsArray = Array.from({ length: recipeContentsArray.length }, () => new Set());

   // Add an event listener to the button
   //The arrow function is the callback function that gets executed when the button is clicked
   generateRecipeBtn.addEventListener('click', ()=> {
   // Use the existing data to generate recipes on button click
      generateRecipes(globalData, usedRecipeIdsArray);
      });  

   //generateRecipes function then updates the content based on the random recipe data.
   // This function is responsible for displaying or processing the recipes based on the provided data
   function generateRecipes(recipes, usedRecipeIdsArray) {
       // Sample data (replace this with the actual recipe data)
      console.log("Recipes: ", recipes);
      const recipesData = recipes.map(recipe => ({
         id: recipe.id,
         name: recipe.recipeTitle,
         content: recipe.recipeDescription, 
         image: recipe.image
      }));

      //   // Getting the HTML div references for the recipe-content
      //   const recipeContentsArray = document.querySelectorAll(`.recipe-content`);
        
           // Iterate through each recipe container
         recipeContentsArray.forEach((recipeContent, cardIndex) => {
            // Reset usedRecipeIds if all recipes have been displayed
            //so when the button is clicked again, it will generate recipes again from scratch.
            if (usedRecipeIdsArray[cardIndex].size === recipesData.length) {
            usedRecipeIdsArray[cardIndex].clear();
         }
         // Get a random recipe that hasn't been displayed on the current card
         let randomRecipeData;
         do {
             const randomIndex = Math.floor(Math.random() * recipesData.length);
             randomRecipeData = recipesData[randomIndex];
         } while (usedRecipeIdsArray[cardIndex].has(randomRecipeData.id));
 
         // Add the displayed recipe ID to the set for the current card
         usedRecipeIdsArray[cardIndex].add(randomRecipeData.id);
         

         //   // Convert the NodeList to an array for easier iteration
         //   Array.from(recipeContentsArray).forEach((recipeContent) => {
         //    // Generate a random index for each container
         //   const randomIndex = Math.floor(Math.random() * recipesData.length);
         //   const recipeData = recipesData[randomIndex];

        // Accessing the elements within the recipe container
        // Check if the NodeList has elements before accessing them
         if (recipeContentsArray.length > 0) {
           // Define recipeContent 
            const recipeImage = recipeContent.querySelector('.recipe-image');
            const recipeTitle = recipeContent.querySelector('.recipe-title');
            const recipeDescription = recipeContent.querySelector('.recipe-description');

            console.log("this is my recipe", recipeTitle, recipeDescription);
             console.log(recipeTitle);
        // Updating the content based on the fetched data
         // recipeImage.src =recipeData.image;
         // Update content only if elements are found
         if (recipeImage && recipeTitle && recipeDescription) {
            recipeImage.src = randomRecipeData.image;
            recipeTitle.textContent = randomRecipeData.name;
            recipeDescription.textContent = randomRecipeData.content;
         // }
      }
   }
   });
   }
  });
   


   /*
     //function displayRecipes(recipes){
      
      // Iterate through each recipe in the data
      recipes.forEach(recipe => {
         // Create a new div for each recipe
         //const recipeDiv = document.createElement('p');
         // Set the content of the p
         recipeDiv.innerHTML = `
         <h3>${recipe.title}</h3>
         <img src="${recipe.image}" alt="${recipe.title}">
       `;
      });
       // Append the div to the recipes container
       recipesContainer.appendChild(recipeDiv);
      recipeContent.array.forEach(element => {
         //add each recipe to one of the div tag
         recipes.title[index];
         content
      });
    
   }

*/
   // .then() part is crucial for managing the asynchronous nature of API requests and ensuring that we handle the data when it becomes available,
   //  rather than attempting to use it before it's ready.
   //to avoid executing the operation after the fetch function without data