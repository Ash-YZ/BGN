// messageController.js
const moment = require('moment');
Message = require('./messageModel');

// Handle index actions
exports.index = function (req, res) {
    Message.get(function (err, messages) {
        if (err) {
            res.json({
                result: true,
                dataType: "message",
                message: "Error: There was a problem with your request"
            });
        }
        res.json({
            result: true,
            dataType: "message",
            data: messages
        });
    });
};
// Create messages actions
exports.new = function (req, res) {
    let message = new Message();
    message.content = req.body.content;
    message.timestamp = Math.round(moment.unix(new Date().getTime())/1000000);
    message.tags = req.body.tags;
    
    // saving message
    message.save(function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                result: true,
                dataType: "message",
                data: message
            });
        }
    });
};

// View message info
exports.view = function (req, res) {
    Message.findById(req.params.message_id, function (err, message) {
        if (err)
            res.send(err);
        res.json({
            result: true,
            dataType: "message",
            data: message
        });
    });
};

// Update message
exports.update = function (req, res) {
    Message.findById(req.params.message_id, function (err, message) {
        if (err) {
            res.send(err);
        } else {
            message.content = req.body.content;
            message.timestamp = Math.round(moment.unix(new Date().getTime())/1000000);
            message.tags = req.body.tags;

            message.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Message updated',
                    data: message
                });
            });
        }
    });
};

// Delete message
exports.delete = function (req, res) {
    Message.remove({
        _id: req.params.message_id
    }, function (err, message) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                result: true,
                dataType: "message",
                message: 'Message deleted'
            });
        }
    });
};