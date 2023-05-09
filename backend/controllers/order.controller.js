const { NOW } = require('sequelize');
const OrderModel = require('~/models/order.model');
const OrderDetailsModel = require('~/models/order_detail.model')

class OrderController {
    async createOrder(req, res) {
        try{
            var id = 0;
            const user_id = req.body.user_id;
            const items = req.body.items; 
            const payment = req.body.payment;
            const delivery_to = req.body.delivery_to;

			await OrderModel.create({
                user_id: user_id,
                payment: payment,
                delivery_to: delivery_to
			}).then(result => id = result.id);


            await items.map(async(item) => {
                console.log(item);
                await OrderDetailsModel.create({
                    material_id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    order_id: id
                })
            })
            
			return res
				.status(200)
				.json({ 
                    message: "Create ORDER successfully!",
                }); 
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
   
    async getAllOrder(req, res) {
        try{
            const list_order = await OrderModel.findAll({
                include: [
                    {
                        association: "user",
                        attributes: ["name", "phone"]
                    },
                ]
            });

            for (let i=0; i<list_order.length; i++) {
                const list_item = await OrderDetailsModel.findByPk(list_order[i].id, );
                list_order[i].dataValues = {
                    ...list_order[i].dataValues,
                    items: list_item
                };
            }

            return res
				.status(200)
				.json({ 
                    list_order: list_order,
                }); 
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async updateOrder(req, res) {
        try{

        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async deleteOrder(req, res) {
        try{

        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
}

module.exports = new OrderController();