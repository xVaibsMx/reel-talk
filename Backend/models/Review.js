import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  title: String,
  content: String,
  rating: Number,
});
