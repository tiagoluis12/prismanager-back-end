import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  state: {
    type: String,
  },
  color: {
    type: String,
  },
});

export default mongoose.model("Status", statusSchema);
