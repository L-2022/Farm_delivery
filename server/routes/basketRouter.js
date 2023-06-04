const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.get("/", userController.getBasket);
router.get("/chekbasket/:id", userController.getCheckBasket);
router.post("/add/:id", userController.addBasket);
router.delete("/dell/:id", userController.dellBasket);

module.exports = router;
