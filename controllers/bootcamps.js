const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
//@desc get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public 
exports.getBootcamps = asyncHandler(async(req, res, next) =>{
        const bootcamps = await Bootcamp.find();
        res
        .status(200)
        .json({success:true, count:bootcamps.length, data: bootcamps})
    
});

//@desc  Get  a single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public 
exports.getBootcamp = asyncHandler(async(req, res, next) =>{
            const bootcamp = await Bootcamp.findById(req.params.id)
            if(!bootcamp){
              return next(new ErrorResponse(`Bootcamp with id ${req.params.id} not found`,404));
            //checks if bootcamp exists when request is correctly formatted.
            }
            res
            .status(200)
            .json({success:true, data:bootcamp});
});

//@desc Create new bootcamp
//@route POST /api/v1/bootcamps
//@access Private 
exports.createBootcamp = asyncHandler(async (req, res, next) =>{
        const bootcamp = await Bootcamp.create(req.body)
        
        res
        .status(201)
        .json({
            success:true,
            data:bootcamp
        })
    
});

//@desc Update bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Private 
exports.updateBootcamps = asyncHandler(async(req, res, next) =>{
    
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true
        });
    
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp with id ${req.params.id} not found`,404));
        }
        res
        .status(200)
        .json({success:true, data:bootcamp});
});

//@desc Delete bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamps = asyncHandler(async(req, res, next) =>{
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp with id ${req.params.id} not found`,404));
    }
    res
    .status(200)
    .json({success:true, data:{}});

   
});

//@desc Get bootcamps within a radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampsInRadius = asyncHandler(async(req, res, next) =>{
    const {zipcode, distance} = req.params;

    //Get lat/lng from geocoder
   
});