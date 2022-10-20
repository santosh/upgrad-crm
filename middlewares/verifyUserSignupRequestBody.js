const constants = require("../utils/constants")

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

  if ((!req.body.email) || (req.body.email && !isEmailValid(req.body.email))) {
    return res.status(400).send({
      message: "email not provided or is not valid"
    })
  }

  if ((!req.body.password) || (req.body.password && !isPasswordStrong(req.body.password))) {
    return res.status(400).send({
      message: "password not provided or is too weak"
    })
  }

  // If has userType, make sure it is among already defined user type.
  if (req.body.userType) {
    if (!Object.values(constants.userTypes).includes(req.body.userType)) {
      return res.status(400).send({
        message: `userType must be among ${Object.values(constants.userTypes)}`
      })
    }
  }
  // If has userStatus, make sure it is amoung already defined user status.
  if (req.body.userStatus) {
    if (!Object.values(constants.userStatuses).includes(req.body.userStatus)) {
      return res.status(400).send({
        message: `userStatus must be among ${Object.values(constants.userStatuses)}`
      })
    }
  }

  next();
}

/**
 * isEmailValid returns true if the email passed matches the following criteria:
 * 1. The format of email should be <part1>@<part2>.<part3>
 * 2. Part 1 and part 2 should have at least one character
 * 3. Part 3 can have at least 2 characters and at most 6 characters.
 * 4. Part 1 and part 2 can contain the following characters a-z, A-Z, 0-9, . (dot), _, -.
 * 5. Lastly, Part 3 can contain the following characters (a-z)

 * @param {string} email - email address to validate
 */
function isEmailValid(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

/**
 * isPasswordStrong returns true if it has at least 1 numeric, 1 special character,
 * and is at least 8 characters. Returns false otherwise.
 *
 * @param {string} password
 */
function isPasswordStrong(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)
}

module.exports = {
  validateSignupRequestBody
}
