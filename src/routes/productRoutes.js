import express from "express";
import { getProductsPage, createProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProductsPage);
router.post("/", createProduct);

export default router;
