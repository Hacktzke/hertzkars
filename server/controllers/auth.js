import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { formatName } from '../utils/utils.js';
import { cloudinary } from '../cloudinary/index.js';

export const register = async (req, res) => {
  try {
    const userData = req.body;
    req.file &&
      (userData.profileImg = {
        url: req.file.path,
        filename: req.file.filename,
      });
    userData.firstName = formatName(userData.firstName);
    userData.lastName = formatName(userData.lastName);
    userData.email = userData.email.toLowerCase();
    const isRegistered = await User.findOne({ email: userData.email });
    if (isRegistered) {
      userData.profileImg &&
        (await cloudinary.uploader.destroy(userData.profileImg.filename));
      return res.status(400).json({ error: 'This user already exists...' });
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(userData.password, salt);
      const newUser = new User({
        ...userData,
      });
      newUser.password = passwordHash;
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
      savedUser.password = undefined;
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
      });
      res.status(201).json({ user: savedUser });
    }
  } catch (error) {
    console.log(error);
    req.file && (await cloudinary.uploader.destroy(req.file.filename));
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ error: 'User does not exist.' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: 'Invalid credentials, please try again.' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const authenticate = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(200).json({ auth: false });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(200).json({ auth: false });
      } else {
        const { id } = decoded;
        const user = await User.findById(id);
        user.password = undefined;
        res.status(200).json({ auth: true, user });
      }
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ auth: false });
};
