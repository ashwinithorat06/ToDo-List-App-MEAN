const mongoose = require('mongoose');
const jwt= require('jsonwebtoken');
const config = require('../utils/config.json')

//connect to MongoDb
mongoose.connect('mongodb://localhost:27017/mean-todo-new',{useNewUrlParser:true})
.then(()=> console.log("Connected to MongoDB"))
.catch((err) => console.log("Error: Enable to connect to MongoDB",err));
// mongoose.Promise = global.Promise;

//Create user database Schema
const userSchema= new mongoose.Schema({
    username:{type:String,required:true,unique:false},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    password:{type:String,required:true},
    // _id:{type:String,required:true}
})

const User = mongoose.model('User',userSchema)

async function generateAuthToken({username,password}){
const user = await User.findOne({username});
 if (user && password) {
    // const payload = { username: this.username,id:this._id };
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return {
        ...user.toJSON(),
        token
        };
    }   
}


async function createUser(userInfo){
    try{
        //check if username present in db
        const user = await getUserByUsername(userInfo.username);
        if(user){
            // console.log(`Error: User with name ${user.username} already exists`);
        throw 'Username "' + userInfo.username + '" is already taken';

        }
        else{
            //create new user
            const user = new User(userInfo);
            try{
                var result= await user.validate();
                result= await user.save();
                return result;
            }
            catch(err){
                console.log("Error:Could not save document");
                throw err;
            }
        }
    }
    catch(err){
        throw err;
    }
}
async function getUserByUsername(username) {
    try {
        const user = await User.findOne({ username: username });
        //console.log("Got user ", user);
        return user;
    }
    catch (err) {
        console.log("Error: Unable to query database");
        throw err;
    }
}
async function getAllUsers(){
    try{
        const users=await User.find();
        // console.log(users)
        return users;
    }
    catch(err){
        console.log("Error: Couldnot query MongoDB");
        throw err;
    }
}
async function getById(id){
    console.log(id)
    // return await User.findById(id);
    const user= await User.findById({_id:id});
    return user;

}
async function updateUser(id,userInfo){
    try{
    // validate

        const user = await User.findById(id);
        if(!user){
            throw 'User not found '
        } 
        if (user.username !== userInfo.username && await User.findOne({ username: userInfo.username })) {
            throw 'Username "' + userInfo.username + '" is already taken';
        }
        // Modify its properties
        // user.set(userInfo); 
        //or
    // copy userInfo properties to user
        Object.assign(user,userInfo);
        return await user.save();
    }
    catch(err){
        console.log("Error: Cannot save user with ID: ", id);
        throw err;
    }
}

async function deleteUser(id){
    // console.log("DELETE FUNCTION: "+ id);
    // await User.findByIdAndDelete(id);
    // await User.findByIdAndRemove(id);
    await User.deleteOne({_id: id})
}

module.exports.createUser=createUser;
module.exports.generateAuthToken=generateAuthToken;
module.exports.getAllUsers=getAllUsers;
module.exports.getById=getById;
module.exports.updateUser=updateUser;
module.exports.deleteUser=deleteUser;
