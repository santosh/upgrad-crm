const User = require("../models/user.model")

exports.findAllUsers = async (req, res) => {
  try {
    // fetch the data from the DB
    const users = await User.find().lean()

    if (!users) {
      return res.status(400).send({
        message: "No records found"
      })
    }

    // remove the private data in these documents
    users.map(user => delete user.password)

    // return all the users
    return res.status(200).json(users)
  } catch (err) {
    console.log("Error while fetching all the users ", err.message);
    return res.status(500).send({
      message: "Some error occured while fetching users"
    })
  }
}

exports.findUserById = async (req, res) => {
  try {
    // fetch the data from the DB
    const users = await User.find({ _id: req.params.userId }).lean()

    // remove the private data in these documents
    users.map(user => delete user.password)

    // return all the users
    return res.status(200).json(users)
  } catch (err) {
    console.log(`Error while fetching the userId ${req.params.userId}`, err.message);
    return res.status(500).send({
      message: `Some error occured while fetching user with userId ${req.params.userId}`
    })
  }

}

exports.update = async (req, res) => {
  try {
    const userIdReq = req.params.userId
    const user = await User.findOne({ userId: userIdReq })

    user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus
    user.userType = req.body.userType != undefined ? req.body.userType : user.userType

    await user.save()

    res.status(200).send({
      message: "User got successfullly saved"
    })
  } catch (err) {
    console.log(`Error while updating the userId ${req.params.userId}`, err.message);
    return res.status(500).send({
      message: `Some error occured while updating user with userId ${req.params.userId}`
    })
  }
}
