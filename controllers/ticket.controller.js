const Ticket = require("../models/ticket.model")

exports.create = async (req, res) => {
  // read the ticket input
  const ticketObj = {
    title: req.body.title,
    ticketPriority: req.body.ticketPriority,
    description: req.body.description,
    status: req.body.status,
    reporter: req.userId,
    assignee: null
  }

  // store ticket data to DB
  try {
    const ticketCreated = await Ticket.create(ticketObj)

    // return response
    const ticketResp = {
      title: ticketCreated.title,
      ticketPriority: ticketCreated.ticketPriority,
      description: ticketCreated.description,
      status: ticketCreated.status,
      reporter: ticketCreated.reporter,
      assignee: ticketCreated.assignee,
      updatedAt: ticketCreated.updatedAt
    }
    res.status(201).json(ticketResp)

  } catch (error) {
    console.log("Error while creating a new ticket", error.message);
    res.status(500).json({
      message: "Some internal server error has happened when inserting ticket"
    })
  }
}

// updateTicket should only can be edited by:
// 1. User who created the ticket
// 2. Engineer who is assigned
// 3. Admin
exports.updateTicket = async (req, res) => {
  // ticket id passed in the path param should have been validated in the MW
  // fetch the ticket
  const ticket = await Ticket.findOne({ _id: req.params.id })

  // update the ticket
  ticket.title = req.body.title != undefined ? req.body.title : ticket.title
  ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority
  ticket.description = req.body.description != undefined ? req.body.description : ticket.description
  ticket.status = req.body.status != undefined ? req.body.status : ticket.status
  ticket.reporter = req.body.reporter != undefined ? req.body.reporter : ticket.reporter
  ticket.assignee = req.body.assignee != undefined ? req.body.assignee : ticket.assignee

  // save the fetched ticket in the database
  const updatedTicket = await ticket.update()

  // return the response
  res.status(200).send(updatedTicket)
}

// getAllTicket returns a list of all tickets
// For:
// 1. Admin: Return all tickets
// 2. Engineer: Return all tickets assigned to them. 
// 3. User: Get all tickets created by them.
exports.getAllTicket = async (req, res) => {
  try {
    let queryObj = {}
    if (req.userType == constants.userTypes.engineer) {
      queryObj = { $or: [{ reporter: req.userId }, { assignee: req.userId }] }
    } else {
      queryObj = { userId: req.userId }
    }
    const tickets = await Ticket.find(queryObj)

    return res.status(200).send(tickets);
  } catch (err) {
    console.log("Error while fetching tickets", err.message);
  }
}

exports.getOneTicket = async (req, res) => {
  try {
    const ticket = await Ticket.find({ _id: req.params.id })
    return res.status(200).send(ticket);
  } catch (err) {
    console.log("Error while fetching tickets", err.message);
  }
}
