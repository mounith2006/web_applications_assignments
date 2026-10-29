
const express = require('express');
const app = express();

app.use(express.json());

// Middleware to log every request
app.use((req, res, next) => {
    console.log(req.method, req.url, new Date().toLocaleString());
    next();
});

// Employee data
let employees = [
    { id: 1, name: 'Ravi', department: 'IT' },
    { id: 2, name: 'Sita', department: 'HR' }
];

// GET all employees
app.get('/employees', (req, res) => {
    res.status(200).json(employees);
});

// GET employee by ID
app.get('/employees/:id', (req, res) => {
    const employee = employees.find(
        e => e.id === Number(req.params.id)
    );

    if (!employee) {
        return res.status(404).json({
            message: 'Employee Not Found'
        });
    }

    res.status(200).json(employee);
});

// POST a new employee
app.post('/employees', (req, res) => {
    const employee = {
        id: employees.length
            ? Math.max(...employees.map(e => e.id)) + 1
            : 1,
        name: req.body.name,
        department: req.body.department
    };

    employees.push(employee);
    res.status(201).json(employee);
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({
        message: 'Route Not Found'
    });
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});

