const Ticket = require("../models/ticket.model")
const User = require("../models/user.model")

requestBody = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).send({
      message: "title not provided"
    })
  }

  if (!req.body.description) {
    return res.status(400).send({
      message: "description not provided"
    })
  }

  if (req.body.status && !(Object.values(constants.ticketStatuses).includes(req.body.status))) {
    return res.status(400).send({
      message: "ticket status can only be OPEN, IN_PROGRESS, BLOCKED, COMPLETED"
    })
  }

  next();
}


// updateTicketById should only can be edited by:
// 1. User who created the ticket
// 2. Engineer who is assigned
// 3. Admin
onlySpecificUser = async (req, res, next) => {
  const ticket = await Ticket.findOne({ _id: req.params.id })
  const user = await User.findOne({ userID: req.userId })

  // allow admin regardless whatever
  // restrict to customer who posted and engineer who is assigned
  if ([ticket.reporter, ticket.assignee].includes(req.userId) || user.userType == "ADMIN") {
    next()
  } else {
    return res.status(403).send({
      message: "you are not authorized to do this operation"
    })
  }


}

module.exports = {
  requestBody,
  onlySpecificUser
}
