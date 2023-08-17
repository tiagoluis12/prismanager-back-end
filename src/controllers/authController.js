import UserSchema from "../models/userSchema";
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

      const token = jwt.sign({ name: user.name }, SECRET);

      res.status(200).send({ message: "Login not authorized", token });
    });
  } catch (e) {
    console.log.error(e);
  }
};

export default { login };
