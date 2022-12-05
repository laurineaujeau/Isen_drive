// TODO compléter

const {body, validationResult} = require('express-validator');
const express = require('express');
const router = express.Router();
const path = require('path');

const produitRouter = require(path.join(__dirname, "../","model","Product.js"));
const categoryRouter = require(path.join(__dirname, "../","model","Category.js"));

router.get('/new', (req, res) => {
    res.render('categoryForm.pug',{ title: "Créer un rayon"});
});
/*
router.post('/new', body('name').isLength({min: 3}).escape(), (req, res, next) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            categoryRouter.create({
                //_id: req.body._id,
                name: req.body.name
            }).then(categories => res.json(categories));
        }else{
            res.send(errors);
        }
});*/
router.post('/new', body('name').isLength({min: 3}).escape(), (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        categoryRouter.create({
            name: req.body.name
        }).then(categories => res.json(categories));
    }else{
        res.send(errors);
    }
});

// QUESTION 5
router.get('/', async (req, res) => {
    res.render('categories.pug',{
        title: "Rayons",
        categories: await categoryRouter.getAll()
    });
});

// QUESTION 6
router.get('/:_id', async (req, res) => {
    let category = await categoryRouter.getById(req.params._id);
    console.log(category);
    res.render('category.pug', {
        title: "Produits du rayon " +  category.name,
        ID: category._id,
        products: await produitRouter.getByCategory(req.params._id)
    });
});

router.get('/:_id/update', async (req, res) => {

    res.render('categoryUpdate.pug', {
        title: "Modification du rayon " + await categoryRouter.getById(req.params._id).name,
        category: await categoryRouter.getById(req.params._id).name
    });
});

router.get('/:_id/delete', async (req, res) => {
    res.render('categoryDelete.pug', {
        title: "Suppression du rayon " + await categoryRouter.getById(req.params._id).name,
        category: await categoryRouter.getById(req.params._id).name
    });
});

module.exports = router;