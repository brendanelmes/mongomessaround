const { MongoClient } = require("mongodb");
const MUUID = require('uuid-mongodb');
const ObjectId = require('mongodb').ObjectID;

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
        // const p = await vote(col, "6052061550691f092174d0e9");
        // Find one document

        // const uuid = MUUID.from('dba18ac0-872c-11eb-9296-e1f8f11cdee8');

        const id = ObjectId('6052061550691f092174d0e9');

        const myDoc = await col.findOne({_id: id});
        // Print to the console
        console.log(myDoc);

    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}

function vote(col, id) {
    col.updateOne({_id: id}, {$inc: {score: 1}})
}


run().catch(console.dir);