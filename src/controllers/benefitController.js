import benefitSchema from "../models/benefitSchema.js";

//READ
const getBenefitAll = (req, res) => {
  benefitSchema.find(function (err, benefits) {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(200).send(benefits);
  });
};

const createBenefit = async (req, res) => {
  try {
    const newBenefit = new benefitSchema(req.body);
    const savedBenefit = await newBenefit.save();

    res.status(201).send({
      message: "Benefit Created",
      statusCode: 201,
      data: savedBenefit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error.message,
    });
  }
};

export default {
  getBenefitAll,
  createBenefit,
};
