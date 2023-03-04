const { Router } = require("express")

const {
    createBill, 
    getAllBill,
	updateBill,
	deleteBill,
} = require("~/controllers/bill.controller")


const router = Router();

router
	.route("/")
	.post(createBill)
	.get(getAllBill);


router
	.route("/:id")
	.put(updateBill)
	.delete(deleteBill);

module.exports = router;