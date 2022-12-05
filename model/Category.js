

const Product = require("./Product.js");
const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function getCategories(){
    //1. Se connecter à la base de données
    await client.connect();

    //2. Selectionner la bonne base
    const database = client.db("isen_drive");

    //3. Selectionner la bonne collection
    const categoriesCollection = database.collection("categories");
    const productsCollection = database.collection("products");

    //4. Récupérer les documents avec find et toArray
    let categories = await categoriesCollection.find().toArray();

    //Nombre de produits
    for(const category of categories){
        category.size =  await productsCollection.countDocuments({categoryId : category._id})
    }
    return categories
}

const Category = {

    getById : async function (categoryId) {
        let categories = await this.getAll();
        for(let i =0; i<categories.length; i++){
            let c = categories[i]._id;
            let b = new ObjectId(categoryId);
            if( b.equals(c)){
               return categories[i];
           }
        }
    },

    getAll : async function () {
        return getCategories();
    }
/*
    getAll : function(){
        const categories = [
            {_id: "1", name: "Boucherie"},
            {_id: "2", name: "Boulangerie"},
            {_id: "3", name: "Produits laitiers"},
            {_id: "4", name: "Fruits & Légumes"},
            {_id: "5", name: "Bébé"},
            {_id: "6", name: "Entretien"},
        ];

        // computes category size
        for(let category of categories){
            category.size = Product.getByCategory(category._id).length;
        }

        return categories;
    }
*/

};

module.exports = Category;
