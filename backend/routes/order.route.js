const { Router } = require("express")

const {
    createOrder, 
    getAllOrder,
	updateOrder,
	deleteOrder,
} = require("~/controllers/order.controller")

// const = require("~/middlewares/admin.middleware");

const router = Router();

router
	.route("/")
	.post(createOrder)
	.get(getAllOrder);


router
	.route("/:id")
	.put(updateOrder)
	.delete(deleteOrder);

module.exports = router;