
const express = require("express");

const app = express();
const PORT = 3001;

// Middleware to parse JSON data
app.use(express.json());

// Sample events
let events = [
  {
    id: 1,
    name: "Tech Fest",
    date: "2026-11-15",
    venue: "GITAM University"
  },
  {
    id: 2,
    name: "Coding Competition",
    date: "2026-11-20",
    venue: "Computer Lab"
  }
];

// GET: Retrieve all events
app.get("/events", (req, res) => {
  res.json(events);
});

// GET: Retrieve event by ID
app.get("/events/:id", (req, res) => {
  const event = events.find(
    (e) => e.id === Number(req.params.id)
  );

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json(event);
});

// POST: Add a new event
app.post("/events", (req, res) => {
  const { name, date, venue } = req.body;

  if (!name || !date || !venue) {
    return res.status(400).json({
      message: "Name, date and venue are required"
    });
  }

  const newEvent = {
    id: events.length
      ? Math.max(...events.map((e) => e.id)) + 1
      : 1,
    name,
    date,
    venue
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

// PUT: Update event details
app.put("/events/:id", (req, res) => {
  const event = events.find(
    (e) => e.id === Number(req.params.id)
  );

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const { name, date, venue } = req.body;

  if (name !== undefined) event.name = name;
  if (date !== undefined) event.date = date;
  if (venue !== undefined) event.venue = venue;

  res.json({
    message: "Event updated successfully",
    event
  });
});

// DELETE: Delete an event
app.delete("/events/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  const deletedEvent = events.splice(index, 1)[0];

  res.json({
    message: "Event deleted successfully",
    event: deletedEvent
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Event API running at http://localhost:${PORT}`);
});
