const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectID;

const app = express();
const url = "";
const client = new MongoClient(url);
const dbName = "retro";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/css', express.static(__dirname + 'public/css'));
app.use(express.json());

app.set('views', './views');
app.set('view engine', 'ejs');

client.connect().then(client => {
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection("startstopcontinue");

    app.get('/', (req, res) => {
        col.find().toArray().then(result => {
            console.log(result)
            res.render('index', {text: result})

        })
            .catch(error => console.error(error))
    });

    app.post('/stop', (req, res) => {
        col.insertOne({details: req.body.description, type: "stop"})
            .then(result => {
            res.redirect('/')
            console.log(req.body.description)
        }).catch(error => console.error(error))
    });

    app.post('/start', (req, res) => {
        col.insertOne({details: req.body.description, type: "start"})
            .then(result => {
                res.redirect('/')
                console.log(req.body.description)
            }).catch(error => console.error(error))
    });

    app.post('/continue', (req, res) => {
        col.insertOne({details: req.body.description, type: "continue"})
            .then(result => {
                res.redirect('/')
                console.log(req.body.description)
            }).catch(error => console.error(error))
    });

    app.listen(3000, function() {
        console.log('listening on 3000')
    });
    }
).catch(console.error);