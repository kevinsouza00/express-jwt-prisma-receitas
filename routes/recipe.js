
const express = require('express');
const router = express.Router();


const recipeController = require('../controllers/recipeController');


const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware);


router.get('/', recipeController.listRecipes);


router.post('/', recipeController.createRecipe);


router.get('/:id', recipeController.getRecipe);


router.put('/:id', recipeController.updateRecipe);


router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
