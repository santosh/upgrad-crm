const ticketController = require("../controllers/ticket.controller")
const ticketValidator = require("../middlewares/verifyTicketRequestBody")
const authJwt = require("../middlewares/authjwt")


module.exports = (app) => {
  app.post("/crm/api/v1/tickets", [authJwt.verifyToken, ticketValidator.validateTicketRequestBody], ticketController.create)
  app.post("/crm/api/v1/tickets/:id", [authJwt.verifyToken, ticketValidator.validateTicketRequestBody], ticketController.updateTicket)
  app.get("/crm/api/v1/tickets", [authJwt.verifyToken], ticketController.getAllTicket)
  app.get("/crm/api/v1/tickets/:id", [authJwt.verifyToken], ticketController.getOneTicket)
}
