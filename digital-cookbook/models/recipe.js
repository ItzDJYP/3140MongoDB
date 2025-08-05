// models/recipe.js

const mongoose = require('mongoose');

// Define the Recipe Schema
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String, // Optional by default
  },
  ingredients: {
    type: [String], // Array of strings
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  prepTimeInMinutes: {
    type: Number,
    required: true,
    min: [1, 'Preparation time must be at least 1 minute'], // Validation: must be positive
  },
  createdAt: {
    type: Date,
    default: Date.now, // Defaults to current time
  },
});

// Create the Recipe model from the schema
const Recipe = mongoose.model('Recipe', recipeSchema);

// Export the model
module.exports = Recipe;
