//Keep track of used recipes globally that have been displayed across all cards. Before adding a recipe to a specific card's set
// If it is, choose another random recipe until an unused one is found.
let usedRecipeIds;

//wrap the JavaScript code in an event listener for the 'DOMContentLoaded' event:
document.addEventListener('DOMContentLoaded', () => {

// Declare a variable to store the fetched data globally
let globalData; // Declare the variable outside the fetch block
// Define recipeContentsArray 
const recipeContentsArray = document.querySelectorAll(`.recipe-content`);
// Initialize usedRecipeIdsArray outside the event listener to make it accessible globally
let usedRecipeIdsArray = Array.from({ length: recipeContentsArray.length }, () => new Set());

 // Initialize the global set to keep track of all used recipe IDs
 usedRecipeIds = new Set();

 // Retrieve organ parameter from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const organ = urlParams.get('organ');
console.log(`this is organ param`, organ)

 // Update background picture based on the organ
 const organImg = document.getElementById('organImg');
 organImg.src = `img/${organ}-bg.png`;

 
// make requests to the Spoonacular API's "Search Recipes by Ingredients" endpoint
// Construct API request URL

const apiUrl= `https://65613af7dcd355c08323b50f.mockapi.io/RecipeGenerator?organ=${organ}`;

// Fetch recipes from the Spoonacular API
//Make an API request using the Fetch API
//the fetch operation is asynchrounous that means JavaScript doesn't wait for the request 
//to complete before moving on to the next line of code, The fetch function returns a Promise.
fetch(apiUrl)
//.then() method is used to handle the fulfillment of the Promise. It takes a callback function that will be executed when the Promise is resolved (when the API request is complete).
   .then(response => response.json()) //Parse the response as JSON
   .then(data => {
    //   const filteredData = data.filter(item => item.organ === organ);
   // Store the fetched data in the 'data' variable
      globalData = data;
      console.log(`this is the urlParams`, organ);

      console.log(`this is the global data`, globalData);

    // Process the response data using the displayRecipes function for further processing
       generateRecipes(globalData, usedRecipeIdsArray); // Call generateRecipes here
    
   })
   //Error handling => If any errors occur during the fetch, they are caught and logged to the console
   .catch(error => console.error('Error: ', error));

   
   function postFeedback (feedbackData){
      const apiUrl = `https://65613af7dcd355c08323b50f.mockapi.io/feedback`;

      // Make a POST request to the API to add feedback
      fetch(apiUrl, { 
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(feedbackData),
      })
         .then(response => {
            console.log('API Response:', response);
            return response.json()})
         .then(data => {
            console.log('Feedback posted successfully:', data);
         })
         .catch(error => { // Handle errors
            console.log('Error posting feedback:', error);
         });
   }
   console.log(`this is the global data`, globalData);

     
       document.getElementById('submit-button').addEventListener('click', submitFeedback);
          
       //Function to handle form submission and show thank you message
       // retrieve the values entered by the user in the form fields 
       // get a reference to an HTML 
       function submitFeedback(){
          //Get feedback values form
          const recipeName = document.getElementById('recipeName').value;
          const personName = document.getElementById('personName').value;
          const email = document.getElementById('email').value;
          const message = document.getElementById('message').value;

          const form = document.getElementById('feedbackForm');
          if (!form.checkValidity()){
            // If form is not valid, prevent submission.
            //check form validation(all required fields are filled)
            form.reportValidity();
            return;
          }

          // Function to validate email format using a regular expression
         function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
         }
          // Additional email validation
         if (!isValidEmail(email)) {
            // Display an error message for invalid email format
            document.getElementById('emailError').textContent = 'Invalid email format';
            return;
      }

          // Prepare feedback data by creating a feedback object that holds the feedback information properties
          const feedbackData = {
            recipeName: recipeName,
            personName: personName,
            email: email,
            message: message
         };
         // Post feedback to the mock API
          postFeedback(feedbackData);

          // Show thank you message and hide the form
         const feedbackForm = document.getElementById('feedbackForm');
         feedbackForm.innerHTML = '<p>Thank you for your feedback!</p>';
       }

       // Function to set default recipes for the first three cards
   // const setDefaultRecipes = async () => {
   //    try {
   //       const response = await fetch(apiUrl);
   //       const data = await response.json();

   //       // Sample data (replace this with the actual recipe data)
   //       const defaultRecipes = data.slice(0, 3).map(recipe => ({
   //          id: recipe.id,
   //          name: recipe.recipeTitle,
   //          recipeIngredients: recipe.recipeIngredients.join(', '),
   //          content: recipe.recipeDescription,
   //          image: recipe.image,
   //          likes: 0, // Initialize likes to 0
   //       }));

   //       // Update the content of the first three recipe cards
   //       defaultRecipes.forEach((recipeData, index) => {
   //          const recipeContent = recipeContentsArray[index];
   //          const recipeImage = recipeContent.querySelector('.recipe-image');
   //          const recipeTitle = recipeContent.querySelector('.recipe-title');
   //          const recipeIngredients = recipeContent.querySelector('.recipeIngredients');
   //          const recipeDescription = recipeContent.querySelector('.recipe-description');

   //          // Update content only if elements are found
   //          if (recipeImage && recipeTitle && recipeIngredients) {
   //             recipeImage.src = recipeData.image;
   //             recipeTitle.textContent = recipeData.name;
   //             recipeIngredients.textContent = recipeData.recipeIngredients;
   //             recipeDescription.textContent = recipeData.content;

   //             // Set the initial likes to 0
   //             likeCounter.textContent = recipeData.likes;

   //             // Add event listener to the like button
   //             likeButton.addEventListener('click', async () => {
   //                // Increment likes if the recipe hasn't been liked before
   //                recipeData.likes++;
   //                likeCounter.textContent = recipeData.likes;

   //                // Update likes in the mock API
   //                await updateLikes(recipeData.id, recipeData.likes);
   //             });
   //          }
   //       });
   //    } catch (error) {
   //       console.error('Error setting default recipes:', error);
   //    }
   // };


         const generateRecipeBtn = document.querySelector(".generateRecipesBtn");
         const stomachButton = document.getElementById('stomachButton'); 
         const bladderButton = document.getElementById('bladderButton'); // Change this based on your actual button ID
         const lungshButton = document.getElementById('lungshButton'); // Change this based on your actual button ID
         const kidneysButton = document.getElementById('kidneysButton'); // Change this based on your actual button ID
         const liverButton = document.getElementById('liverButton'); // Change this based on your actual button ID
         const pancreasButton = document.getElementById('pancreasButton'); // Change this based on your actual button ID

         // Add an event listener to the button
         //The arrow function is the callback function that gets executed when the button is clicked
         generateRecipeBtn.addEventListener('click', ()=> {
         // Keep track of used recipe IDs for each card
         // usedRecipeIdsArray = Array.from({ length: recipeContentsArray.length }, () => new Set());

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
               recipeIngredients: recipe.recipeIngredients.join(', '),
               content: recipe.recipeDescription, 
               image: recipe.image
         }));

           // Getting the HTML div references for the recipe-content
           //const recipeContentsArray = document.querySelectorAll(`.recipe-content`);
        
           // Iterate using the loop through each recipe container
            // Reset usedRecipeIds if all recipes have been displayed
            //recipeContent >> represent ( single recipe container).
            //cardIndex  >> is the index of the current card in the array.
         recipeContentsArray.forEach((recipeContent, cardIndex) => {
            //so when the button is clicked again, it will generate recipes again from scratch.
            console.log('recipesData:', recipesData);
            console.log('usedRecipeIdsArray:', usedRecipeIdsArray);

            if (usedRecipeIdsArray[cardIndex].size === recipesData.length) {
             // Clear the sets for all cards when all recipes have been displayed on any card
            usedRecipeIdsArray.forEach(set => set.clear());
         }
         // Get a random recipe that hasn't been displayed on the current card
         let randomRecipeData;
         do {
             const randomIndex = Math.floor(Math.random() * recipesData.length);
             randomRecipeData = recipesData[randomIndex];
         } while (usedRecipeIdsArray[cardIndex].has(randomRecipeData.id));
 
         // Add the displayed recipe ID to the set for the current card
         usedRecipeIdsArray[cardIndex].add(randomRecipeData.id);
         
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
            const recipe_Ingredients = recipeContent.querySelector('.recipe-Ingredients');
            const recipeDescription = recipeContent.querySelector('.recipe-description');

            console.log("this is my recipe", recipeTitle, recipeDescription);
             console.log(recipe_Ingredients);
             
        // Updating the content based on the fetched data
         // recipeImage.src =recipeData.image;
         // Update content only if elements are found
         if (recipeImage && recipeTitle &&recipe_Ingredients) {
            recipeImage.src = randomRecipeData.image;
            recipeTitle.textContent = randomRecipeData.name;
            recipeDescription.textContent = randomRecipeData.content;
            recipe_Ingredients.textContent = randomRecipeData.recipeIngredients;
            // if (recipeImage && recipeTitle && recipeDescription &&recipe_Ingredients) {

         // }
      }
   }
   });
   }
   // Call the function to set default recipes
//    setDefaultRecipes();
  });
   
   // .then() part is crucial for managing the asynchronous nature of API requests and ensuring that we handle the data when it becomes available,
   //  rather than attempting to use it before it's ready.
   //to avoid executing the operation after the fetch function without data