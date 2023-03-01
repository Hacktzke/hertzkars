import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { formatName } from '../utils/utils.js';
import { cloudinary } from '../cloudinary/index.js';

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('vehicles');
    if (!user) {
      res.status(404).json({ error: 'There is no user ' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const newProfileImg = req.file && {
      url: req.file.path,
      filename: req.file.filename,
    };

    const usersNewData = req.body;

    const user = await User.findById(usersNewData.id);

    const isMatch = await bcrypt.compare(
      usersNewData.currentPassword,
      user.password
    );
    if (!isMatch) {
      newProfileImg &&
        (await cloudinary.uploader.destroy(newProfileImg.filename));

      return res
        .status(403)
        .json({ message: 'Invalid password, please try again...' });
    }
    if (usersNewData.email !== user.email) {
      const emailTaken = await User.find({
        email: usersNewData.email.toLowerCase(),
      });
      if (emailTaken.length) {
        newProfileImg &&
          (await cloudinary.uploader.destroy(newProfileImg.filename));
        return res.status(403).json({
          message: 'This email is already taken, please choose another.',
        });
      }
    }

    user.set({
      firstName: formatName(usersNewData.firstName),
      lastName: formatName(usersNewData.lastName),
      email: usersNewData.email.toLowerCase(),
      favouriteVehicle: usersNewData.favouriteVehicle
        ? usersNewData.favouriteVehicle
        : undefined,
      bio: usersNewData.bio ? usersNewData.bio : undefined,
    });

    if (newProfileImg) {
      user.profileImg &&
        (await cloudinary.uploader.destroy(user.profileImg.filename));
      user.set('profileImg', newProfileImg);
    } else if (user.profileImg && !usersNewData.profileImg) {
      await cloudinary.uploader.destroy(user.profileImg.filename);
      user.set('profileImg', undefined);
    }

    if (usersNewData.newPassword) {
      const isMatch = await bcrypt.compare(
        usersNewData.newPassword,
        user.password
      );
      if (isMatch) {
        newProfileImg &&
          (await cloudinary.uploader.destroy(newProfileImg.filename));
        return res.status(400).json({
          message:
            'New password the same as your current one, please select a new password',
        });
      } else {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(usersNewData.newPassword, salt);
        user.set('password', passwordHash);
        await user.save();
        res.clearCookie('token');
        return res.status(200).json({ auth: false });
      }
    } else {
      const updatedUser = await user.save();
      updateUser.password = undefined;
      return res.status(200).json({ auth: true, updatedUser });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    res.clearCookie('token');
    const user = await User.findById(id);
    if (user.profileImg) {
      await cloudinary.uploader.destroy(user.profileImg.filename);
    }
    await User.findByIdAndDelete(id);

    return res.status(200).json({ auth: false });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
