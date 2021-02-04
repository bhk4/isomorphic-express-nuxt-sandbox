// routes/api.js

const User = require('../models/user');
const express = require('express');
const path = require('path')
const multer = require('multer')
const crypto = require('crypto')
const router = express.Router();

const storage = multer.diskStorage({
    destination: 'public',
    filename: (req, file, callback) => {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return callback(err);
            callback(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
});

let upload = multer({ storage: storage })

router.post('/user/new', upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("Please include a user image");
        return res.send({
            success: false
        });
    } else {
        const host = req.get('host')
        const imageUrl = req.protocol + "://" + host + '/' + req.file.path;
        User.create({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            imageUrl
        }, (err, user) => {
            if (err) {
                console.log('CREATE error: ' + err);
                res.status(500).send('Error')
            } else {
                res.status(200).json(user)
            }
        })
    }
})

router.get('/user/:_id', (req, res) => {
    User.findById(req.params._id, (err, user) => {
        if (err) {
            console.log('RETRIEVE error: ' + err);
            res.status(500).send('Error');
        } else if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).send('Item not found')
        }
    })
})

router.get('/users', (req, res) => {
    const users = User.find({}, (err, users) => {
        if (err) {
            console.log('RETRIEVE error: ' + err);
            res.status(500).send('Error');
        } else if (users) {
            res.status(200).json(users);
        }
    })
})

module.exports = router;