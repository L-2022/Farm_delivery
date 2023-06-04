const uuid = require("uuid");
const path = require("path");
const { Product } = require("../models/models");
const ApiError = require("../error/ApiError");
const { where } = require("sequelize");
class ProductController {
  async create(req, res, next) {
    try {
      let { name, quantity, price, description, rating, typeId, farmId } =
        req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Product.create({
        name,
        quantity,
        price,
        description,
        rating,
        typeId,
        farmId,
        img: fileName,
      });

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let {brandId, typeId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let devices;
    if (!brandId && !typeId) {
        devices = await Product.findAndCountAll({limit, offset})
    }
    if (brandId && !typeId) {
        devices = await Product.findAndCountAll({where:{brandId}, limit, offset})
    }
    if (!brandId && typeId) {
        devices = await Product.findAndCountAll({where:{typeId}, limit, offset})
    }
    if (brandId && typeId) {
        devices = await Product.findAndCountAll({where:{typeId, brandId}, limit, offset})
    }
    return res.json(devices)
}

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Product.findOne({
      where: { id },
    });

    const data = [device];

    return res.json(data);
  }
}

module.exports = new ProductController();
