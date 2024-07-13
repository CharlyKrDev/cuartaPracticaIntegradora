import ticketModel from "../data/models/ticket.model.js";

class TicketRepository {
  async createTicket(ticketData) {
    try {
      const ticket = new ticketModel(ticketData);
      await ticket.save();
      return ticket;
    } catch (error) {
      throw new Error("Error creando el ticket: " + error.message);
    }
  }
}

export default new TicketRepository();
