/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const StaffMiddleware = async (req, res, next) => {
	try {
		if (!req.user.staff)
			throw new Error("Permisson denied!");

		next();
	} catch (error) {
		return res.status(403).send({ message: error.message });
	}
};

module.exports = StaffMiddleware;
