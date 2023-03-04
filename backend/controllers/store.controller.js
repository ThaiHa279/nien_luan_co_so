const StoreModel = require('~/models/store.model');

class StoreController {
    async createStore(req, res) {
        try{
            const name = req.body.name;
            const phone = req.body.phone;
            const address = req.body.address;

			await StoreModel.create({
				name,
                phone, 
                address,
			});
			return res
				.status(200)
				.json({ message: "Create STORE successfully!" }); 
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async getAllStore(req, res) {
        try{
            const stores = await StoreModel.findAll();
            return res
                .status(200)    
                .json(stores);
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async updateStore(req, res) {
        try{
            const data = req.body;
            const id = req.params.id;
            await StoreModel.update( data, {
                where: {id}
            });
            return res
                .status(200)
                .send({message:'Update successfully!'})
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async deleteStore(req, res) {
        try{
            const id = req.params.id;
            console.log(id)
            await StoreModel.destroy({
                where: {id}
            })
            return res
                .status(200)
                .send({message:'Delete STORE successfully!'})
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
}

module.exports = new StoreController();