const ticketController = require("../controllers/ticket.controller")
const ticketValidator = require("../middlewares/validateTicket")
const authJwt = require("../middlewares/authjwt")


module.exports = (app) => {
  app.post("/api/v1/tickets", [authJwt.verifyToken, ticketValidator.requestBody], ticketController.create)
  app.post("/api/v1/tickets/:id", [authJwt.verifyToken, ticketValidator.requestBody], ticketController.updateTicketById)
  app.get("/api/v1/tickets", [authJwt.verifyToken], ticketController.getAllTicket)
  app.get("/api/v1/tickets/:id", [authJwt.verifyToken], ticketController.getTicketById)
}
