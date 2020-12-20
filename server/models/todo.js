const mongoose = require('mongoose');
const jwt= require('jsonwebtoken');
const config = require('../utils/config.json')

//connect to MongoDb
mongoose.connect('mongodb://localhost:27017/mean-todo-new',{useNewUrlParser:true})
.then(()=> console.log("Connected to MongoDB"))
.catch((err) => console.log("Error: Enable to connect to MongoDB",err));
// mongoose.Promise = global.Promise;

//Create todo database Schema
const todoSchema = new mongoose.Schema({
    taskName:{type:String,required:true},
    category:{type:String,required:true},
    startDate:{type:Date ,required:true},
    endDate:{type:Date,required:true},
    textArea:{type:String,required:true},
    priority:{type:String,required:true},
    userId:{type:String,required:true}
})
const Todo = mongoose.model('Todo',todoSchema);


async function createTodo(todoInfo){
      //create new todo
        const todo = new Todo(todoInfo);
            try{
                var result= await todo.validate();
                result= await todo.save();
                return result;
            }
            catch(err){
                console.log("Error:Could not save document");
                throw err;
            }
}
   
async function getAllTodo(){
    try{
        const todoList=await Todo.find();
        // console.log(todoList)
        return todoList;
    }
    catch(err){
        console.log("Error: Couldnot query MongoDB");
        throw err;
    }
}

async function getById(id){
    console.log(id)
    const todo= await Todo.findById({_id:id});
    return todo;
}

async function updateTodo(id,todoInfo){
    try{
    // validate
        const todo = await Todo.findById(id);
        if(!todo){
            throw 'requested todo not found '
        }        
        //copy userInfo properties to user
        Object.assign(todo,todoInfo);
        return await todo.save();
    }
    catch(err){
        console.log("Error: Cannot save todo with ID: ", id);
        throw err;
    }
}

async function deleteTodo(id){
    await Todo.deleteOne({_id: id})
}

module.exports.createTodo=createTodo;
module.exports.getAllTodo=getAllTodo;
module.exports.getById=getById;
module.exports.updateTodo=updateTodo;
module.exports.deleteTodo=deleteTodo;
