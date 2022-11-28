const models = require("../models/index");

function createEvent(req, res) {
  models.Events.create(req.body).then((event) => {
    if (!event) {
      console.log(error.message);
    } else {
      res.status(200).json({ message: "Event Created" });
    }
  });
}

function getEvent(req, res) {
  models.Events.findAll().then((event) => {
    if (event === null) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      res.status(200).json(event);
    }
  });
}

function getEventbyId(req, res) {
  models.Events.findOne({
    where: {
      id: req.params.id,
    },
  }).then((event) => {
    if (event === null) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      res.cookie("eventID", event.id);
      res.status(200).json(event);
    }
  });
}

function updateEvent(req, res) {
  models.Events.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((event) => {
    if (event === null) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      res.status(200).json({ message: "Event Updated" });
    }
  });
}

function deleteEvent(req, res) {
  try {
    models.Events.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Event Deleted" });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  createEvent: createEvent,
  getEvent: getEvent,
  getEventbyId: getEventbyId,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent,
};
