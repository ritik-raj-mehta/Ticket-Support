import express from "express";
import { createTicket, deleteTicket, getTicketById, getTickets, updateTicket } from "../controllers/ticketController.js";

const routerTicket = express.Router()

routerTicket.post("/create", createTicket)
routerTicket.get("/alltickets", getTickets)
routerTicket.get("/ticket/:id", getTicketById)
routerTicket.delete("/delete/:id",deleteTicket)
routerTicket.patch("/update/:id",updateTicket)

export default routerTicket