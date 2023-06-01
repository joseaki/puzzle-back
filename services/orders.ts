import { Request, Response } from "express";
import { Order } from "../schemas/orders";
import { Product } from "../schemas/product";
import mongoose from "mongoose";

export const addProduct = async (req: Request, res: Response) => {
  const { id } = req.body;
  const username = res.locals.username;
  const orderPromise = Order.findOne({
    username,
    state: "Active",
  }).exec();
  const productPromise = Product.findOne({
    id,
  });

  const [order, product] = await Promise.all([orderPromise, productPromise]);

  if (!order) {
    await Order.create({
      username,
      state: "Active",
      products: [product],
    });
    return res.json({ success: true });
  }

  await Order.findOneAndUpdate(
    {
      username,
      state: "Active",
    },
    {
      $push: { products: product },
    }
  ).exec();

  return res.json({ success: true });
};

export const payShoppingCart = async (req: Request, res: Response) => {
  const username = res.locals.username;
  await Order.findOneAndUpdate(
    {
      username,
      state: "Active",
    },
    {
      state: "Completed",
    }
  ).exec();

  return res.json({ success: true });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const username = res.locals.username;

  const orders = await Order.find({
    username,
  })
    .select("state products id rate")
    .exec();

  return res.json(orders);
};

export const removeProductFromOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const username = res.locals.username;

  const orders = await Order.findOneAndUpdate(
    {
      username,
      state: "Active",
    },
    {
      $pull: {
        products: {
          id,
        },
      },
    }
  ).exec();

  return res.json(orders);
};

export const deleteShoppingCart = async (req: Request, res: Response) => {
  const username = res.locals.username;
  await Order.deleteOne({
    username,
    state: "Active",
  }).exec();

  return res.json({ success: true });
};

export const rateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rate } = req.body;
  const username = res.locals.username;
  await Order.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(id),
      username,
      state: "Completed",
    },
    {
      rate: rate,
    }
  ).exec();

  return res.json({ success: true });
};
