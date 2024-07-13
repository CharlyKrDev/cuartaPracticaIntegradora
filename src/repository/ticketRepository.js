import ticketModel from "../data/models/ticket.model.js";

class TicketRepository {
  async createTicket(amount, purchaser) {
    const newTicket = new ticketModel({ amount, purchaser });
    return await newTicket.save();
  }
}

export default new TicketRepository();
