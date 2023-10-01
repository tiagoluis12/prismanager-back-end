import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  adults: {
    type: Number,
  },
  children: {
    type: Number,
  },
  checkin: {
    type: Date,
  },
  checkout: {
    type: Date,
  },
  plane: {
    type: Boolean,
  },
  planeCost: {
    type: Number,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  tours: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
    },
  ],
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

export default mongoose.model("Order", orderSchema);
