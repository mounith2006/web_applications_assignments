
const express = require('express');
const app = express();

app.use(express.json());

// Initial book collection
let books = [
    { id: 1, title: 'Java Basics', author: 'James' },
    { id: 2, title: 'Web Development', author: 'John' }
];

// GET all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// POST a new book
app.post('/books', (req, res) => {
    const book = {
        id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(book);
    res.status(201).json(book);
});

// PUT update a book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: 'Book Not Found' });
    }

    book.title = req.body.title;
    book.author = req.body.author;

    res.status(200).json({
        message: 'Book Updated Successfully',
        book: book
    });
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: 'Book Not Found' });
    }

    const deletedBook = books.splice(index, 1)[0];

    res.status(200).json({
        message: 'Book Deleted Successfully',
        book: deletedBook
    });
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
