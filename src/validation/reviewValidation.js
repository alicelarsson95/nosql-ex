import Joi from 'joi';

export const reviewValidation = Joi.object({
  movieId: Joi.string().required(),
  userId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(500)
});