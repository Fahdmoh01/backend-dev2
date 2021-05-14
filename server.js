const express = require ('express');
const dotenv = require ('dotenv');
const morgan = require('morgan');
const colors = require('colors')
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
//loading environment variable
dotenv.config({path: './config/config.env'});

//connect to database
connectDB();

//importing routes
const bootCampRoutes = require('./routes/bootcamps');

const app = express();

//Body Parser
app.use(express.json());

//environment variables
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

//Dev logging middleware
if(ENV === 'development'){
    app.use(morgan('dev'));
}
//Mount routers unto specific urls
app.use('/api/v1/bootcamps', bootCampRoutes);

//error Handler
app.use(errorHandler)


const server = app.listen(PORT,() => {console.log(`Server running in ${ENV} mode on ${PORT} `.yellow.bold)});

//handle unhandled promise rejections from mongoose connection to database.
process.on('unhandledRejection',(err, promise) =>{
    console.log(`Error: ${err.message}`);
    
    //close server and exit process
    server.close(() => process.exit(1));
});