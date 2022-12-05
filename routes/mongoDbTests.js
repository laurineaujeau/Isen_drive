const { MongoClient } = require('mongodb');

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
getCategories()
    .then(console.log)
    .catch(console.error)
    //5. fermer la connexion
    .finally(() => client.close());

