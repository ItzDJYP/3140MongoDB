
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Recipe = require('./models/recipe');

// Connect to the database
connectDB();

// --- CREATE ---
async function createRecipe() {
  const recipe = new Recipe({
    title: "Classic Tomato Soup",
    description: "A simple and delicious homemade tomato soup.",
    ingredients: ["Tomatoes", "Onion", "Garlic", "Vegetable Broth", "Olive Oil"],
    instructions: "1. Sauté onions and garlic. 2. Add tomatoes and broth. 3. Simmer and blend.",
    prepTimeInMinutes: 30
  });

  try {
    const savedRecipe = await recipe.save();
    console.log("✅ Recipe created:", savedRecipe);
  } catch (error) {
    console.error("❌ Error creating recipe:", error.message);
  }
}

// --- READ ALL ---
async function findAllRecipes() {
  try {
    const recipes = await Recipe.find();
    console.log("📋 All Recipes:");
    console.log(recipes);
  } catch (error) {
    console.error("❌ Error retrieving recipes:", error.message);
  }
}

// --- READ ONE ---
async function findRecipeByTitle(title) {
  try {
    const recipe = await Recipe.findOne({ title });
    if (recipe) {
      console.log("🔍 Found Recipe:", recipe);
    } else {
      console.log(`⚠️ No recipe found with title: ${title}`);
    }
  } catch (error) {
    console.error("❌ Error finding recipe:", error.message);
  }
}

// --- UPDATE ---
async function updateRecipeDescription(title, newDescription) {
  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title },
      { description: newDescription },
      { new: true } // Return the updated document
    );

    if (updatedRecipe) {
      console.log("✏️ Updated Recipe:", updatedRecipe);
    } else {
      console.log(`⚠️ No recipe found to update with title: ${title}`);
    }
  } catch (error) {
    console.error("❌ Error updating recipe:", error.message);
  }
}

// --- DELETE ---
async function deleteRecipe(title) {
  try {
    const result = await Recipe.findOneAndDelete({ title });
    if (result) {
      console.log(`🗑️ Recipe "${title}" deleted successfully.`);
    } else {
      console.log(`⚠️ No recipe found to delete with title: ${title}`);
    }
  } catch (error) {
    console.error("❌ Error deleting recipe:", error.message);
  }
}

// --- Run all functions in sequence ---
async function runCRUD() {
  await createRecipe(); // Step 1: Create
  await findAllRecipes(); // Step 2: Read All
  await findRecipeByTitle("Classic Tomato Soup"); // Step 3: Read One
  await updateRecipeDescription("Classic Tomato Soup", "This is the UPDATED description for tomato soup."); // Step 4: Update
  await findRecipeByTitle("Classic Tomato Soup"); // Step 5: Read One again to check update
  await deleteRecipe("Classic Tomato Soup"); // Step 6: Delete
  await findAllRecipes(); // Step 7: Read All again to confirm deletion
}

runCRUD().then(() => {
  mongoose.connection.close(); // Close the DB connection when done
});
