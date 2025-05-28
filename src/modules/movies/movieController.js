import Movie from "./movieModel.js";
import { movieValidation } from "../../validation/movieValidation.js";


export const createMovie = async (req, res) => {
  try {
    const { error } = movieValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newMovie = await Movie.create(req.body);
    res.status(201).json({
      message: "Movie created successfully",
      movie: newMovie,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

export const updateMovie = async (req, res) => {
  try {
    const { error } = movieValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

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

export const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

