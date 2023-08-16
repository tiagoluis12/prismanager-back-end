import ClientSchema from "../models/clientSchema.js";

//READ
const getClientAll = (req, res) => {
  ClientSchema.find(function (err, clients) {
    if (err) {
      res.status(500).send({ message: err.message });
    }

    res.status(200).send(clients);
  });
};

//CREATE  -  criar novos usuários
const createClient = async (req, res) => {
  try {

    const newClient = new ClientSchema(req.body);
    const savedClient = await newClient.save()

    res.status(201).send({
      "message": "Client Created",
      "statusCode": 201,
      "data": savedClient,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      "message": error.message,
    })
  }
};



export default {
  getClientAll,
  createClient,
};