const DistributorModel = require('~/models/distributor.model');

class DistributorController {
    async createDistributor(req, res) {
        try{
            const name = req.body.name;
            const phone = req.body.phone;
            const address = req.body.address;

			await DistributorModel.create({
				name,
                phone, 
                address,
			});
			return res
				.status(200)
				.json({ message: "Create DISTRIBUTOR successfully!" }); 
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async getAllDistributor(req, res) {
        try{
            const distributors = await DistributorModel.findAll();
            return res
                .status(200)    
                .json(distributors);
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async updateDistributor(req, res) {
        try{
            const data = req.body;
            const id = req.params.id;
            await DistributorModel.update( data, {
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

    async deleteDistributor(req, res) {
        try{
            const id = req.params.id;
            console.log(id)
            await DistributorModel.destroy({
                where: {id}
            })
            return res
                .status(200)
                .send({message:'Delete DISTRIBUTOR successfully!'})
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
}

module.exports = new DistributorController();