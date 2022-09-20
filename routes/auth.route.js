const authController = require("../controllers/auth.controller")
const signupValidator = require("../middlewares/verifyUserRequestBody")

module.exports = (app) => {
  app.post("/crm/api/v1/auth/signup", [signupValidator.validateSignupRequestBody], authController.signup)
}
