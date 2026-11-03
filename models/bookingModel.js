import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'BOoking must belong to a Tour!']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'BOoking must belong to a User!']
    },
    price: {
        type: Number,
        required: [true, 'Booking must have a price']
    },
    razorpayOrderId: {
        type: String,
        unique: true,
        sparse: true
    },
    razorpayPaymentId: {
        type: String,
        unique: true,
        sparse: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    paid: {
        type: Boolean,
        default: true
    }
});

bookingSchema.pre(/^find/, function () {
    this.populate('user').populate({
        path: 'tour',
        select: 'name'
    })
})

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
