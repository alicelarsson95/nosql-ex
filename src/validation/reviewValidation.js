import Joi from 'joi';

// Valideringsschema för att skapa en ny recension
export const reviewValidation = Joi.object({
  movieId: Joi.string().required(),
  userId: Joi.string(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(500)
});

// Valideringsschema för att uppdatera en befintlig recension
export const updateReviewValidation = Joi.object({
  rating: Joi.number().min(1).max(5),
  comment: Joi.string().max(500)
});