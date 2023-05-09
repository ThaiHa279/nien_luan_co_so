const GRNModel = require('~/models/grn.model');
const GRNDetailsModel = require('~/models/grn_detail.model');

class GRNController {
    async createGRN(req, res) {
        try{
            var id = 0;
            const staff_id = req.body.staff_id;
            const items = req.body.items; 
            const store_id = req.body.store_id;
            
			await GRNModel.create({
                staff_id: staff_id,
                store_id: store_id
			}).then(result => id = result.id);


            await items.map(async(item) => {
                await GRNDetailsModel.create({
                    material_id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    grn_id: id
                })
            })
            
			return res
				.status(200)
				.json({ 
                    message: "Create Goods Received Node successfully!",
                }); 
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