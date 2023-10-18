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

router.post('/', async(req, res)=>{
    const data = req.body
    //console.log(data)
    const user = await User.create(data);
    res.json(user);
})

router.put('/:id', async(req, res)=>{
    const id = req.params.id;
    //console.log(req.body)
    const user = await User.findByPk(id);
    const data = req.body;
    //console.log(data)
    const updatedUser = await user.update(data);
    res.json(updatedUser);
})

router.delete('/:id', async(req, res)=>{
    const id = req.params.id;
    const user = await User.findByPk(id);
    const deleted = await user.destroy();

    res.json(deleted);
})



module.exports = router;