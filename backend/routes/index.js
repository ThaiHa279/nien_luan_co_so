const { Router } =  require("express")
// const AdminMiddleware = require("~/middlewares/admin.middleware")
const AuthMiddleware = require("~/middlewares/auth.middleware")

const router = Router();

router.use("/auth", require("./auth.route"));

router.use(
    "/auth",
    AuthMiddleware,
    require("./user.route")
);

router.use(
    "/material",
    require('./material.route')
);

router.use(
    "/distributor",
    AuthMiddleware,
    require('./distributor.route')
);

router.use(
    "/order",
    AuthMiddleware,
    require('./order.route')
);

router.use(
    "/bill",
    AuthMiddleware,
    require('./bill.route')
);

router.use(
    "/store",
    AuthMiddleware,
    require('./store.route')
);

router.use(
    "/distributor",
    AuthMiddleware,
    require('./distributor.route')
);

module.exports = router;