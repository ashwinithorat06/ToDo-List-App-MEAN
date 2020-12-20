const { createTodo,getAllTodo,getById,updateTodo,deleteTodo } = require("../models/todo");
const express = require('express');
const route = express.Router();


//POST API to register new user
//http://localhost:4000/users/userid/todo/register
route.post('/register',(req,res,next)=>{
    createTodo(req.body)
    .then(()=> res.json({}))
    .catch(err => next(err))
})
//GET  API - get the data
route.get('/',(req,res,next)=>{
    getAllTodo()
    .then(todoList => res.json(todoList))
    .catch(err => next(err))
})

route.get('/:id',(req,res,next)=>{
    getById(req.params.id)
    // .then(todo => res.json(todo))
    .then(todo => todo ? res.json(todo) : res.sendStatus(404))
    .catch(err => next(err))
})

//PUT  API - Update todo
route.put('/:id',(req,res,next)=>{
    updateTodo(req.params.id,req.body)
    .then(() => res.json({}))
        .catch(err => next(err));
})

//DELETE  API - delete todo
route.delete('/:id',(req,res)=>{
    console.log("delete id: "+req.params.id)
    deleteTodo(req.params.id)
    .then(()=>res.json({}))
    .catch(err => console.log(err))
})
module.exports = route;
