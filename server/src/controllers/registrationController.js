const Registration = require("../models/Registration");
const Event = require("../models/Event");

// ⭐ Register for an event
exports.registerForEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    // 1️⃣ Check event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 2️⃣ Check duplicate registration
    const existing = await Registration.findOne({
      user: userId,
      event: eventId,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Already registered for this event" });
    }

    // 3️⃣ Check capacity
    const totalRegistrations = await Registration.countDocuments({
      event: eventId,
    });

    if (totalRegistrations >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    // 4️⃣ Create registration
    const registration = await Registration.create({
      user: userId,
      event: eventId,
    });

    res.status(201).json({
      message: "Successfully registered",
      registration,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ⭐ Cancel registration
exports.cancelRegistration = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    const registration = await Registration.findOneAndDelete({
      user: userId,
      event: eventId,
    });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Registration cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ⭐ Get events registered by user (Dashboard)
exports.getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user._id;

    const registrations = await Registration.find({ user: userId })
      .populate("event")
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
