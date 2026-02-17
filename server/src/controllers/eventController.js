const Event = require("../models/Event");

// @desc    Get all events with search & filters
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    const { search, category, location } = req.query;

    let query = {};

    if (search && search.trim() !== "") {
      query.name = { $regex: search.trim(), $options: "i" };
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const events = await Event.find(query).sort({ date: 1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create new event (optional)
// @route   POST /api/events
// @access  Private/Admin (for now public)
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: "Invalid event data" });
  }
};
