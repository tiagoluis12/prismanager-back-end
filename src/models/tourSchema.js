import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  benefits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Benefit",
    },
  ],
});

export default mongoose.model("Tour", tourSchema);
