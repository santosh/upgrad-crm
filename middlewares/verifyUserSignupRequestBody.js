validateSignupRequestBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "name not provided"
    })
  }

  if (!req.body.userID) {
    return res.status(400).send({
      message: "userID not provided"
    })
  }

  if (!req.body.email) {
    return res.status(400).send({
      message: "email not provided"
    })
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "password not provided"
    })
  }

  next();
}

module.exports = {
  validateSignupRequestBody
}
