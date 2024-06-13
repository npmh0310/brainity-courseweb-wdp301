const express = require('express');
const fileUploader = require('../../configs/cloudinary.config');
const cloudinaryRoute = express.Router();

cloudinaryRoute.post('/upload', 

    fileUploader.single('file'), (req, res, next) => {
        if (!req.file) {
            next(new Error('No file uploaded!'));
            return;
        }
        res.status(200).json({ secure_url: req.file.path });
});

module.exports = cloudinaryRoute;