const { MongoClient } = require("mongodb");
const MUUID = require('uuid-mongodb');

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

        // Construct a document
        let sailboatDocument = {
            "_id": MUUID.v1(),
            "details": "Complete the retrospective board app",
            "type": "goal",
            "score": 0
        };

        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(sailboatDocument);
        // Find one document
        const myDoc = await col.findOne();
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