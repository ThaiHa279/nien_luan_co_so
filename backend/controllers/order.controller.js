const { NOW } = require('sequelize');
const MaterialModel = require('~/models/material.model');
const OrderModel = require('~/models/order.model');

class OrderController {
    async createOrder(req, res) {
        try{
            const date = NOW;
			await OrderModel.create({
				date
			});
            
			return res
				.status(200)
				.json({ message: "Create ORDER successfully!" }); 
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async getAllOrder(req, res) {
        try{

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