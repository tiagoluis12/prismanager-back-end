import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  celular: {
    type: Number,
  },
});

export default mongoose.model("Contact", contactSchema);
