const BillModel = require('~/models/bill.model')
const GRNModel = require('~/models/grn.model')
const StatisticModel = require("~/models/statistic.model")
const BillDetailsModel = require("~/models/bill_detail.model")
const GRNDetailsModel = require("~/models/grn_detail.model")
const sequelize = require("~/services/sequelize.service");

class Statistic {
    async getAllStatistic(req, res) {
        try {
            const allStatistic = await StatisticModel.findAll();
            console.log(allStatistic.sort((a,b) => {return a.id - b.id}));
            return res
                .status(200)
                .json(allStatistic.sort((a,b) => {return a.id - b.id}));
        } catch (error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async monthStatistic(req, res) {
        try {
            const date = req.params.date;
            console.log(date);  
            const data = await sequelize.query(`SELECT bill.material_id, sum(bill.quantity), sum(bill.price) sell, sum(grn.price) buy
            FROM public.bill_details as bill
            INNER JOIN public.grn_details as grn ON bill.material_id = grn.material_id
            WHERE date(bill."createdAt") >= '${date}-01' and  date(bill."createdAt") <= '${date}-30'
            GROUP BY bill.material_id`);
            return res
                .status(200)
                .json(data[0]);
        } catch (error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async saveStatistic(req, res) {
        try {
            var today = new Date();
            var month = String(today.getMonth() + 1).padStart(2, '0');
            var year = today.getFullYear();
            const date = year + '-' + month; 
            const sellQuery = await sequelize.query(`SELECT SUM(quantity*price) FROM public.bill_details WHERE date("createdAt") > '${date}-01' AND  date("createdAt") < '${date}-30'`);
            const buyQuery = await sequelize.query(`SELECT SUM(quantity*price) FROM public.grn_details WHERE date("createdAt") > '${date}-01' AND  date("createdAt") < '${date}-30'`);

            const profit = sellQuery[0][0].sum - buyQuery[0][0].sum;
            await  StatisticModel.create({
                date: date,
                profit: profit
            })
            return res
                .status(200)
                .json({message: `Saved profit in ${date}`})
        } catch (error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
};

module.exports = new Statistic();