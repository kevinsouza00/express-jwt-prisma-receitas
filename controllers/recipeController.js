const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listRecipes(req, res) {
    const r = await prisma.recipe.findMany({
        where: {
            userId: req.usuarioId
        }
    })
    res.json(r);
}


async function createRecipe(req, res) {
    const { name, description, preparationTime } = req.body;

    await prisma.recipe.create({
        data: {
            name: name,
            description: description,
            preparationTime: preparationTime,
            user: {
                connect: {
                    id: req.usuarioId
                }
            }
        }
    });

    res.status(201).json({ message: 'Receita criada com sucesso' });
}


async function getRecipe(req, res) {
    const { id } = req.params;

    const recipe = await prisma.recipe.findFirst({
        where: {
            id: Number(id)
        }
    })
    if (!recipe) {
        return res.status(404).json({ error: 'Receita não encontrada' });
    }


    if (recipe.userId !== req.usuarioId) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    res.json(recipe);
}


async function updateRecipe(req, res) {
    const { id } = req.params;
    const { name, description, preparationTime } = req.body;

    const recipe = await prisma.recipe.findUnique({
        where: {
            id: Number(id),
        }
    })
    //const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
    if (!recipe) {
        return res.status(404).json({ error: 'Receita não encontrada' });
    }


    if (recipe.userId !== req.usuarioId) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    recipe.name = name;
    recipe.description = description;
    recipe.preparationTime = preparationTime;

    await prisma.recipe.update(
        {
            where: { id: Number(recipe.id) },
            data: recipe,
        },
    );

    res.json({ message: 'Receita atualizada com sucesso' });
}


async function deleteRecipe(req, res) {
    const { id } = req.params;

    await prisma.recipe.delete({
        where: {
            id: Number(id),
        }
    })

    res.json({ message: 'Receita excluída com sucesso' });
}

module.exports = {
    listRecipes,
    createRecipe,
    getRecipe,
    updateRecipe,
    deleteRecipe,
};
