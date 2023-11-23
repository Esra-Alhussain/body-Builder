//wrap the JavaScript code in an event listener for the 'DOMContentLoaded' event:
document.addEventListener('DOMContentLoaded', () => {

// const apiKey="7b69f97fbd564054bcf5536ac1af34bf"
const organ = 'stomach';
//Replace 'tomato,garlic,onion' with the ingredients that match the organs
const stomachIngredients = 'tomato,garlic,onion';
let globalData; // Declare the variable outside the fetch block

// make requests to the Spoonacular API's "Search Recipes by Ingredients" endpoint
// Construct API request URL
// const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${stomachIngredients}&apiKey=${apiKey}`;

const apiUrl= `https://6557a470bd4bcef8b613033f.mockapi.io/RecipesGenerator`;
// Fetch recipes from the Spoonacular API
//Make an API request using the Fetch API
//the fetch operation is asynchrounous that means JavaScript doesn't wait for the request 
//to complete before moving on to the next line of code, The fetch function returns a Promise.
fetch(apiUrl)
//.then() method is used to handle the fulfillment of the Promise. It takes a callback function that will be executed when the Promise is resolved (when the API request is complete).
   .then(response => response.json()) //Parse the response as JSON
   .then(data => {
   // Store the fetched data in the 'data' variable
      globalData =data;
    // Process the response data using the displayRecipes function for further processing
    generateRecipes(globalData);
    
   })
   //Error handling => If any errors occur during the fetch, they are caught and logged to the console
   .catch(error => console.error('Error: ', error));

   const generateRecipesBtn = document.querySelector(".generateRecipesBtn");
   // Add an event listener to the button
   generateRecipesBtn.addEventListener('click', ()=> {
   // Use the existing data to generate recipes on button click
       generateRecipes(globalData);
   });  


   // Function to generate recipes
   function generateRecipes(recipes){
       // Sample data (replace this with the actual recipe data)
      console.log("Recipes: ", recipes);
      const recipesData = recipes.map(recipe => ({
         name: recipe.recipeTittle,
         content: recipe.recipeDescription, 
         // Generate a new Unsplash URL for each recipe
         image: `https://source.unsplash.com/800x600/?food&${Math.random()}` // Adding a random parameter to get a different image each time
      }));

      //https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
   
        // Getting the HTML div references for the recipe-content
         const recipeContentsArray = document.querySelectorAll(".recipe-content");

        // Clear previous content in the container
         // recipeContentsArray.forEach(recipeContent => {
         //    recipeContent.innerHTML = '';
         // });

        // Convert the NodeList to an array for easier iteration
        Array.from(recipeContentsArray).forEach((recipeContent, index) => {
            const recipeData = recipesData[index];
            console.log('recipeData:', recipeData);

        // Accessing the elements within the recipe container
        const recipeImage = recipeContent.querySelector('.recipe-image');
        const recipeTitle = recipeContent.querySelector('.recipe-title');
        const recipeDescription = recipeContent.querySelector('.recipe-description');
       
        console.log("recipeContent:", recipeContent);
        console.log("this is type of the recipeData:"+typeof recipesData);
        // Logging to check if elements are found
         console.log("recipeImage:", recipeImage);
         console.log("recipeTitle:", recipeTitle);
         console.log("recipeDescription:", recipeDescription);

        // Updating the content based on the fetched data
         // recipeImage.src =recipeData.image;
         // Update content only if elements are found
         if (recipeImage && recipeTitle && recipeDescription) {
            recipeImage.src = recipeData.image;
            recipeTitle.textContent = recipeData.name;
            recipeDescription.textContent = recipeData.content;
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