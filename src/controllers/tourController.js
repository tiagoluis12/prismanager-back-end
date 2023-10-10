import benefitSchema from "../models/benefitSchema.js";
import Tour from "../models/tourSchema.js";

//READ
const getTourAll = async (req, res) => {
  try {
    const tours = await Tour.find()
      .populate({
        path: "benefits",
        model: "Benefit",
        select: "Benefit",
      })
      .exec();

    res.status(200).json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTour = async (req, res) => {
  try {
    console.log("req.body:", req.body); // Verifique o corpo da solicitação
    const benefitID = req.body.benefits;
    console.log("benefitID:", benefitID); // Verifique o valor de benefitID

    let benefit = await benefitSchema.findById(benefitID);
    if (!benefit) {
      console.log(`Benefício não encontrado com o ID: ${benefitID}`);
      return res.status(404).json({ message: "Benefício não encontrado" });
    }
    console.log("Benefício encontrado:", benefit);

    // Criar a Tour e associá-la ao benefit existente
    const newTour = new Tour({
      activity: req.body.activity,
      state: req.body.state,
      city: req.body.city,
      neighborhood: req.body.neighborhood,
      street: req.body.street,
      number: req.body.number,
      benefits: benefitID, // Associando o ID do benefício ao passeio
    });

    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTour = async (req, res) => {
  const { tourID } = req.params; // Obtém o ID do passeio a ser atualizado a partir dos parâmetros da rota

  try {
    const tourToUpdate = await Tour.findById(tourID);

    if (!tourToUpdate) {
      return res.status(404).json({ message: "Passeio não encontrado" });
    }

    // Atualiza apenas os campos fornecidos no corpo da solicitação
    const updatedFields = req.body;
    for (const field in updatedFields) {
      tourToUpdate[field] = updatedFields[field];
    }

    const updatedTour = await tourToUpdate.save();
    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getTourAll,
  createTour,
  updateTour,
};
