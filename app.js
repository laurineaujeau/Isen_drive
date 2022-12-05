// TODO compléter
require('dotenv').config();
const debug = require('debug')('http');
debug('HTTP server listening');
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT;

// QUESTION 3
app.use(morgan('dev'));

app.set('views', path.join(__dirname, "views"));
app.set('view index', 'pug');
/* Question 3 jusqu'à "Déplacement du code dans un routeur" exclus
app.get('/', (req, res) => {
    res.render('index.pug', { title: "Bienvenue a ISEN Drive"});
});*/
const indexRouter = require(path.join(__dirname, "routes","index.js"));
app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, "public")));


// QUESTION 4
const categoriesRouter = require(path.join(__dirname, "routes","categories.js"));
app.use("/categories", categoriesRouter);


// QUESTION 7
const productsRouter = require(path.join(__dirname, "routes","products.js"));
app.use("/products", productsRouter);

app.use(express.json());


app.listen(port, () => {
    //console.log(`Listening on port ${port}`);
    debug(`Listening on port ${port}`);
});

