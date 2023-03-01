import express from 'express';
const router = express.Router();
import Manufacture from '../models/Manufacture.js';

router.get('/', async (req, res) => {
  const manufactures = await Manufacture.find({});
  res.status(200).json(manufactures);
});

export default router;
