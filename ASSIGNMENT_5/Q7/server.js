
const express = require('express');
const app = express();

app.use(express.json());

// In-memory student array
let students = [
    { id: 1, name: 'Ravi', age: 20 },
    { id: 2, name: 'Sita', age: 21 }
];

// GET all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (student) {
        res.json(student);
    } else {
        res.status(404).send('Student Not Found');
    }
});

// POST a new student
app.post('/students', (req, res) => {
    const student = {
        id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
        name: req.body.name,
        age: req.body.age
    };

    students.push(student);
    res.status(201).json(student);
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
