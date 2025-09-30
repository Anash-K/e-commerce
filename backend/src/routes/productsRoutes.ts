import express from "express";
import { getProducts } from "../controller/productController";

const productsRoutes = express.Router();

productsRoutes.get("/", getProducts);

export default productsRoutes;
