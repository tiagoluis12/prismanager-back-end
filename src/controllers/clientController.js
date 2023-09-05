import Client from "../models/clientSchema.js";
import Contact from "../models/contactSchema.js";

//READ
const getClientAll = async (req, res) => {
  try {
    const clients = await Client.find().populate({
      path: "contacts",
      select: "celular",
    });

    res.status(200).send(clients);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const createClient = async (req, res) => {
  try {
    // Primeiro, crie o cliente como você fez anteriormente
    const newClient = new Client({
      name: req.body.name,
    });

    const savedClient = await newClient.save();

    // Agora, crie os contatos e associe-os ao cliente
    const contactIds = [];
    for (const contactData of req.body.contacts) {
      const newContact = new Contact({
        celular: contactData.celular,
      });

      const savedContact = await newContact.save();
      contactIds.push(savedContact._id);
    }

    // Associe os IDs dos contatos ao cliente
    savedClient.contacts = contactIds;
    await savedClient.save();

    // Use populate para obter os detalhes completos dos contatos
    const clientePopulado = await Client.populate(savedClient, "contacts");

    res.status(201).send({
      message: "Client Created",
      statusCode: 201,
      data: clientePopulado,
    });
  } catch (error) {
    console.error(error);
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
    const updateClientById = await Client.findByIdAndUpdate(
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
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "Client deleted",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
}

async function removeAllData(req, res) {
  try {
    // Certifique-se de que a URL da conexão corresponda à sua configuração.
    await mongoose.connect("mongodb://localhost/seu-banco-de-dados", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Exclua a base de dados inteira
    await mongoose.connection.db.dropDatabase();

    res.status(200).send({
      message: "Base de dados excluída com sucesso",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  } finally {
    // Certifique-se de desconectar após a exclusão da base de dados
    mongoose.disconnect();
  }
}

export default {
  getClientAll,
  updateClientById,
  removeClientById,
  createClient,
  removeAllData,
};
