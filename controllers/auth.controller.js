const constants = require("../utils/constants")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const authSecret = require("../config/auth.config")

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

exports.login = async (req, res) => {
  // load the user 
  const user = await User.findOne({ userID: req.body.userID })

  if (!user) {
    return res.status(400).json({ message: "user id passed is incorrect" })
  }

  // check if user is not in pending state
  if (user.userStatus != constants.userStatuses.approved) {
    return res.status(400).json({ message: "Can't allow the login as the user is in the pending state" })
  }

  // check if the password is matched
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

  if (!isPasswordValid) {
    return res.status(400).send({
      "message": "Password provided is incorrect"
    })
  }

  const token = jwt.sign({ id: user.userID }, authSecret.secret, { expiresIn: 120 })

  return res.status(200).json({
    name: user.name,
    userId: user.userID,
    email: user.email,
    userType: user.userType,
    userStatus: user.userStatus,
    accessToken: token
  })

}
