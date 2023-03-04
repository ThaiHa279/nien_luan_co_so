const { verify } = require("~/utils/token.util");
const TokenUtil = require("~/utils/token.util");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const AuthMiddleware = async (req, res, next) => {
	try {
		const token = req.headers.authorization; 
        if (token) {
            const accessToken = token.split(' ')[1]; 
			verify(accessToken, (err, user) => {
				if (err) {
					throw new Error("Token is not valid");
				}
				req.user = user;
				next();
			})
        }
        else 
           throw new Error("You are not authenticated");
        
	} catch (error) {
		res.status(401).send({ message: error.message });
	}
};

module.exports = AuthMiddleware;
