const express = require('express');
const mongoose = require('mongoose');
const Product = require('./model/productModel');
const app = express();


app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('hello node api')
})

app.get('/blog', (req, res) => {
    res.send('hello blog, Here NRB Solutions')
})

//  store product to mongo db
app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

// get Products all data from mongodb
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// find Products from mongodb
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// update data
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product to update
        if(!product) {
            return res.status(404).json({message: `Cannnot find any product with ID ${id}`});
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// delete product
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product) {
            return res.status(404).json({message: `Cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://tauhedulislam0001:mongo2023@cluster0.uluvjqb.mongodb.net/node-api?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB!')
    app.listen(3000, () => {
        console.log('Node API app is running on port 3000')
    });
  }).catch((error) => {
    console.log(error)
  });