import contactSchema from "../models/contactSchema.js";

//READ
const getContactAll = (req, res) => {
  contactSchema.find(function (err, contatos) {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(200).send(contatos);
  });
};

const createContact = async (req, res) => {
  try {
    const newContact = new contactSchema(req.body);
    const savedContact = await newContact.save();

    res.status(201).send({
      message: "Contact Created",
      statusCode: 201,
      data: savedContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
};

export default {
  getContactAll,
  createContact,
};
