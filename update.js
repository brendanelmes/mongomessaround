const { MongoClient } = require("mongodb");

const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "people"
        const col = db.collection("sailboat");

        // Insert a single document, wait for promise so we can read it back
        const p = await col.updateOne({details: "Hello"},{$set: {details: "DoD is super slow"}});
        // Find one document
        const myDoc = await col.findOne({details: "Hello"});
        // Print to the console
        console.log(myDoc);

    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}

run().catch(console.dir);