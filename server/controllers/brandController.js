const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brend = await Brand.create({ name });
    return res.json(brend);
  } 

  async getAll(req, res) {
    const brend = await Brand.findAll();
    return res.json(brend);
  }
}

module.exports = new BrandController();
