
const recipes = [];


function listRecipes(req, res) {
    const userRecipes = recipes.filter((recipe) => recipe.userId === req.user.id);
    res.json(userRecipes);
}


function createRecipe(req, res) {
    const { name, description, preparationTime } = req.body;


    const recipe = {
        id: recipes.length + 1,
        name,
        description,
        preparationTime,
        userId: req.user.id,
    };
    recipes.push(recipe);

    res.status(201).json({ message: 'Receita criada com sucesso' });
}


function getRecipe(req, res) {
    const { id } = req.params;


    const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
    if (!recipe) {
        return res.status(404).json({ error: 'Receita não encontrada' });
    }


    if (recipe.userId !== req.user.id) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    res.json(recipe);
}


function updateRecipe(req, res) {
    const { id } = req.params;
    const { name, description, preparationTime } = req.body;


    const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
    if (!recipe) {
        return res.status(404).json({ error: 'Receita não encontrada' });
    }


    if (recipe.userId !== req.user.id) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
    }


    recipe.name = name;
    recipe.description = description;
    recipe.preparationTime = preparationTime;

    res.json({ message: 'Receita atualizada com sucesso' });
}


function deleteRecipe(req, res) {
    const { id } = req.params;


    const recipeIndex = recipes.findIndex((recipe) => recipe.id === parseInt(id));
    if (recipeIndex === -1) {
        return res.status(404).json({ error: 'Receita não encontrada' });
    }


    if (recipes[recipeIndex].userId !== req.user.id) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
    }


    recipes.splice(recipeIndex, 1);

    res.json({ message: 'Receita excluída com sucesso' });
}

module.exports = {
    listRecipes,
    createRecipe,
    getRecipe,
    updateRecipe,
    deleteRecipe,
};
