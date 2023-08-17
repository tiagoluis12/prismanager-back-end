import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    CPF: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    celular: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
    cidade: {
      type: String,
      required: true,
    },
    bairro: {
      type: String,
      required: true,
    },
    rua: {
      type: String,
      required: true,
    },
    numero: {
      type: String,
      required: true,
    },
    complemento: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("client", clientSchema);