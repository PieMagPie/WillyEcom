import { getPool, sql } from "../config/db.js";

export const getProductsPage = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Products");
    res.render("products", { products: result.recordset });
  } catch {
    res.status(500).send("Database not available");
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const pool = await getPool();

    await pool.request()
      .input("Name", sql.NVarChar, name)
      .input("Description", sql.NVarChar, description)
      .input("Price", sql.Decimal(10,2), price)
      .query("INSERT INTO Products (Name, Description, Price) VALUES (@Name, @Description, @Price)");

    res.redirect("/products");
  } catch {
    res.status(500).send("Database not available");
  }
};
