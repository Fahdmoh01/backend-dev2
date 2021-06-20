const path = require('path');
const express = require ('express');
const dotenv = require ('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');



//loading environment variable
dotenv.config({path: './config/config.env'});

//connect to database
connectDB();

//importing routes
const bootCampRoutes = require('./routes/bootcamps');
const courseRoutes = require('./routes/courses');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const reviewsRoutes = require('./routes/reviews');


const app = express();

//Body Parser
app.use(express.json());

//Cookie Parser
app.use(cookieParser());

//environment variables
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

//Dev logging middleware
if(ENV === 'development'){
    app.use(morgan('dev'));
}

//file upload
app.use(fileupload());

//sanitize data
app.use(mongoSanitize());

//set security header
app.use(helmet());

//prevent cross site scripting attacks
app.use(xss());

//Rate Limiting
const limiter = rateLimit({
    windowMs: 10*60*1000, //10 mins
    max: 100
});

app.use(limiter);

//prevent http param pollution 
app.use(hpp());

//Enable CORS
app.use(cors());

//set static folder
//set files and folder static allows you to access them in the browser
app.use(express.static(path.join(__dirname, 'public')))


//Mount routers unto specific urls
app.use('/api/v1/bootcamps',bootCampRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/reviews', reviewsRoutes);

//error Handler
app.use(errorHandler)


const server = app.listen(PORT,() => {console.log(`Server running in ${ENV} mode on ${PORT} `.yellow.bold)});

//handle unhandled promise rejections from mongoose connection to database.
process.on('unhandledRejection',(err, promise) =>{
    console.log(`Error: ${err.message}`);
    
    //close server and exit process
    server.close(() => process.exit(1));
});
