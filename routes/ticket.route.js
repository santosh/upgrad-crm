const ticketController = require("../controllers/ticket.controller")
const ticketValidator = require("../middlewares/verifyTicketRequestBody")
const authJwt = require("../middlewares/authjwt")


module.exports = (app) => {
  app.post("/api/v1/tickets", [authJwt.verifyToken, ticketValidator.validateTicketRequestBody], ticketController.create)
  app.post("/api/v1/tickets/:id", [authJwt.verifyToken, ticketValidator.validateTicketRequestBody], ticketController.updateTicket)
  app.get("/api/v1/tickets", [authJwt.verifyToken], ticketController.getAllTicket)
  app.get("/api/v1/tickets/:id", [authJwt.verifyToken], ticketController.getOneTicket)
}
