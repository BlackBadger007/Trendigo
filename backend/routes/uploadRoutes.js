import path from 'path';
import express from 'express';
import multer from 'multer';
import asyncHandler from 'express-async-handler';
import {v4 as uuidv4} from 'uuid'

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${uuidv4()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
});

router.post('/', upload.single('image'), asyncHandler(async (req, res) => {
    const imagePath = req.file.path.replace(/\\/g, '/'); // Replace backslashes with forward slashes
    res.send({
        message: 'Image Uploaded',
        image: `${process.env.REACT_APP_API_URL}/${imagePath}` // Ensure it starts with a forward slash
    });
}));

export default router;
