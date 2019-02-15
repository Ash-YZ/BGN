// Initialize express router
const router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
       status: 'Test API is working',
       message: 'This is a BNG test API'
    });
});

// Import message controller
const messageController = require('./messageController');

// Message routes
router.route('/messages')
    .get(messageController.index)
    .post(messageController.new);
router.route('/messages/:message_id')
    .get(messageController.view)
    .patch(messageController.update)
    .put(messageController.update)
    .delete(messageController.delete);

// Export API routes
module.exports = router;