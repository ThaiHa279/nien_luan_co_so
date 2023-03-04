const { NOW } = require('sequelize');
const BillModel = require('~/models/bill.model');
const BillDetailsModel = require('~/models/bill_detail.model');

class BillController {
    async createBill(req, res) {
        try{
            const date = NOW;
   			await BillModel.create({
                date,
			});
			return res
				.status(200)
				.json({ message: "Create BILL successfully!" });
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