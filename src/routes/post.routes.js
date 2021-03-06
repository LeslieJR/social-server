const {Router} = require('express');
const controllers = require('../controllers')
const router = Router();
const uploads = require('../utils').multer
const middlewares = require('../middlewares')

router.post('/upload', uploads.single('image'), middlewares.auth.isTokenValid, middlewares.auth.isOwner, controllers.post.upload)
router.get('/recent-uploads', controllers.post.recentUploads)
router.get('/stats', controllers.post.stats)
router.get('/most-popular', controllers.post.mostPopular)
router.post('/like', controllers.post.like);
router.post('/view', controllers.post.view);
router.get('/details/:id', middlewares.auth.validateDetails,controllers.post.details)
router.delete('/remove-post', controllers.post.remove)

module.exports = router;