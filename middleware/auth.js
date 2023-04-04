import jwt from 'jsonwebtoken';
import Vehicle from '../models/Vehicle.js';

// MIDDLEWARE FOR CHECKING CORRECT USER IS LOGGED IN
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ error: 'You must login first.' });
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// MIDDLEWARE FOR CHECKING IF LOGGED IN USER IS THE OWNER OF THE VEHICLE VIEWED
export const isOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id).populate('owner');
    const userId = req.user.id;
    const ownerId = vehicle.owner._id.toString();
    if (userId === ownerId) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: 'You are not authorised to edit this vehicle.' });
    }
  } catch (error) {}
};
