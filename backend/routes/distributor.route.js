const { Router } = require("express")

const {
    createDistributor, 
    getAllDistributor,
	updateDistributor,
	deleteDistributor,
} = require("~/controllers/distributor.controller")


const router = Router();

router
	.route("/")
	.post(createDistributor)
	.get(getAllDistributor);


router
	.route("/:id")
	.put(updateDistributor)
	.delete(deleteDistributor);

module.exports = router;