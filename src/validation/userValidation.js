import Joi from 'joi';

// Valideringsschema för registrering av ny användare
export const registerValidation = Joi.object({
  username: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(60).regex(/^(?=.*[A-Z])(?=.*\d).+$/).required(),
  role: Joi.string().valid('user', 'admin').default('user') 
});
