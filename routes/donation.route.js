const express = require("express");
const donationController = require("../controller/donation.controller");
const verify = require("../middleware/auth.token");
const router = express.Router();

router.post(
  "/donations",
  verify.verifyToken,
  verify.ifAdmin,
  donationController.createDonation
);
router.get(
  "/donations",
  verify.verifyToken,
  verify.ifAdmin,
  donationController.getDonation
);
router.get(
  "/donations/:id",
  verify.verifyToken,
  verify.ifAdmin,
  donationController.getDonationbyId
);
router.get(
  "/donationsbyuser",
  verify.verifyToken,
  donationController.getDonationbyUserID
);
router.patch(
  "/donations/:id",
  verify.verifyToken,
  verify.ifAdmin,
  donationController.updateDonation
);
router.delete(
  "/donations/:id",
  verify.verifyToken,
  verify.ifAdmin,
  donationController.deleteDonation
);

module.exports = router;
