const express = require("express");
const router = express.Router();

const {
  registerForEvent,
  cancelRegistration,
  getUserRegistrations,
} = require("../controllers/registrationController");

const protect = require("../middleware/authMiddleware");

router.post("/:eventId", protect, registerForEvent);
router.delete("/:eventId", protect, cancelRegistration);
router.get("/my-events", protect, getUserRegistrations);

module.exports = router;
