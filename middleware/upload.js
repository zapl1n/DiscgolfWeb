const multer = require('multer');
const path = require('path');
const sharp = require('sharp');


const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb('Error: File upload only supports the following filetypes - ' + filetypes);
    }

const upload = multer({
    storage: storage,
    limits: { fileSize:  5 * 1024 * 1024 }, // 1MB limit
    fileFilter: fileFilter
})

const resizeImage = async (fileBuffer) => {
    try {
        const image = sharp(fileBuffer);
        const resizedImage = await image.resize(800).toBuffer()
        return resizedImage;
    } catch (error) {
        throw new Error('Error resizing image: ' + error.message);
    }
}

module.exports = { upload, resizeImage };