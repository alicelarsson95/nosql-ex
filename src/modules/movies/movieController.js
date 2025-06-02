import Movie from "./movieModel.js";
import { movieValidation } from "../../validation/movieValidation.js";
import { handleValidationError } from "../../utils/errorHandler.js";

// Skapar en ny film efter validering av inskickad data
export const createMovie = async (req, res) => {
  try {
    const { error } = movieValidation.validate(req.body);
    if (error) return handleValidationError(res, error);

    const newMovie = await Movie.create(req.body);
    res.status(201).json({
      message: "Movie created successfully",
      movie: newMovie,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hämtar alla filmer från databasen
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hämtar en specifik film baserat på dess ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Uppdaterar en film baserat på ID och ny data
export const updateMovie = async (req, res) => {
  try {
    const { error } = movieValidation.validate(req.body);
    if (error) return handleValidationError(res, error);

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tar bort en film från databasen baserat på ID
export const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
