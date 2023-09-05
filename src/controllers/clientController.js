import ClientSchema from "../models/clientSchema.js";

//READ
const getClientAll = (req, res) => {
  ClientSchema.find()
    .populate()
    .exec(function (err, clients) {
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
    const savedClient = await newClient.save();

    //necessário criar um ID no schema de Contato

    res.status(201).send({
      message: "Client Created",
      statusCode: 201,
      data: savedClient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
};
// UPDATED
const updateClientById = async (req, res) => {
  try {
    //acess the id user and find the user on the database then update the user
    //findByIdAndUpdate() document id, information to update
    const updateClientById = await ClientSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    // send a response
    res.status(200).send({
      message: "Client updated",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

//DELETE
async function removeClientById(req, res) {
  try {
    await ClientSchema.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "Client deleted",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
}

export default {
  getClientAll,
  createClient,
  updateClientById,
  removeClientById,
};
