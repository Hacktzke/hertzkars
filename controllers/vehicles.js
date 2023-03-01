import User from '../models/User.js';
import Vehicle from '../models/Vehicle.js';
import { cloudinary } from '../cloudinary/index.js';

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({}).populate({
      path: 'owner',
      select: 'firstName lastName markerColor',
    });

    if (!vehicles.length) {
      res
        .status(200)
        .json({ message: 'There are currently no vehicles submitted.' });
    } else {
      res.status(200).json({ vehicles });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getSingleVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id).populate({
      path: 'owner',
      select: 'firstName lastName markerColor _id',
    });
    if (!vehicle) {
      res.status(404).json({ message: 'There is no matching vehicle' });
    } else {
      res.status(200).json(vehicle);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const postVehicle = async (req, res) => {
  try {
    const vehicleData = req.body;
    req.file &&
      (vehicleData.vehicleImg = {
        url: req.file.path,
        filename: req.file.filename,
      });
    const vehicle = await new Vehicle(vehicleData);
    vehicle.save();
    const user = await User.findById(vehicleData.owner);
    user.vehicles.push(vehicle);
    user.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const newVehicleData = req.body;
    const newVehicleImg = req.file && {
      url: req.file.path,
      filename: req.file.filename,
    };
    const currentVehicle = await Vehicle.findById(newVehicleData._id);
    if (!currentVehicle) {
      newVehicleImg &&
        (await cloudinary.uploader.destroy(newVehicleImg.filename));
      return res.status(404).json({ message: 'There is no matching vehicle.' });
    }

    currentVehicle.set({
      year: newVehicleData.year,
      manufacture: newVehicleData.manufacture,
      urlName: newVehicleData.urlName,
      model: newVehicleData.model,
      logo: newVehicleData.logo,
      hq: newVehicleData.hq,
      hqCoordinates: newVehicleData.hqCoordinates,
      color: newVehicleData.color,
      yearPurchased: newVehicleData.yearPurchased
        ? newVehicleData.yearPurchased
        : undefined,
      horsepower: newVehicleData.horsepower
        ? newVehicleData.horsepower
        : undefined,
      description: newVehicleData.description
        ? newVehicleData.description
        : undefined,
    });

    if (newVehicleImg) {
      currentVehicle.vehicleImg &&
        (await cloudinary.uploader.destroy(currentVehicle.vehicleImg.filename));
      currentVehicle.set('vehicleImg', newVehicleImg);
    } else if (currentVehicle.vehicleImg && !newVehicleData.vehicleImg) {
      await cloudinary.uploader.destroy(currentVehicle.vehicleImg.filename);
      currentVehicle.set('vehicleImg', undefined);
    }

    await currentVehicle.save();

    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    console.log(error.message);
    newVehicleImg &&
      (await cloudinary.uploader.destroy(newVehicleImg.filename));
    res
      .status(500)
      .json({ message: 'Sorry something went wrong, please try again later.' });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'There is no matching vehicle.' });
    }
    return res.status(200).json(vehicle);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Sorry something went wrong, please try again later.' });
  }
};
