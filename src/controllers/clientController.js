import Client from "../models/clientSchema.js";
import Contact from "../models/contactSchema.js";
import Address from "../models/addressSchema.js";

//READ
const getClientAll = async (req, res) => {
  try {
    const clients = await Client.find().populate({
      path: "contacts",
      select: "email telephone address",
      populate: {
        path: "address",
        model: "Address",
      },
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
      CPF: req.body.CPF,
    });
    const savedClient = await newClient.save();

    // Agora, crie os contatos e associe-os ao cliente
    const contactIds = [];
    for (const contactData of req.body.contacts) {
      const newAddress = new Address({
        state: contactData.address.state,
        city: contactData.address.city,
        neighborhood: contactData.address.neighborhood,
        street: contactData.address.street,
        number: contactData.address.number,
        complement: contactData.address.complement,
      });

      const savedAddress = await newAddress.save();

      const newContact = new Contact({
        email: contactData.email,
        telephone: contactData.telephone,
        address: savedAddress._id,
      });

      const savedContact = await newContact.save();
      contactIds.push(savedContact._id);
    }

    // Associe os IDs dos contatos ao cliente
    savedClient.contacts = contactIds;
    await savedClient.save();

    // Use populate para obter os detalhes completos dos contatos
    const clientePopulado = await Client.populate(savedClient, "contacts");
    const addressPopulate = await Address.populate(
      savedClient,
      "contacts.address"
    );

    res.status(201).send({
      message: "Client Created",
      statusCode: 201,
      data: clientePopulado,
      addressData: addressPopulate,
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

export default {
  getClientAll,
  updateClientById,
  removeClientById,
  createClient,
};
