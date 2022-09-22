validateSignupRequestBody = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name not provided"
    })
  }

  if (!req.body.userID) {
    res.status(400).send({
      message: "userID not provided"
    })
  }

  if (!req.body.email) {
    res.status(400).send({
      message: "Email not provided"
    })
  }

  if (!req.body.userType) {
    res.status(400).send({
      message: "userType not provided"
    })
  }

  if (!req.body.userStatus) {
    res.status(400).send({
      message: "userStatus not provided"
    })
  }

  if (!req.body.password) {
    res.status(400).send({
      message: "password not provided"
    })
  }

  next();
}

module.exports = {
  validateSignupRequestBody
}
