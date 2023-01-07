import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { User } from "../model/user.js";

import tryCatch from "../middleware/tryCatch.js";
import { isPhone, isPassword, isEmail } from "../utils/validation.js";

import Error from "../utils/error.js";

export const signup = tryCatch(async (req, res, next) => {
  let data = req.body;
  let { firstname, lastname, email, phone, password } = data;

  if (!firstname.match(/^[a-zA-Z]{2,20}$/)) {
    return next(new Error(`First Name only contain letters`, 400));
  }
  data.firstname = firstname[0].toUpperCase() + firstname.slice(1);

  if (!lastname.match(/^[a-zA-Z]{2,20}$/)) {
    return next(new Error(`Last Name only contain letters`, 400));
  }
  data.lastname = lastname[0].toUpperCase() + lastname.slice(1);
  if (!isPhone(phone)) {
    return next(new Error(`Please provide Indian valid number`, 400));
  }
  if (!isEmail(email)) {
    return next(new Error(`Email is not valid`, 400));
  }

  const isEmailUnique = await User.findOne({ email });
  if (isEmailUnique) {
    return next(new Error(`This email is already registered`, 400));
  }

  if (!isPassword(password)) {
    return next(
      new Error(`Password Suggestion : 8-15 digits contains !@#$%^&*`, 400)
    );
  }

  data.password = await bcrypt.hash(password, 12);

  const saveData = await User.create(data);
  return res.status(201).send({ success: true, data: saveData });
});

export const login = tryCatch(async (req, res, next) => {
  let logindata = req.body;
  let { email, password } = logindata;

  let user = await User.findOne({ email });
  if (!user) {
    return next(new Error("user not found", 404));
  }
  let validPassword = await bcrypt.compare(password, user.password);
  let token = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET || "asdjhgajfjkwehuigh12324"
  );

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .send({ status: true, data: { userId: user._id, token } });
});

export const getUser = tryCatch(async (req, res) => {
  const user = await User.findOne(req.user._id);
  if (!user) {
    return next(new Error(`user not found`, 404));
  }

  return res.status(200).send({
    success: true,
    data: user,
  });
});
