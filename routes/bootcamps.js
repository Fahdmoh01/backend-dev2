const express = require('express');
const {
    getBootcamp,
    getBootcamps,
    createBootcamp, 
    updateBootcamps,
    deleteBootcamps,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../controllers/bootcamps')

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

//Include other resource routers 
const courseRouter = require('./courses');

//All routes begins with /api/v1/bootcamps which has been mounted in server.js
const router = express.Router();

//re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);


router
    .route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);

router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'),getBootcamps)
    .post(createBootcamp);

router
    .route('/:id/photo')
    .put(bootcampPhotoUpload);


router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamps)
    .delete(deleteBootcamps);


module.exports = router;