import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  telephone: {
    type: Number,
    require: true,
  },
  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
});

export default mongoose.model("Contact", contactSchema);
