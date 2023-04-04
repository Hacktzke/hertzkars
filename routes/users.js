import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();
import multer from 'multer';
import { storage } from '../cloudinary/index.js';
import { joiValidateUserUpdate } from '../middleware/joiValidation.js';
const upload = multer({ storage });

router.put(
  '/',
  verifyToken,
  upload.single('profileImg'),
  joiValidateUserUpdate,
  updateUser
);
router.get('/:id', getUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;
