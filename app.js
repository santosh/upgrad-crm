const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const serverConfig = require("./configs/server.config")
const dbConfig = require("./configs/db.config")
const User = require("./models/user.model")
const constants = require("./utils/constants")

mongoose.connect(dbConfig.DB_URL)

const db = mongoose.connection

db.on("error", () => {
  console.log("Error while connecting to the MongoDB server");
})

db.once("open", () => {
  console.log("Connected to the MongoDB");
  init()
})

const app = express()
require("./routes/auth.route")(app)
require("./routes/user.route")(app)
app.use(express.json())

app.listen(serverConfig.PORT, () => {
  console.log("Server started on the port no:", serverConfig.PORT);
})


async function init() {
  // check if the admin user is already existing
  try {
    const adminUser = await User.findOne({ userID: 'sntshk' })
    if (adminUser) {
      console.log("Admin user already exists");
      return
    }
  } catch (err) {
    console.log("Error while checking for admin the user", err.message);
  }

  try {
    // create an admin user
    const admin = await User.create({
      name: "Santosh Kumar",
      userID: "sntshk",
      email: "sntshkmr60@gmail.com",
      userType: constants.userTypes.admin,
      password: bcrypt.hashSync("Welcome1", 8),
    })

    console.log(admin);

  } catch (err) {
    console.log("Error while storing the user", err.message);
  }
}
