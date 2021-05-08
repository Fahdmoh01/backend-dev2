const express = require('express');
const {
    getBootcamp,
    getBootcamps,
    createBootcamp, 
    updateBootcamps,
    deleteBootcamps
} = require('../controllers/bootcamps')

const router = express.Router();

router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp);


router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamps)
    .delete(deleteBootcamps);

module.exports = router;