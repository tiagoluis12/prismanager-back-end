import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
    },
    contatos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contactSchema",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Clients", clientSchema);
