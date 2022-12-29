const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.il3o5bv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


console.log(process.env.DB_PASS)



async function run() {

    try {
        // collections
        const servicesCollection = client.db("houseRent").collection("services");

        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log(req.body)
            const result = await servicesCollection.insertOne(service);
            res.send(result);
        });

    }
    finally {

    }

}

run().catch(err => console.error(err));


app.get('/', async (req, res) => {
    res.send('House rental server is running')
});

app.listen(port, () => {
    console.log(`House rental Server is running on ${[port]}`);
});