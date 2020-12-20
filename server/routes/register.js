const { createUser } = require("../models/users")
const express = require('express');
// const Joi= require('joi');
const route= express.Router();

//POST API to register new user
//http://localhost:4000/users/register
route.post('/',(req,res,next)=>{
    // const { error } =validateUser(req.body);//Joi validation
    // if(error){
    //     res.status(400);
    //     res.send(error.details[0].message);//sending first error
    //     console.log(error);
    //     return;
    // }
    createUser(req.body)
    .then(()=> res.json({}))
    .catch(err => next(err))
})
// function validateUser(userInfo){
//     const schema ={
//         username:Joi.string().min(4).max(60).required(),
//         firstname:Joi.string().min(4).max(60).required(),
//         lastname:Joi.string().min(4).max(60).required(),
//         password:Joi.string().min(6).max(60).required(),
//     };
//     //validate
//     const result=Joi.validate(userInfo,schema);
//     return result;
// }
module.exports = route;