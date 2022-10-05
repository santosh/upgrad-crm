const authController = require("../controllers/auth.controller")
const signupValidator = require("../middlewares/verifyUserSignupRequestBody")

module.exports = (app) => {
  app.post("/api/v1/auth/signup", [signupValidator.validateSignupRequestBody], authController.signup);
  app.post("/api/v1/auth/signin", authController.login);
}
