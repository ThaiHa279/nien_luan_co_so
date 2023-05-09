const { Router } = require("express")

const {
    getAllStatistic, saveStatistic, monthStatistic
} = require("~/controllers/statistic.controller")


const router = Router();

router
	.route("/")
	.get(getAllStatistic);

router
	.route("/:date")
	.get(monthStatistic);

router
	.route("/save")
	.get(saveStatistic);




module.exports = router;