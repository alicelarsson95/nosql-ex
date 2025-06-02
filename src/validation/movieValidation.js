import Joi from 'joi';

// Valideringsschema för att skapa eller uppdatera en film
export const movieValidation = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  director: Joi.string().min(1).max(50).required(),
  releaseYear: Joi.number().min(1878).max(new Date().getFullYear() + 1).required(),
  genre: Joi.string().valid('Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Other').required()
});
