const GRNModel = require('~/models/grn.model');
const GRNDetailsModel = require('~/models/grn_detail.model');

class GRNController {
    async createGRN(req, res) {
        try{
            const date = NOW;
   			await GRNModel.create({
                date,
			});
			return res
				.status(200)
				.json({ message: "Create GRN successfully!" });
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async getAllGRN(req, res) {
        try{
            const grns = await GRNModel.findAll();
            return res
                .status(200)    
                .json(grns);
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async updateGRN(req, res) {
        try{
            const data = req.body;
            const id = req.params.id;
            await GRNModel.update( data, {
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

    async deleteGRN(req, res) {
        try{
            const id = req.params.id;
            console.log(id)
            await GRNModel.destroy({
                where: {id}
            })
            return res
                .status(200)
                .send({message:'Delete GRN successfully!'})
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
}

module.exports = new GRNController();