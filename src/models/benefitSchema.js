import mongoose from "mongoose";

const benefitSchema = new mongoose.Schema({
  Benefit: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Benefit", benefitSchema);
