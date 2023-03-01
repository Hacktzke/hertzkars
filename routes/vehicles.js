import express from 'express';
import { verifyToken, isOwner } from '../middleware/auth.js';
import {
  getVehicles,
  postVehicle,
  updateVehicle,
  getSingleVehicle,
  deleteVehicle,
} from '../controllers/vehicles.js';
import { joiValidateVehicle } from '../middleware/joiValidation.js';
import multer from 'multer';
import { storage } from '../cloudinary/index.js';

const upload = multer({ storage });

const router = express.Router();

router
  .route('/')
  .get(getVehicles)
  .post(
    verifyToken,
    upload.single('vehicleImg'),
    joiValidateVehicle,
    postVehicle
  );

router
  .route('/:id')
  .get(getSingleVehicle)
  .put(
    verifyToken,
    isOwner,
    upload.single('vehicleImg'),
    joiValidateVehicle,
    updateVehicle
  )
  .delete(verifyToken, deleteVehicle);

export default router;
