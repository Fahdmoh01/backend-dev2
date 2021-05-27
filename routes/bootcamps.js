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

const {protect, authorize} = require('../middleware/auth');

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
    .post(protect, authorize('publisher', 'admin'),createBootcamp);

router
    .route('/:id/photo')
    .put(protect,authorize ('publisher', 'admin'), bootcampPhotoUpload);


router
    .route('/:id')
    .get(getBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamps)
    .delete(protect,authorize('publisher', 'admin'), deleteBootcamps);


module.exports = router;