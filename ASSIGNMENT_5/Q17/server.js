
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to read JSON request bodies
app.use(express.json());

// Sample student records
let students = [
  { id: 1, name: "Rahul", branch: "CSE", age: 20 },
  { id: 2, name: "Priya", branch: "ECE", age: 19 }
];

// GET: Retrieve all students
app.get("/students", (req, res) => {
  res.json(students);
});

// GET: Retrieve a student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find(
    (s) => s.id === Number(req.params.id)
  );

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// POST: Add a new student
app.post("/students", (req, res) => {
  const { name, branch, age } = req.body;

  if (!name || !branch || age === undefined) {
    return res.status(400).json({
      message: "Name, branch and age are required"
    });
  }

  const newStudent = {
    id: students.length
      ? Math.max(...students.map((s) => s.id)) + 1
      : 1,
    name,
    branch,
    age
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT: Update a student
app.put("/students/:id", (req, res) => {
  const student = students.find(
    (s) => s.id === Number(req.params.id)
  );

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, branch, age } = req.body;

  if (name !== undefined) student.name = name;
  if (branch !== undefined) student.branch = branch;
  if (age !== undefined) student.age = age;

  res.json({
    message: "Student updated successfully",
    student
  });
});

// DELETE: Remove a student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
