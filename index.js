const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const eventRoute = require("./routes/event.route");
const donationRoute = require("./routes/donation.route");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
console.log(PORT);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(userRoute);
app.use(authRoute);
app.use(eventRoute);
app.use(donationRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
