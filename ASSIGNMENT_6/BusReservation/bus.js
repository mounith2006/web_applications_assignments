
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function main() {
  try {
    // 1. Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("TransportDB");
    const buses = db.collection("buses");

    // 2. Insert three bus records
    await buses.insertMany([
      {
        busNo: "B101",
        route: "Vizag-Hyderabad",
        totalSeats: 40,
        availableSeats: 25
      },
      {
        busNo: "B102",
        route: "Vizag-Vijayawada",
        totalSeats: 40,
        availableSeats: 15
      },
      {
        busNo: "B103",
        route: "Vizag-Chennai",
        totalSeats: 50,
        availableSeats: 30
      }
    ]);

    console.log("Three buses inserted");

    // 3. Find buses with more than 20 available seats
    const result = await buses
      .find({ availableSeats: { $gt: 20 } })
      .toArray();

    console.log("Buses with more than 20 available seats:");
    console.log(result);

    // 4. Update available seats of B102
    await buses.updateOne(
      { busNo: "B102" },
      { $set: { availableSeats: 28 } }
    );

    console.log("Bus B102 updated");

    // 5. Delete bus B103
    await buses.deleteOne({ busNo: "B103" });

    console.log("Bus B103 deleted");

    // 6. Display final records
    const finalRecords = await buses.find().toArray();

    console.log("Final bus records:");
    console.log(finalRecords);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

main();
