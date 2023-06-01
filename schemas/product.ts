import mongoose from "mongoose";

// Define a schema
const { Schema } = mongoose;

const ProductSchema = new Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

export const Product = mongoose.model("Product", ProductSchema);
