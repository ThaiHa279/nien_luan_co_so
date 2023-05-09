const { Router } = require("express")

const {
	createMaterialType,
	updateMaterialDetails,
    createMaterial, 
    getAllMaterial,
	updateMaterial,
	getMaterialFollowType,
	getTypeMaterial,
} = require("~/controllers/material.controller")

// const AdminMiddleware = require("~/middlewares/admin.middleware");

const router = Router();

router
	.route("/")
	.post(createMaterial)
	.get(getAllMaterial);
	
router
	.route("/type")
	.get(getTypeMaterial);
router
	.route("/:id")
	.get(getMaterialFollowType);

router
	.route("/details")
	.put(updateMaterialDetails)
	.get(getAllMaterial);




module.exports = router;