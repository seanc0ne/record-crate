const router = require('express').Router();

const {
    getAllTracks,
    getTrackById,
    createTrack,
    updateTrack,
    deleteTrack,
} = require('../../controllers/track-controller');

// Set up GET all and POST at /api/track
// /api/track
router
    .route('/')
    .get(getAllTracks)
    .post(createTrack);

// Set up GET one, PUT, and DELETE at /api/track/:id
// /api/track/:id
router
    .route('/:id')
    .get(getTrackById)
    .put(updateTrack)
    .delete(deleteTrack);


module.exports = router;