const constants = require("../utils/constants")
const bcrypt = require("bcryptjs")
const User = require("../models/user.model")

// write the logic to register a user

exports.signup = async (req, res) => {
  // read the user input
  const userObj = {
    name: req.body.name,
    userId: req.body.userId,
    email: req.body.email,
    userType: req.body.userType,
    userStatus: (req.body.userType == constants.userTypes.engineer)
      ? constants.userStatuses.pending : req.body.userStatus,
    password: bcrypt.hashSync(req.body.password, 8)
  }

  // store user data to DB
  try {
    const userCreated = await User.create(userObj)

    // return response
    const userResp = {
      name: userCreated.name,
      userId: userCreated.userId,
      email: userCreated.email,
      userType: userCreated.userType,
      userStatus: userCreated.userStatus,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt
    }
    res.status(201).json(userResp)

  } catch (error) {
    console.log("Error while creating a new user", error.message);
    res.status(500).json({
      message: "Some internal server error has happened when inserting user"
    })
  }

}
