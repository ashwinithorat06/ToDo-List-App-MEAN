require('rootpath')();
const express= require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan'); //morgan is a middleware that makes logging for Node.js HTTP servers 

const cors = require('cors');
const jwt = require('./middleware/jwt');
const errorHandler = require('./utils/error-handler')
const users=require('./routes/users.js');
const todo=require('./routes/todo.js');

// app.use(express.urlencoded({extended:true})); //if true: parse incoming Request Object of any type
app.use(express.urlencoded({extended:false})); // if false: parse only incoming Request Object if string or array
app.use(express.json()); //parse incoming Request Object as a JSON Object 

app.use(morgan('tiny')); //connecting frontend with backend

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/users/:id/todo',todo);
app.use('/users',users);

// app.use(express.static('G:/Angular/registration-login/dist')); //Angular files included here
app.use(express.static('dist')); //Angular files included here

app.use(errorHandler); //Error handler
app.use(jwt()); //Jwt Authentication

const port =process.env.HTTP_PORT || 4000;
//listen on port
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})




