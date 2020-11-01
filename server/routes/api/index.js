const router = require('express').Router();
const artistRoutes = require('./artist-routes');
const playlistRoutes = require('./playlist-routes');
const sourceRoutes = require('./source-routes');
const trackRoutes = require('./track-routes');
const userRoutes = require('./user-routes');

// app.use('/discogs', discogsAPI);

router.use('/artist', artistRoutes);
router.use('/playlist', playlistRoutes);
router.use('/source', sourceRoutes);
router.use('/track', trackRoutes);
router.use('/user', userRoutes);

module.exports = router;
