const express = require("express");
const router = express.Router();
const { User } = require('../models/index')

const {check, validationResult} = require("express-validator");

router.get('/', async(req, res)=>{
    const users = await User.findAll();
    res.json(users);
})

router.get('/:id', async(req, res)=>{
    const id = req.params.id
    const user = await User.findByPk(id);
    res.json(user);
})

router.post('/',[
    check("name").not().isEmpty().trim().isLength({min: 5, max: 15}),
    check("age").not().isEmpty().trim()
], async(req, res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        res.json({error: error.array()})
    }else{
        const data = req.body
        const user = await User.create(data);
        res.json(user);
    }
});

router.put('/:id',[
    check("name").not().isEmpty().trim().isLength({min: 5, max: 15}).optional(),
    check("age").not().isEmpty().trim().optional()
], async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const id = req.params.id;
        //console.log(req.body)
        const user = await User.findByPk(id);
        const data = req.body;
        //console.log(data)
        const updatedUser = await user.update(data);
        res.json(updatedUser);
    }
})

router.delete('/:id', async(req, res)=>{
    const id = req.params.id;
    const user = await User.findByPk(id);
    const deleted = await user.destroy();

    res.json(deleted);
})



module.exports = router;