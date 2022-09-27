const userController = require("../controllers/user.controller")
const auth = require("../middlewares/authjwt")

module.exports = (app) => {
  app.get("/crm/api/v1/users", [auth.verifyToken, auth.isAdmin], userController.findAllUsers)
  app.put("/crm/api/v1/users/:userId", [auth.verifyToken, auth.isAdmin], userController.update)
}
