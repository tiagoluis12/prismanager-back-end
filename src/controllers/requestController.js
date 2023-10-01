import Client from "../models/clientSchema.js";
import Status from "../models/statusSchema.js";
import Tour from "../models/tourSchema.js";
import Benefit from "../models/benefitSchema.js";
import user from "../models/userSchema.js";

//READ
const getRequestAll = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate({
        path: "client",
        select: "name CPF",
      })
      .populate({
        path: "status",
        select: "state color",
      })
      .populate({
        path: "tours",
        select: "activity state city neighborhood street number",
        populate: {
          path: "benefits",
          select: "Benefit Cost",
        },
      })
      .populate({
        path: "user",
        select: "username email",
      });

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const createRequest = async (req, res) => {
  try {
    // Crie o cliente
    const newClient = new Client({
      name: req.body.name,
      CPF: req.body.CPF,
    });

    // Crie os contatos e associe-os ao cliente
    const contactPromises = req.body.contacts.map(async (contactData) => {
      const newContact = new Contact({
        email: contactData.email,
        telephone: contactData.telephone,
      });

      // Crie o endereço do contato e associe-o ao contato
      const newAddress = new Address({
        state: contactData.address.state,
        city: contactData.address.city,
        neighborhood: contactData.address.neighborhood,
        street: contactData.address.street,
        number: contactData.address.number,
      });

      const savedAddress = await newAddress.save();
      newContact.address = savedAddress._id;

      const savedContact = await newContact.save();
      return savedContact._id;
    });

    const contactIds = await Promise.all(contactPromises);
    newClient.contacts = contactIds;

    const savedClient = await newClient.save();

    // Use populate para obter os detalhes completos dos contatos
    const clientePopulado = await Client.populate(savedClient, "contacts");

    // Agora, vamos criar os benefícios associados ao cliente
    const benefitPromises = req.body.benefits.map(async (benefitData) => {
      const newBenefit = new Benefit({
        Benefit: benefitData.Benefit,
        Cost: benefitData.Cost,
      });

      const savedBenefit = await newBenefit.save();
      return savedBenefit._id;
    });

    const benefitIds = await Promise.all(benefitPromises);
    newClient.benefits = benefitIds;

    // Também podemos criar os status associados ao cliente
    const statusPromises = req.body.statuses.map(async (statusData) => {
      const newStatus = new Status({
        state: statusData.state,
        color: statusData.color,
      });

      const savedStatus = await newStatus.save();
      return savedStatus._id;
    });

    const statusIds = await Promise.all(statusPromises);
    newClient.statuses = statusIds;

    // E por fim, criar os passeios (tours) associados ao cliente
    const tourPromises = req.body.tours.map(async (tourData) => {
      const newTour = new Tour({
        activity: tourData.activity,
        state: tourData.state,
        city: tourData.city,
        neighborhood: tourData.neighborhood,
        street: tourData.street,
        number: tourData.number,
      });

      // Associe os IDs dos benefícios aos passeios
      newTour.benefits = benefitIds;

      const savedTour = await newTour.save();
      return savedTour._id;
    });

    const tourIds = await Promise.all(tourPromises);
    newClient.tours = tourIds;

    // Salve o cliente com as associações
    await newClient.save();

    res.status(201).json({
      message: "Client Created",
      statusCode: 201,
      data: clientePopulado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
// };

// // UPDATED
// const updateClientById = async (req, res) => {
//   try {
//     //acess the id user and find the user on the database then update the user
//     //findByIdAndUpdate() document id, information to update
//     const updateClientById = await Client.findByIdAndUpdate(
//       req.params.id,
//       req.body
//     );

//     // send a response
//     res.status(200).send({
//       message: "Client updated",
//       statusCode: 200,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: error.message });
//   }
// };

// //DELETE
// async function removeClientById(req, res) {
//   try {
//     await Client.findByIdAndDelete(req.params.id);
//     res.status(200).send({
//       message: "Client deleted",
//       statusCode: 200,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: error.message });
//   }
// }

export default {
  getRequestAll,
  createRequest,
};
