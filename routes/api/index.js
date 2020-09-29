const router = require('express').Router();
const trackRoutes = require('./track-routes');
const userRoutes = require('./user-routes');

// add prefix of `/track` to routes created in `track-routes.js`
router.use('/track', trackRoutes);
router.use('/user', userRoutes);

module.exports = router;
