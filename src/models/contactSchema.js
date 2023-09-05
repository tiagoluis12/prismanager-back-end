import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clientSchema",
    required: true,
  },
  celular: {
    type: Number,
  },
});

export default mongoose.model("Contacts", contactSchema);
