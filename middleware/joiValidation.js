import Joi from 'joi';

export const joiValidateUser = async (req, res, next) => {
  const passwordRules = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
  const emailRules =
    /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u;
  const letterRegex = /^[A-Za-z\s]+$/;
  const letterNumberRegex = /^[A-Za-z0-9\s]+$/;

  const joiUserSchema = Joi.object({
    firstName: Joi.string().max(25).pattern(letterRegex).required(),
    lastName: Joi.string().max(25).pattern(letterRegex).required(),
    profileImg: Joi.string(),
    markerColor: Joi.string().required(),
    favouriteVehicle: Joi.string().max(50).pattern(letterNumberRegex),
    bio: Joi.string().max(400),
    email: Joi.string().max(70).pattern(new RegExp(emailRules)).required(),
    password: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp(passwordRules))
      .required(),
  });
  const { error } = joiUserSchema.validate(req.body);
  if (error) {
    console.log(error.message);
    res
      .status(400)
      .send({ error: 'Form Invalid, please correct and try again.' });
  } else {
    next();
  }
};

export const joiValidateUserUpdate = (req, res, next) => {
  const passwordRules = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
  const emailRules =
    /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u;
  const letterRegex = /^[A-Za-z\s]+$/;
  const letterNumberRegex = /^[A-Za-z0-9\s]+$/;

  const joiUserSchema = Joi.object({
    firstName: Joi.string().max(25).pattern(letterRegex).required(),
    lastName: Joi.string().max(25).pattern(letterRegex).required(),
    profileImg: Joi.object().allow(''),
    markerColor: Joi.string().required(),
    favouriteVehicle: Joi.string().max(50).pattern(letterNumberRegex),
    bio: Joi.string().max(400),
    email: Joi.string().max(70).pattern(new RegExp(emailRules)).required(),
    currentPassword: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp(passwordRules))
      .required(),
    newPassword: Joi.string().min(8).max(50).pattern(new RegExp(passwordRules)),
    id: Joi.string().alphanum().required(),
  });
  const { error } = joiUserSchema.validate(req.body);
  if (error) {
    console.log(error.message);
    res
      .status(400)
      .send({ message: 'Form Invalid, please correct and try again.' });
  } else {
    next();
  }
};

export const joiValidateLogin = (req, res, next) => {
  const emailRules =
    /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u;
  const passwordRules = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;

  const joiUserSchema = Joi.object({
    email: Joi.string().max(70).pattern(new RegExp(emailRules)).required(),
    password: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp(passwordRules))
      .required(),
  });
  const { error } = joiUserSchema.validate(req.body);
  if (error) {
    console.log(error.message);
    res
      .status(400)
      .send({ error: 'Form Invalid, please correct and try again.' });
  } else {
    next();
  }
};

export const joiValidateVehicle = (req, res, next) => {
  const letterNumberRegex = /^[A-Za-z0-9.\s]+$/;
  const letterRegex = /^[A-Za-z.\s]+$/;

  const joiVehicleSchema = Joi.object({
    _id: Joi.string(),
    year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .required(),
    manufacture: Joi.string().required(),
    model: Joi.string().max(50).pattern(letterNumberRegex).required(),
    urlName: Joi.string().required(),
    color: Joi.string().max(20).pattern(letterRegex).required(),
    yearPurchased: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear()),
    owner: Joi.object().required(),
    logo: Joi.string().required(),
    hq: Joi.string().required(),
    hqCoordinates: Joi.array().required(),
    horsepower: Joi.number().integer().min(1).max(2000),
    description: Joi.string().max(300),
    vehicleImg: Joi.object(),
  });
  const { error } = joiVehicleSchema.validate(req.body);

  if (error) {
    console.log(error.message);
    res
      .status(400)
      .send({ error: 'Form Invalid, please correct and try again.' });
  } else {
    next();
  }
};
