// TODO compléter

const express = require('express');
const router = express.Router();
const path = require('path');
const produitRouter = require(path.join(__dirname, "../","model","Product.js"));
const categoryRouter = require(path.join(__dirname, "../","model","Category.js"));

router.get('/new', async(req, res) => {
    res.render('productForm.pug',{
        title: "Créer un produit",
        categories : await categoryRouter.getAll()
    });
});

router.get('/:_id', async (req, res) => {
    let product = await produitRouter.getById(req.params._id);
    let category = await categoryRouter.getById(product.categoryId);
    res.render('product.pug',{
        title: "Informations sur le produit "+ product.name,
        categorie : category,
        product: product
    });
});

router.get('/:_id/update', async (req, res) => {
    res.render('productUpdate.pug',{
        title: "Modification du produit "+ await produitRouter.getAll()[req.params._id-1].name,
        categorie : await categoryRouter.getAll()[ await produitRouter.getAll()[req.params._id-1].categoryId-1].name,
        categories : await categoryRouter.getAll(),
        product: await produitRouter.getAll()[req.params._id-1]
    });
});

router.get('/:_id/delete', async (req, res) => {
    res.render('productDelete.pug',{
        title: "Suppression du produit "+ await produitRouter.getAll()[req.params._id-1].name,
        categorie : await categoryRouter.getAll()[ await produitRouter.getAll()[req.params._id-1].categoryId-1].name,
        product: await produitRouter.getAll()[req.params._id-1]
    });
});

module.exports = router;