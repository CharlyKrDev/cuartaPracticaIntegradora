import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        default: () => uuidv4().replace(/-/g, ''),
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
    purchaseDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchaseDetail'
    }]
}, { timestamps: true })

const ticketModel = mongoose.model('Ticket', ticketSchema)

export default ticketModel
