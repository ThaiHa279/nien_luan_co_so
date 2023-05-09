const MaterialModel = require('~/models/material.model');
const MaterialTypeModel = require('~/models/material_type.model');
const MaterialDetailsModel = require('~/models/material_detail.model');
const sequelize = require("~/services/sequelize.service");

class MaterialController {
    async createMaterialType(req, res) {
        try{
            const name = req.body.name;
            const unit = req.body.unit;
   			await MaterialTypeModel.create({
				name,
                unit,
			});
			return res
				.status(200)
				.json({ message: "Create MATERIAL TYPE successfully!" });
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
    async createMaterial(req, res) {
        try{
            const name = req.body.name;
            const material_type_id = req.body.material_type_id;
            const price = req.body.price;
            const expiry = req.body.expiry;
   			await MaterialModel.create({
				name,
                price,
                expiry,
                material_type_id,
			});
			return res
				.status(200)
				.json({ message: "Create MATERIAL successfully!" });
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
    async updateMaterialDetails(req, res) {
        try{
            const store_id = req.body.store_id
            const material_id = req.body.material_id
            const local = req.body.local
            const quantity = req.body.quantity
            
            await MaterialDetailsModel.upsert( {
                store_id ,
                material_id ,
                local ,
                quantity
            }, {
                where: {store_id, material_id}
            });
			return res
				.status(200)
				.json({ message: "Update MATERIAL DETAILS successfully!" });
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
    async getAllMaterial(req, res) {
        try{
            
            const data = await sequelize.query(`SELECT b.quantity, a.id, a.name, a.price FROM public.materials as a FULL JOIN public.material_details as b ON a.id = b.material_id`)
            return res
                .status(200)    
                .json(data[0]);
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async updateMaterial(req, res) {
        try{
            const data = req.body;
            const id = req.params.id;
            await MaterialModel.update( data, {
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

    async deleteMaterial(req, res) {
        try{
            const id = req.params.id;
            await MaterialModel.destroy({
                where: {id}
            })
            return res
                .status(200)
                .send({message:'Delete MATERIAL successfully!'})
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async getMaterialFollowType(req, res) {
        try{
            const type_id = req.params.id;
            const materials = await MaterialModel.findAll({
                where: {material_type_id: type_id}
            });
            return res
                .status(200)    
                .json(materials);
        } catch(error) {
            res.status(400).send({
                message:error.message
            })
        }
    }

    async getTypeMaterial(req, res) {
        try {
            const all_type = await MaterialTypeModel.findAll();
            return res
                .status(200)    
                .json(all_type);
        } catch (error) {
            res.status(400).send({
                message:error.message
            })
        }
    }
}

module.exports = new MaterialController();