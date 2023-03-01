import mongoose from 'mongoose';
import Vehicle from './Vehicle.js';
import { cloudinary } from '../cloudinary/index.js';

const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    url: String,
    filename: String,
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_300/ar_4:4,c_crop,g_center');
});

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      max: 25,
      required: true,
    },
    lastName: {
      type: String,
      max: 25,
      required: true,
    },
    profileImg: ImageSchema,

    email: {
      type: String,
      required: [true, 'Email cannot be blank'],
      unique: true,
      max: 70,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 50,
    },
    markerColor: {
      type: String,
      required: true,
    },
    favouriteVehicle: {
      type: String,
      max: 50,
    },
    bio: {
      type: String,
      max: 400,
    },
    vehicles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
      },
    ],
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.post('findOneAndDelete', async function (user) {
  try {
    if (user.profileImg) {
      await cloudinary.uploader.destroy(user.profileImg.filename);
    }
    if (user.vehicles.length) {
      const res = await Vehicle.deleteMany({ _id: { $in: user.vehicles } });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

const User = mongoose.model('User', userSchema);

export default User;
