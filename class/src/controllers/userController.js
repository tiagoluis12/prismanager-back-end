import UserSchema from "../models/userSchema.js";

//READ
const getAll = (req, res) => {
  UserSchema.find(function (err, users) {
    if (err) {
      res.status(500).send({ message: err.message });
    }

    res.status(200).send(users);
  });
};

//CREATE  -  criar novos usuários
const createUser = async (req, res) => {
  try {
    //acessar as informações do usuário no body da requisição

    //construo o novo usuário
    const newUser = new UserSchema(req.body);
    //salvo esse usuário no banco de dados
    const savedUser = await newUser.save()
    //envio uma resposta para a requisição
    res.status(201).send({
      "message": "User Created",
      "statusCode": 201,
      "data": savedUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      "message": error.message,
    })
  }
};


// // UPDATE
// const updateUserById = async(req, res)=>{
//   try{

//     const updatedUser = await UserSchema.findByIdAndUpdate(req.params.id, req.body);

//     //envia resposta
//     res.status(200)

//   }catch(error){
//     res.status(500).send({
//       message: error.message,
//     })
//   }
// };

export default {
  getAll,
  createUser,
  // updateUserById,
};