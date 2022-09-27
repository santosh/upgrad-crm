validateTicketRequestBody = (req, res, next) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "title not provided"
    })
  }

  if (!req.body.ticketPriority) {
    res.status(400).send({
      message: "ticketPriority not provided"
    })
  }

  if (!req.body.description) {
    res.status(400).send({
      message: "description not provided"
    })
  }

  if (!req.body.status) {
    res.status(400).send({
      message: "status not provided"
    })
  }

  if (!(Object.values(constants.ticketStatuses).includes(req.body.status))) {
    res.status(400).send({
      message: "ticket status can only be OPEN, IN_PROGRESS, BLOCKED, COMPLETED"
    })
  }

  next();
}

module.exports = {
  validateTicketRequestBody
}