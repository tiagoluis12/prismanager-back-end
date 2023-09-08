import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Status", statusSchema);
