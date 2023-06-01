import { Request, Response } from "express";
import { Product } from "../schemas/product";

let hasProducts = false;
export const getProducts = async (req: Request, res: Response) => {
  const { query = "", category, price } = req.query;
  if (!hasProducts) {
    const product = await Product.findOne({ id: 1 }).select("id").exec();
    if (!product) {
      const resp = await fetch("https://fakestoreapi.com/products", {
        headers: { "content-type": "application/json" },
      });
      const data = await resp.json();
      await Product.insertMany(data);
    }
  }
  hasProducts = true;

  let priceFilter: any = [];
  if (!isNaN(Number(query))) {
    priceFilter = [
      {
        price: Number(query),
      },
    ];
  }
  const [min = 0, max = Number.MAX_VALUE] = price
    ? (price as string).split(",")
    : [0, Number.MAX_VALUE];

  let listCategories: any[] = [{}];
  if (category) {
    const categories = (category as string).split(",");
    listCategories = categories.map((category) => ({
      category,
    }));
  }

  const products = await Product.find({
    $or: listCategories,
    $and: [
      {
        price: {
          $gte: Number(min),
          $lte: Number(max),
        },
      },
      {
        $or: [
          {
            title: {
              $regex: query,
              $options: "i",
            },
          },
          {
            category: {
              $regex: query,
              $options: "i",
            },
          },
          ...priceFilter,
        ],
      },
    ],
  })
    .select("id title price description category image rating")
    .exec();

  res.json(products);
};
