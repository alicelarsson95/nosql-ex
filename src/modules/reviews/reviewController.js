import Review from "./reviewModel.js";
import { reviewValidation, updateReviewValidation } from "../../validation/reviewValidation.js";
import { handleValidationError } from "../../utils/errorHandler.js";

export const createReview = async (req, res) => {
  try {
    const { error } = reviewValidation.validate(req.body);
    if (error) return handleValidationError(res, error);

    const newReview = await Review.create({
      ...req.body,
      userId: req.user.userId,
    });

    res.status(201).json({
      message: "Review created",
      review: newReview,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("movieId", "title").populate("userId", "username");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("movieId", "title")
      .populate("userId", "username");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { error } = reviewValidation.validate(req.body);
    if (error) return handleValidationError(res, error);

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Access denied: You can only update your own reviews" });
    }

    review.rating = req.body.rating;
    review.comment = req.body.comment;

    const updatedReview = await review.save();

    res.json({
      message: "Review updated",
      review: updatedReview,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Access denied: You can only delete your own reviews" });
    }

    await review.deleteOne();

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReviewsForMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.id }).populate("userId", "username");

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
