const { products } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  getData: async (req, res, next) => {
    try {
      const result = await products.findAll({
        where: req.query,
        attributes: {exclude: ["createdAt", "updatedAt"]},
        order: [["id", "ASC"]]
      });
      return res.status(200).send(result)
    } catch (err) {
      console.log(err);
      return res.status(500).send(err)
    }
  },
  addProduct: async (req, res, next) => {
    try {
      // Check user token
      let token = req.body.token;
      const accountData = jwt.verify(token, process.env.SCRT_TKN);
      if (accountData.role === "store") {
        await products.create({
          userid: accountData.id,
          name: req.body.name,
          price: req.body.price,
          image: req.body.image,
          description: req.body.description,
        });
        return res.status(201).send({
          success: true,
          message: "Add Product success"
        })
      } else {
        return res.status(400).send({
          success: false,
          message: "You are not a store. Access denied"
        })
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error)
    }
  },
}

