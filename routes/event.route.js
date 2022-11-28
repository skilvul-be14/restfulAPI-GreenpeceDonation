const express = require("express");
const eventController = require("../controller/event.controller");
const verify = require("../middleware/auth.token");
const router = express.Router();

router.post(
  "/events",
  verify.verifyToken,
  verify.ifAdmin,
  eventController.createEvent
);
router.get("/events", verify.verifyToken, eventController.getEvent);
router.get("/events/:id", verify.verifyToken, eventController.getEventbyId);
router.patch(
  "/events/:id",
  verify.verifyToken,
  verify.ifAdmin,
  eventController.updateEvent
);
router.delete(
  "/events/:id",
  verify.verifyToken,
  verify.ifAdmin,
  eventController.deleteEvent
);

module.exports = router;
