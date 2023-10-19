const express = require("express");
const router = express.Router();
const { Fruit } = require('../models/index')

const {check, validationResult} = require("express-validator");

router.get('/', async(req, res)=>{
    console.log("fetching all fruits")
    const fruits = await Fruit.findAll();
    res.json(fruits);
})

router.get('/:id', async(req, res)=>{
    const id = req.params.id
    const fruit = await Fruit.findByPk(id);
    res.json(fruit);
})

router.post('/',[
    check("color").not().isEmpty().trim().optional(),
    check("name").not().isEmpty().trim().isLength({min: 5, max: 20}).optional(),
], async(req, res)=>{
    console.log("creating...")
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const data = req.body
        //console.log(data)
        const fruit = await Fruit.create(data);
        res.json(fruit);
    }
})

router.put('/:id',[
    check("color").not().isEmpty().trim().optional(),
    check("name").not().isEmpty().trim().isLength({min: 5, max: 20}).optional(),
], async(req, res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const id = req.params.id;
        //console.log(req.body)
        const fruit = await Fruit.findByPk(id);
        const data = req.body;
        //console.log(data)
        const updatedFruit = await fruit.update(data);
        res.json(updatedFruit);
    }
})

router.delete('/:id', async(req, res)=>{
    const id = req.params.id;
    const fruit = await Fruit.findByPk(id);
    const deleted = await fruit.destroy();

    res.json(deleted);
})



module.exports = router;