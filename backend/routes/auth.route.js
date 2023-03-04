const { Router } = require("express");

const AuthController = require("~/controllers/auth.controller")
const AuthMiddleware = require("~/middlewares/auth.middleware")

const router = Router();

router.get(
    "/",
    AuthMiddleware,
    (req, res) => {
        return res.status(200).json("This is main page.")
    }
);
router.post("/register", AuthController.register); 
router.post("/login", AuthController.login); 

module.exports = router;