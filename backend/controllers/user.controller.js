const UserModel = require("~/models/user.model")
const { hash } = require("~/utils/password.util")

class UserController {
    /**
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 */
    async createUser(req, res) {
        try {
            const username = req.body.username;
			const password = req.body.password;
            const seller = req.body.seller;

			await UserModel.create({
				username,
				password: hash(password), 
                seller,
			});
			return res
				.status(200)
				.json({ message: "Create user successfully!" });   
        } catch (error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
    /**
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 */
    async getAllUsers(req, res) {
        try {
            const users = await UserModel.findAll();
            users.map((user)=> {
                const {password, ...other} = user.toJSON();
                return {other};
            })
            return res
                .status(200)    
                .json(users);
        } catch (error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
    /**
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 */
    async getUser(req, res) {
        try {
            const id = req.params.id;
            const user = await UserModel.findOne({
                where: {id}
            });
            const {password, ...other} = user.toJSON();
            return res
                .status(200)
                .json(other);
        } catch (error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
    /**
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 */
    async updateUser(req, res) {
        try {
            const data = req.body;
            const id = req.params.id;
            await UserModel.update( data, {
                where: {id}
            });
            return res
                .status(200)
                .send({message:'Update successfully!'})
        } catch (error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
    /**
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 */
    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            console.log(id)
            await UserModel.destroy({
                where: {id}
            })
            return res
                .status(200)
                .send({message:'Delete user successfully!'})
        } catch (error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
}
module.exports = new UserController();