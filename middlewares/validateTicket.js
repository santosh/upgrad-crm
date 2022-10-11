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

module.exports = {
  requestBody
}
