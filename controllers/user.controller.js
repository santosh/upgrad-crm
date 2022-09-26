const User = require("../models/user.model")

exports.findAllUsers = async (req, res) => {
  // fetch the data from the DB
  const users = await User.find()

  // remove the private data in these documents
  users.map(user => delete user.password)

  // return all the users
  return res.status(200).json(users)
}

exports.update = async (req, res) => {
  const userIdReq = req.params.userId
  const user = await User.findOne({ userId: userIdReq })

  user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus
  user.userType = req.body.userType != undefined ? req.body.userType : user.userType

  await user.save()

  res.status(200).send({
    message: "User got successfullly saved"
  })
}
