// this middleware will have the logic to validate the access token passed in the ruqest header
const jwt = require("jsonwebtoken")
const secretConfig = require("../configs/secret.config")
const User = require("../models/user.model")
const constants = require("../utils/constants")

module.exports = verifyToken = (req, res, next) => {
  // read the token passed in the request header
  const token = req.headers["x-access-token"]

  // validate token
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    })
  }

  jwt.verify(token, secretConfig.secret, (err, decoded) => {
    if (err) {
      res.status(401).send({
        message: "Unauthorized token"
      })
    }

    req.userId = decoded.id
    next()
  })
}

module.exports = isAdmin = async (req, res, next) => {
  const user = await User.findOne({ userId: req.userId })

  if (user && user.userType == constants.userTypes.admin) {
    next()
  } else {
    return res.status(403).send({
      message: "Only ADMIN is allowed to make this call"
    })
  }
}
