const { Router } = require("express")

const {
    createStore, 
    getAllStore,
	updateStore,
	deleteStore,
} = require("~/controllers/store.controller")


const router = Router();

router
	.route("/")
	.post(createStore)
	.get(getAllStore);


router
	.route("/:id")
	.put(updateStore)
	.delete(deleteStore);

module.exports = router;