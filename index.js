const express = require("express")
const mongoose = require("mongoose")
const Product = require('./models/product.model')
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/products", productRoute)

app.get('/', (req, res) => {
    res.send("hello word")
});

app.get('/api/products', async(req, res) => {
    try {
        const products = await Product.find(req.body)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.get('/api/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.post('/api/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//update a product

app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({message: " Product not found"})
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// Delete a product

app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({message: " Product not found"})
        }

        res.status(200).json({message: "Product deleted successfully"})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//Add your database name and password
mongoose.connect(
    "mongodb+srv://<username>:<password>>@cluster0.ndbogkc.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
        console.log("Serve is running on port 3000")
    });
})
.catch(() => {
    console.log("Connection failed!");
});