require("dotenv").config();
const PORT = process.env.PORT || 2000;
const express = require("express");
const app = express();
const cors = require("cors");
const bearerToken = require("express-bearer-token");

app.use(cors());
app.use(express.json()); // untuk menangkap request body
app.use(bearerToken()); // untuk menangkap token dari request header

app.get("/", (req, res) => {
  return res.status(200).send("<h1>API RUNNING</h1>")
});

// Define Router
const { accountsRouter, productsRouter } = require("./routers")
app.use("/account", accountsRouter);
app.use("/product", productsRouter);

app.listen(PORT, () => {
  console.log(`API RUNNING ON PORT ${PORT}`);
});