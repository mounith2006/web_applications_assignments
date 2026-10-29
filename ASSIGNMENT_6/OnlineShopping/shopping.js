
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function main() {
  try {
    // 1. Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("ShoppingDB");
    const products = db.collection("products");

    // 2. Insert four product records
    await products.insertMany([
      { productId: "P101", productName: "Laptop", category: "Electronics", price: 50000, stock: 15 },
      { productId: "P102", productName: "Headphones", category: "Electronics", price: 2000, stock: 8 },
      { productId: "P103", productName: "Keyboard", category: "Accessories", price: 1500, stock: 20 },
      { productId: "P104", productName: "Mouse", category: "Accessories", price: 500, stock: 12 }
    ]);

    console.log("Four products inserted");

    // 3. Retrieve products with stock greater than 10
    const result = await products
      .find({ stock: { $gt: 10 } })
      .toArray();

    console.log("Products with stock greater than 10:");
    console.log(result);

    // 4. Update the price of product P102
    await products.updateOne(
      { productId: "P102" },
      { $set: { price: 2500 } }
    );

    console.log("Product P102 price updated");

    // 5. Delete product P103
    await products.deleteOne({ productId: "P103" });

    console.log("Product P103 deleted");

    // 6. Display the remaining products
    const finalProducts = await products.find().toArray();

    console.log("Remaining products:");
    console.log(finalProducts);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

main();
