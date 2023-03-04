const { Router } = require("express");
const {
	getAllUsers,
	getUser,
	updateUser,
	createUser,
	deleteUser,
} = require("~/controllers/user.controller");
// const AdminMiddleware = require("~/middlewares/admin.middleware");

const router = Router();

router
	.route("/user")
	.post(createUser)
	.get(getAllUsers);


router
	.route("/user/:id")
	.get(getUser)
	.put(updateUser)
	.delete(deleteUser);

module.exports = router;