const axios = require("axios");
const client_ID = process.env.CLIENT_ID;
const { Product, Cart } = require("../models/index");
const midtransClient = require("midtrans-client");

class ProductController {
  static async getDataAPI(req, res, next) {
    try {
      const { data } = await axios({
        url: `https://api.simkl.com/anime/best/?${client_ID}`,
        method: "GET",
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getProduct(req, res, next) {
    try {
      let data = await Product.findAll({});
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addCart(req, res, next) {
    try {
      let { id } = req.params;
      let { id: UserId } = req.user;
      let added = await Product.findByPk(id);
      if (!added) {
        throw { name: "Not_found", id };
      }
      let checkCart = await Cart.findOne({
        where: { UserId, ProductId: id },
      });
      if (checkCart) {
        throw { name: "Already exists" };
      }
      let dataCart = await Cart.create({ UserId, ProductId: id });
      res.status(201).json(dataCart);
    } catch (error) {
      next(error);
    }
  }
  static async readCart(req, res, next) {
    try {
      let { id: UserId } = req.user;
      let data = await Cart.findAll({
        where: { UserId },
        include: { model: Product },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async deleteCart(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Cart.findByPk(id);
      await Cart.destroy({
        where: {
          id,
        },
      });
      if (!data) {
        throw { name: "Not_found" };
      }

      res.status(200).json({ message: `Your cart has been deleted` });
    } catch (error) {
      next(error);
    }
  }
  static async payment(req, res, next) {
    try {
      const findBookedProduct = await Cart.findAll({
        where: {
          UserId: req.user.id,
        },
        include: Product,
      });
      let totalPrice = 0;
      findBookedProduct.forEach((el) => {
        totalPrice += el.Product.price;
      });
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-CQEHErEGAJ5ztBQ2qbu3ZMFK",
      });

      let parameter = {
        transaction_details: {
          order_id: "YOUR-ORDERID-" + Math.floor(10 + Math.random() * 560),
          gross_amount: totalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json({
        token: midtransToken.token,
        redirect_url: midtransToken.midtransToken,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductController;
