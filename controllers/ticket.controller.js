const User = require("../models/user.model")

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
    const ticketCreated = await User.create(userObj)

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
