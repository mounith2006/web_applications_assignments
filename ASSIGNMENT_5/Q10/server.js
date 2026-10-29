
const express = require('express');
const app = express();

app.use(express.json());

// Initial product data
let products = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Mobile', price: 20000 }
];

// GET all products
app.get('/products', (req, res) => {
    res.status(200).json(products);
});

// GET product by ID
app.get('/products/:id', (req, res) => {
    const product = products.find(
        p => p.id === Number(req.params.id)
    );

    if (!product) {
        return res.status(404).json({ message: 'Product Not Found' });
    }

    res.status(200).json(product);
});

// POST a new product
app.post('/products', (req, res) => {
    const product = {
        id: products.length
            ? Math.max(...products.map(p => p.id)) + 1
            : 1,
        name: req.body.name,
        price: req.body.price
    };

    products.push(product);
    res.status(201).json(product);
});

// PUT update a product
app.put('/products/:id', (req, res) => {
    const product = products.find(
        p => p.id === Number(req.params.id)
    );

    if (!product) {
        return res.status(404).json({ message: 'Product Not Found' });
    }

    product.name = req.body.name;
    product.price = req.body.price;

    res.status(200).json({
        message: 'Product Updated Successfully',
        product: product
    });
});

// DELETE a product
app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(
        p => p.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({ message: 'Product Not Found' });
    }

    const deletedProduct = products.splice(index, 1)[0];

    res.status(200).json({
        message: 'Product Deleted Successfully',
        product: deletedProduct
    });
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
