import express from 'express';
const router = express.Router();
import { authenticate, register, login, logout } from '../controllers/auth.js';
import multer from 'multer';
import { storage } from '../cloudinary/index.js';
import {
  joiValidateUser,
  joiValidateLogin,
} from '../middleware/joiValidation.js';
const upload = multer({ storage });

router.get('/', authenticate);
router.post(
  '/register',
  upload.single('profileImg'),
  joiValidateUser,
  register
);

router.post('/login', joiValidateLogin, login);
router.get('/logout', logout);

export default router;
