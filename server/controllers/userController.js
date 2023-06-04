const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, UserInfo, Basket, BasketProduct } = require("../models/models");
const sequelize = require("../db");
const models = require("../models/models");
const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

let idUser = 8;

class UserController {
  async registration(req, res, next) {
    const { email, password, role, userName } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Некоректний email або password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Користувач з таким email вже зареєстрований!")
      );
    }
    const hashPassword = await bcrypt.hash(password, 7);

    const user = await User.create({ email, role, password: hashPassword });
    const token = generateJwt(user.id, user.email, user.role);
    idUser = user.id;
    const basket = await Basket.create({ userId: idUser });
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("Користувач відсутній"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Помилковий пароль"));
    }

    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    idUser = req.user.id;
    return res.json({ token });
  }

  async getBasket(req, res) {
    const basket = await sequelize.query(
      `SELECT *
        FROM products
        INNER JOIN basket_products ON products.id = basket_products."basketId"
        where basket_products."basketId" = :status`,
      {
        replacements: { status: idUser },
      }
    );
    return res.json(basket[0]);
  }

  async getCheckBasket(req, res) {
    const { id } = req.params;
    const basket = await sequelize.query(
      `SELECT *
        FROM basket_products
        where basket_products."basketId" = :basketId 
        and basket_products."productId" = :productId`,
      {
        replacements: { productId: id, basketId: idUser },
      }
    );
    return res.json(basket[0]);
  }

  async addBasket(req, res) {
    const { id } = req.params;

    console.log(id);
    console.log(idUser, "idUser");
    const basket = await BasketProduct.create({
      basketId: idUser,
      productId: id,
    });
    return res.json(basket);
  }

  async dellBasket(req, res) {
    const { id } = req.params;
    console.log(id);
    console.log(idUser, "idUser");
    const basket = await BasketProduct.destroy({
      where: {
        basketId: idUser,
        productId: id,
      },
    });
    return res.json(basket);
  }
}

module.exports = new UserController();
