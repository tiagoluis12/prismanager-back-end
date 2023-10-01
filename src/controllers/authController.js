import UserSchema from "../models/userSchema.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;

const login = (req, res) => {
  try {
    UserSchema.findOne({ email: req.body.email }, (error, user) => {
      if (!user) {
        return res
          .status(401)
          .send({ message: "User not found", email: `${req.body.email}` });
      }

      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(401).send({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user._id }, SECRET);

      res.status(200).send({ message: "Login authorized", token });
    });
  } catch (e) {
    console.log.error(e);
  }
};

const logout = (req, res) => {
  const token = req.headers.authorization; // Assuming the token is passed in the headers

  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  // Remove the token from the list of active tokens
  const index = activeTokens.indexOf(token);
  if (index !== -1) {
    activeTokens.splice(index, 1);
  }

  res.status(200).send({ message: "Logout successful" });
};

export default { login, logout };
