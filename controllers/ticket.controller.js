const Ticket = require("../models/ticket.model")
const User = require("../models/user.model")
const constants = require("../utils/constants")

// TODO: Assign engineer with least assigned ticket
exports.create = async (req, res) => {
  // read the ticket input
  const ticketObj = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    reporter: req.userId,
  }

  const engineer = await User.findOne({
    userType: constants.userTypes.engineer,
    userStatus: constants.userStatuses.approved
  })

  if (engineer) {
    ticketObj.assignee = engineer.userID
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
      createdAt: ticketCreated.createdAt,
      updatedAt: ticketCreated.updatedAt
    }
    res.status(201).json(ticketResp)

  } catch (err) {
    console.log("Error while creating a new ticket", err.message);
    res.status(500).json({
      message: "Some internal server error has happened when creating ticket"
    })
  }
}

// updateTicketById should only can be edited by:
// 1. User who created the ticket
// 2. Engineer who is assigned
// 3. Admin
exports.updateTicketById = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(`Error while updating ticket with id ${req.params.id}`, err.message);
    res.status(500).json({
      message: "Some internal server error has happened when updating ticket"
    })
  }
}

// getAllTicket returns a list of all tickets
// For:
// 1. Admin: Return all tickets
// 2. Engineer: Return all tickets assigned to them. 
// 3. User: Get all tickets created by them.
// TODO: Need to encode userType in jwt itself to prevent read from db.
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
    res.status(500).json({
      message: "Some internal server error has happened when fetching tickets"
    })
  }
}

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.find({ _id: req.params.id })
    return res.status(200).send(ticket);
  } catch (err) {
    console.log("Error while fetching ticket", err.message);
    res.status(500).json({
      message: "Some internal server error has happened when fetching ticket"
    })
  }
}
