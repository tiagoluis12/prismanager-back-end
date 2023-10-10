import statusSchema from "../models/statusSchema.js";

//READ
const getStatusAll = (req, res) => {
  statusSchema.find(function (err, contatos) {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(200).send(contatos);
  });
};

const createStatus = async (req, res) => {
  try {
    const newStatus = new statusSchema(req.body);
    const savedStatus = await newStatus.save();

    res.status(201).send({
      message: "Status Created",
      statusCode: 201,
      data: savedStatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error.message,
    });
  }
};

export default {
  getStatusAll,
  createStatus,
};
