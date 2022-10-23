const controller = require("../controllers/ticket.controller")
const validator = require("../middlewares/validateTicket")
const authJwt = require("../middlewares/authjwt")


module.exports = (app) => {
  app.post("/api/v1/tickets", [authJwt.verifyToken, validator.requestBody], controller.create)
  app.put("/api/v1/tickets/:id", [authJwt.verifyToken, validator.onlySpecificUser], controller.updateTicketById)
  app.get("/api/v1/tickets", [authJwt.verifyToken], controller.getAllTicket)
  app.get("/api/v1/tickets/:id", [authJwt.verifyToken, validator.onlySpecificUser], controller.getTicketById)
}
