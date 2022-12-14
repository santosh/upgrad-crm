const Ticket = require("../models/ticket.model")
const User = require("../models/user.model")
const constants = require("../utils/constants")

// Assign engineer with least assigned ticket
exports.create = async (req, res) => {
  // read the ticket input
  const ticketObj = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    reporter: req.userId,
  }

  // find approved enginners; sort them by no of tickesAssigned; get first
  const engineer = await User.findOne({
    userType: constants.userTypes.engineer,
    userStatus: constants.userStatuses.approved
  }).sort({
    "ticketsAssigned": 1
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

    engineer.ticketsAssigned.push(ticketCreated._id)
    engineer.save()
    res.status(201).json(ticketResp)

  } catch (err) {
    console.log("Error while creating a new ticket", err.message);
    res.status(500).json({
      message: "Some internal server error has happened when creating ticket"
    })
  }
}

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
    const updatedTicket = await ticket.save()

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
exports.getAllTicket = async (req, res) => {
  try {
    const queryObj = {};

    if (req.query.status != undefined) {
      queryObj.status = req.query.status;
    }
    const savedUser = await User.findOne({
      userID: req.userId
    });

    if (savedUser.userType == constants.userTypes.admin) {
      //Do nothing
    } else if (savedUser.userType == constants.userTypes.engineer) {
      queryObj.assignee = req.userId;
    } else {
      queryObj.reporter = req.userId;
    }

    const tickets = await Ticket.find(queryObj);
    res.status(200).send(tickets);
  } catch (err) {
    console.log("Error while fetching tickets", err.message);
    res.status(500).json({
      message: "Some internal server error has happened when fetching tickets"
    })
  }
}

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id })
    if (!ticket) {
      return res.status(404).send({ message: "ticket not found" })
    }
    return res.status(200).send(ticket);
  } catch (err) {
    console.log("Error while fetching ticket", err.message);
    res.status(500).json({
      message: "Some internal server error has happened when fetching ticket"
    })
  }
}
