const { Router } = require("express")

const {
    createGRN, 
    getAllGRN,
	updateGRN,
	deleteGRN,
} = require("~/controllers/GRN.controller")


const router = Router();

router
	.route("/")
	.post(createGRN)
	.get(getAllGRN);


router
	.route("/:id")
	.put(updateGRN)
	.delete(deleteGRN);

module.exports = router;