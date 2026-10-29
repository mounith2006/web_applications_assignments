
const express = require('express');
const app = express();

app.get('/students', (req, res) => {
    res.send('Students: Ravi, Sita, Arun');
});

app.get('/students/:id', (req, res) => {
    res.send('Student ID: ' + req.params.id);
});

app.get('/faculty', (req, res) => {
    res.send('Faculty: Dr. Kumar, Professor of CSE');
});

app.use((req, res) => {
    res.status(404).send('404 Page Not Found');
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
