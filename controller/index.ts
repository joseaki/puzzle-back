import express from "express";
import { getProducts } from "../services/products";
import {
  addProduct,
  deleteShoppingCart,
  getAllOrders,
  payShoppingCart,
  rateOrder,
  removeProductFromOrder,
} from "../services/orders";
import { createUser, login } from "../services/user";
import { authentication } from "../middleware/authentication";

const routes = express.Router();

routes.get("/products", getProducts);
routes.post("/users/signup", createUser);
routes.post("/users/login", login);
routes.use(authentication);
routes.post("/orders/addToCart", addProduct);
routes.post("/orders/payCart", payShoppingCart);
routes.get("/orders", getAllOrders);
routes.delete("/orders/:id/removeItem", removeProductFromOrder);
routes.delete("/orders/deleteShoppingCart", deleteShoppingCart);
routes.patch("/orders/:id/rate", rateOrder);

export default routes;
