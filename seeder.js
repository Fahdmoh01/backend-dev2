const fs = require('fs');
const mongoose = require('mongoose');
const colors = require ('colors');
const dotenv = require('dotenv');
const path = require('path');

//load env vars
dotenv.config({path:'./config/config.env'})

//load models
const Bootcamp = require('./models/Bootcamp');

//Connect to DB
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
});

//Read JSON files
//const p = path.join(__dirname, '_data','bootcamps.json');
const bootcamps = JSON.parse(fs.readFileSync(path.join(__dirname, '_data','bootcamps.json'),'utf-8'));


//import JSON files into DB
const importData = async() =>{
    try{
        await Bootcamp.create(bootcamps);
        console.log('Data imported...'.green.inverse);
        process.exit();
    }catch(err){
        console.error(error);
    }
};

//delete data from DB
const deleteData = async() =>{
    try{
        await Bootcamp.deleteMany();
        console.log('Data destroyed...'.red.inverse);
        process.exit();
    }catch(err){
        console.error(error);
    }
};

if(process.argv[2] === '-i'){
    importData();
}else if(process.argv[2] === '-d'){
    deleteData();
}