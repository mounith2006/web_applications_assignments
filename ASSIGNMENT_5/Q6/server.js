
const express = require('express');
const app = express();

// Authentication middleware
const auth = (req, res, next) => {
    if (req.query.role === 'admin') {
        next();
    } 
    else 
        {
        res.send('Access Denied');
    }
};

// Home route (no authentication)
app.get('/home', (req, res) => {
    res.send('Welcome to Home');
});

// Dashboard route (authentication required)
app.get('/dashboard', auth, (req, res) => {
    res.send('Welcome to Admin Dashboard');
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
