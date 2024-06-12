const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require("dotenv").config();


// Configuration
cloudinary.config({ 
    cloud_name: 'duy0uzjug',
    api_key: '662112189366292',
    api_secret: 'EAbFw9iXVNKvB41o6JbOk9nhMzQ'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        allowed_formats: ['jpg', 'png', 'mp4'], // Optional - specify the allowed file formats
        resource_type: "auto", 
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
