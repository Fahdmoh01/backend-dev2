const express = require ('express');
const dotenv = require ('dotenv');

//loading environment variable

dotenv.config({path: './config/config.env'});

const app = express();

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

app.listen(PORT,() => {console.log(`Server running in ${ENV} mode on ${PORT} `)});