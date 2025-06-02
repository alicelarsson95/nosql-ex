import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Mongoose-schema för användare
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlenght: 3,
      maxlenght: 25,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minlenght: 6,
      maxlenght: 60,
      match: /^(?=.*[A-Z])(?=.*\d).+$/,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Hashar lösenordet automatiskt innan det sparas i databasen
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Exporterar modellen för användare
const User = mongoose.model("User", userSchema);
export default User;
