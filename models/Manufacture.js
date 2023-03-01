import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const manufactureSchema = new Schema({
  logo: String,
  name: {
    type: String,
    required: true,
  },
  urlName: {
    type: String,
    required: true,
  },
  hq: {
    type: String,
    required: true,
  },
  hqCoordinates: {
    type: Array,
    required: true,
  },
});

const Manufacture = mongoose.model('Manufacture', manufactureSchema);

export default Manufacture;
