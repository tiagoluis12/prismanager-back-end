import UserSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;
const authHeader = request.get("authorization");

//READ
const getAll = (req, res) => {
  const authHeader = req.get("authorization");
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("header error");
  }

  jwt.verify(token, SECRET, (error) => {
    if (error) {
      return res.status(401).send("Not Authorized");
    }
  });

  UserSchema.find(function (err, users) {
    if (err) {
      res.status(500).send({ message: err.nessage });
    }
    res.status(200).send(users);
  });
};

//CREATE new users
const createUser = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  try {
    const newUser = new UserSchema(req.body);
    const savedUser = await newUser.save();

    res.status(201).send({
      message: "New user created",
      statusCode: 201,
      data: savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

// UPDATED
const updateUserById = async (req, res) => {
  try {
    //acess the id user and find the user on the database then update the user
    //findByIdAndUpdate() document id, information to update
    const updatedUser = await UserSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    // send a response
    res.status(200).send({
      message: "User updated",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

//DELETE
const deleteUserById = async (req, res) => {
  try {
    await UserSchema.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "User deleted",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export default {
  getAll,
  createUser,
  updateUserById,
  deleteUserById,
};
