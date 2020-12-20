const { generateAuthToken, createUser,getAllUsers,getById,updateUser,deleteUser } = require("../models/users")
const express = require('express');
const route= express.Router();


//POST API to authenticate user
//http://localhost:4000/users/authenticate
route.post('/authenticate',(req,res,next)=>{  
    generateAuthToken(req.body)
    .then((user => user? res.json(user): res.status(400).json({message: 'Username or password is incorrect'})))
    .catch(err => next(err))
})

//POST API to register new user
//http://localhost:4000/users/register
route.post('/register',(req,res,next)=>{
    createUser(req.body)
    .then(()=> res.json({}))
    .catch(err => next(err))
})

//GET  API - for getting data
route.get('/',(req,res,next)=>{
    getAllUsers()
    .then(users=>res.json(users))
    .catch(err => next(err))
})


route.get('/current',(req,res,next)=>{
    getById(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err))
})

route.get('/:id',(req,res,next)=>{
    getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err))
})

//PUT  API - Update
route.put('/:id',(req,res,next)=>{
    updateUser(req.params.id,req.body)
    .then(() => res.json({}))
        .catch(err => next(err));
})

//DELETE  API - delete
route.delete('/:id',(req,res)=>{
    console.log("delete id: "+req.params.id)
    deleteUser(req.params.id)
    .then(()=>res.json({}))
    .catch(err => console.log(err))
})
//if this is not used, gives error:
module.exports = route;
//TypeError: Router.use() requires a middleware function but got a Object
