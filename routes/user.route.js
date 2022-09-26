const userController = require("../controllers/user.controller")
const { verifyToken, isAdmin } = require("../middlewares/authjwt")

module.exports = (app) => {
  app.get("/crm/api/v1/users", [verifyToken, isAdmin], userController.findAllUsers)
  app.put("/crm/api/v1/users/:userId", [verifyToken, isAdmin], userController.update)
}
