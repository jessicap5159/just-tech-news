const router = require('express').Router();

const userRoutes = require('./api/user-routes');
const postRoutes = require('./api/post-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req,res) => {
    res.status(404).end();
});

module.exports = router;

// packaged up endpoints for server.js to use