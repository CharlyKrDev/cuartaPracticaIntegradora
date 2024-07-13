import mongoose from 'mongoose';

const purchaseDetailSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
    }
}, { timestamps: true });

const purchaseDetailModel = mongoose.model('PurchaseDetail', purchaseDetailSchema);

export default purchaseDetailModel;
