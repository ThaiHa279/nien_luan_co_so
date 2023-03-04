const UserModel = require("~/models/user.model");
const { compare } = require("~/utils/password.util");
const { sign } = require("~/utils/token.util");
const { hash } = require("~/utils/password.util");

class AuthController {

	async login(req, res) {
		try { 
			const username = req.body.username;
			const user = await UserModel.findOne({
				where: { username }, 
			});
			if (!user) 
				throw new Error(
					"Account not exist!"
				);
			
			const isValidPassword = compare(
				req.body.password, user.password
			); 
			if (!isValidPassword) 
				throw new Error(
					"Wrong password!"
				);
				
				if (isValidPassword && user) {
					const accessToken = sign(user.dataValues);
					
					const {password, ...others} = user.dataValues;
					return res
					.status(200)
					.json({...others, accessToken });
			}
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	}
	async register(req, res) {
		try{ 
			const name = req.body.name;
			const username = req.body.username;
			const password = req.body.password;

			await UserModel.create({
				name,
				username,
				password: hash(password)
			});
			return res
				.status(200)
				.json({ message: "Create user successfully!" });
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	}
}

module.exports = new AuthController();
