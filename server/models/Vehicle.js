import mongoose from 'mongoose';
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
  return this.url.replace('/upload', '/upload/w_500/ar_4:3,c_crop,g_center');
});

ImageSchema.virtual('cardImg').get(function () {
  return this.url.replace('/upload', '/upload/w_1500/ar_4:3,c_crop,g_center');
});

const vehicleSchema = new Schema(
  {
    year: {
      type: Number,
      required: true,
      minlength: 4,
      maxlength: 4,
    },
    manufacture: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    hq: {
      type: String,
      required: true,
    },
    hqCoordinates: {
      type: Array,
      requried: true,
    },
    vehicleImg: ImageSchema,
    urlName: String,
    yearPurchased: Number,
    horsepower: Number,
    description: String,
    logo: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

vehicleSchema.post('findOneAndDelete', async function (vehicle) {
  try {
    if (vehicle.vehicleImg) {
      await cloudinary.uploader.destroy(vehicle.vehicleImg.filename);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
