const User = require("../models/user.model")

exports.findAllUsers = async (req, res) => {
  // fetch the data from the DB
  const users = await User.find()

  // remove the private data in these documents
  users.map(user => delete user.password)

  // return all the users
  return res.status(200).json(users)
}
