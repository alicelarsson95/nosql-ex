import mongoose, { Schema } from "mongoose";

// Mongoose-schema för filmer
const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlenght: 100,
    },
    director: {
      type: String,
      required: true,
      trim: true,
      maxlenght: 50,
    },
    releaseYear: {
      type: Number,
      required: true,
      min: 1878,
      max: new Date().getFullYear() + 1,
    },
    genre: {
      type: String,
      required: true,
      enum: ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Thriller", "Other"],
    },
  },
  {
    timestamps: true,
  }
);

// Exporterar modellen för filmer
const Movie = mongoose.model('Movie', movieSchema);

export default Movie