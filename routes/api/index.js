const router = require('express').Router();
const playlistRoutes = require('./playlist-routes');
const trackRoutes = require('./track-routes');
const userRoutes = require('./user-routes');

router.use('/playlist', playlistRoutes);
router.use('/track', trackRoutes);
router.use('/user', userRoutes);

module.exports = router;
