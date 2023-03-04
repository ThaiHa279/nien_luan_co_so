const { Router } = require("express")

const {
	createMaterialType,
	updateMaterialDetails,
    createMaterial, 
    getAllMaterial,
	updateMaterial,
	deleteMaterial,
} = require("~/controllers/material.controller")

// const AdminMiddleware = require("~/middlewares/admin.middleware");

const router = Router();

router
	.route("/")
	.post(createMaterial)
	.get(getAllMaterial);

router
	.route("/type")
	.post(createMaterialType)
	.get(getAllMaterial);

router
	.route("/details")
	.put(updateMaterialDetails)
	.get(getAllMaterial);

module.exports = router;