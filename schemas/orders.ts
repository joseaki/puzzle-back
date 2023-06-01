import mongoose from "mongoose";

// Define a schema
const { Schema } = mongoose;

const OrderSchema = new Schema({
  rate: Number,
  username: String,
  products: Array,
  state: String,
});

export const Order = mongoose.model("Order", OrderSchema);
