import Ticket from "../models/ticketModel.js";

export const createTicket = async(req,res) => {
    try {
        const ticket = req.body;
        const newTicket = new Ticket(ticket)
        const saved = await newTicket.save()
        res.status(201).json(saved)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getTickets = async(req,res) => {
    try {
        const tickets =await Ticket.find();
        if(tickets.length === 0){
            return res.status(404).json({ message :
                "No data Found"
            })
        }
        res.status(200).json(tickets)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getTicketById = async(req,res) => {
    try {
        const id = req.params.id
        const ticketExist = await Ticket.findById(id)
        if(!ticketExist){
            return res.status(201).json({message : "Ticket does not exist"})
        }       
        res.status(200).json(ticketExist)       
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const updateTicket = async (req, res) => {
  try {
    const { status, comment } = req.body;

    let updateFields = {};

    if (status) {
      updateFields.status = status;
    }

    if (comment) {
      updateFields.$push = { comments: comment };
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);

    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
