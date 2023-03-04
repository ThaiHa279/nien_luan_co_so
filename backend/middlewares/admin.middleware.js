// /**
//  *
//  * @param {import('express').Request} req
//  * @param {import('express').Response} res
//  * @param {Function} next
//  */
// const AdminMiddleware = async (req, res, next) => {
// 	try {
// 		if (!req.user.admin)
// 			throw new Error("Permisson denied!");

// 		next();
// 	} catch (error) {
// 		return res.status(403).send({ message: error.message });
// 	}
// };

// module.exports = AdminMiddleware;
