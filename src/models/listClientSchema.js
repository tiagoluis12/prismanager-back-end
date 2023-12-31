import mongoose from "mongoose";

const listClientSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client", // Referência ao modelo Client
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
});

export default mongoose.model("ListClient", listClientSchema);
