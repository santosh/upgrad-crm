const ticketController = require("../controllers/ticket.controller")
const ticketValidator = require("../middlewares/verifyTicketRequestBody")


module.exports = (app) => {
  app.post("/crm/api/v1/tickets", [ticketValidator.validateTicketRequestBody], ticketController.create)
}
