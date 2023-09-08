import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
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
    type: boolean,
  },
  planeCost: {
    type: Number,
  },
  status: {
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

export default mongoose.model("Request", requestSchema);
