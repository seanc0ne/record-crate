const router = require('express').Router();
const trackRoutes = require('./track-routes');

// add prefix of `/track` to routes created in `track-routes.js`
router.use('/track', trackRoutes);


module.exports = router;