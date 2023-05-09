const { NOW } = require('sequelize');
const BillModel = require('~/models/bill.model');
const BillDetailsModel = require('~/models/bill_detail.model');

class BillController {
    async createBill(req, res) {
        try{
            var id = 0;
            const staff_id = req.body.staff_id;
            const items = req.body.items; 
            const store_id = req.body.store_id;
            const client_id = req.body.store_id;
			await BillModel.create({
                staff_id: staff_id,
                store_id: store_id,
                client_id: client_id
			}).then(result => id = result.id);


            await items.map(async(item) => {
                await BillDetailsModel.create({
                    material_id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    bill_id: id
                })
            })
            
			return res
				.status(200)
				.json({ 
                    message: "Create Bill successfully!",
                }); 
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async getAllBill(req, res) {
        try{
            const bills = await BillModel.findAll();
            return res
                .status(200)    
                .json(bills);
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async updateBill(req, res) {
        try{
            const data = req.body;
            const id = req.params.id;
            await BillModel.update( data, {
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

    async deleteBill(req, res) {
        try{
            const id = req.params.id;
            console.log(id)
            await BillModel.destroy({
                where: {id}
            })
            return res
                .status(200)
                .send({message:'Delete BILL successfully!'})
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
}

module.exports = new BillController();