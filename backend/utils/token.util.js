const jwt = require("jsonwebtoken");

const config = require("~/config");

const TokenUtil = {
	sign(data) {
		return jwt.sign(data, config.security.jwtSecret);
	},
	
	verify(token, callback) {
		return jwt.verify(token, config.security.jwtSecret , callback);
	},
};

module.exports = TokenUtil;
