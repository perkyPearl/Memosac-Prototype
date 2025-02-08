const express = require("express");
const { 
    createRecipe, 
    getAllRecipes, 
    getRecipeById, 
    updateRecipe, 
    deleteRecipe, 
    rateRecipe 
} = require("../controllers/RecipeController");

const router = express.Router();

router.get("/", getAllRecipes);
router.post("/", createRecipe);
router.get("/:id", getRecipeById);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);
router.post("/:id/rate", rateRecipe);

module.exports = router;