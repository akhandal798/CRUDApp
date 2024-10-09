const express = require('express')
const mongoose  = require('mongoose')
const app = express()
const Product = require('./modules/product.model.js')

app.use(express.json())


//req, res if request and response
app.get("/", (req, res) => {
    res.send("Hello from node API server");
})

app.post("/api/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {;
        res.status(500).json({message: error.message});
    }

})

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {;
        res.status(500).json({message: error.message});
    }
})

app.get('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {;
        res.status(500).json({message: error.message});
    }
})

//update a product
app.put('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {;
        res.status(500).json({message: error.message});
    }
})

//delete a product
app.delete('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: "Product doesn't exist"});
        }
        res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {;
        res.status(500).json({message: error.message});
    }
})

mongoose.connect('mongodb+srv://admin:mxT6PnOUm23HXHtR@backenddb.bqolr.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=BackEndDB').then(() => {
    console.log("Connected to database ")
    useNewUrlParser: true
    useUnifiedTopology: true
    ssl: true, // Enable SSL
    //express is running
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
}).catch(() => {
    console.log("Connection failed")
})


