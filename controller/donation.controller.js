const models = require("../models/index");

function createDonation(req, res) {
  const { amount } = req.body;
  const user_id = req.cookies.userID;
  const event_id = req.cookies.eventID;
  var total_amount = 0;

  models.Donations.create({
    amount: req.body.amount,
    idUser: user_id,
    idEvent: event_id,
  }).then((donate) => {
    if (!donate) {
      console.log(error.message);
    } else {
      models.Donations.findAll({
        where: {
          idEvent: event_id,
        },
      }).then((countDonate) => {
        countDonate.forEach((count) => {
          total_amount = total_amount + count.amount;
        });
        models.Events.update(
          { total: total_amount },
          {
            where: {
              id: event_id,
            },
          }
        );
      });

      res.status(200).json({ message: "Donation Created" });
    }
  });
}

function getDonation(req, res) {
  models.Donations.findAll().then((donate) => {
    if (donate === null) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      res.status(200).json(donate);
    }
  });
}

function getDonationbyId(req, res) {
  models.Donations.findOne({
    where: {
      id: req.params.id,
    },
  }).then((donate) => {
    if (donate === null) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      res.status(200).json(donate);
    }
  });
}

function getDonationbyUserID(req, res) {
  models.Donations.findAll({
    where: {
      idUser: req.cookies.userID,
    },
  }).then((donate) => {
    if (donate === null) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      res.status(200).json(donate);
    }
  });
}

function updateDonation(req, res) {
  models.Donations.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((donate) => {
    if (donate === null) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      res.status(200).json({ message: "Donate Updated" });
    }
  });
}

function deleteDonation(req, res) {
  try {
    models.Donations.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Donate Deleted" });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  createDonation: createDonation,
  getDonation: getDonation,
  getDonationbyId: getDonationbyId,
  updateDonation: updateDonation,
  deleteDonation: deleteDonation,
  getDonationbyUserID: getDonationbyUserID,
};
