import Order from "../models/orderSchema.js";
import Client from "../models/clientSchema.js";
import Status from "../models/statusSchema.js";

//READ
const getOrderAll = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "state", // Campo a ser preenchido com os detalhes do status
        model: "Status", // Nome do modelo do status
        select: "state", // Campo do status que você deseja retornar (state)
      })
      .exec();

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const createOrder = async (req, res) => {
  try {
    // Suponha que você tenha o ID do cliente disponível em req.body.clientId
    const clientId = req.body.client;

    // Verifique se o cliente com o ID fornecido existe
    let client = await Client.findById(clientId);

    if (!client) {
      console.log(`Cliente não encontrado com o ID: ${clientId}`);
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    // Criar a Order e associá-la ao cliente existente
    const newOrder = new Order({
      adults: req.body.adults,
      children: req.body.children,
      checkin: req.body.checkin,
      checkout: req.body.checkout,
      plane: req.body.plane,
      planeCost: req.body.planeCost,
      state: req.body.state,
      tours: req.body.tours,
      client: clientId,
    });

    const savedOrder = await newOrder.save();
    client = await Client.findById(clientId);
    client.order.push(savedOrder._id);
    await client.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getOrderAll,
  createOrder,
};
