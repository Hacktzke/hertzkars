import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { vehicleSchema } from '../schemas';
import ModalCard from './ModalCard';

const EditVehicleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { themeStyles } = useContext(ThemeContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [manufacturesList, setManufacturesList] = useState({});
  const [years, setYears] = useState([]);
  const [manufactureNames, setManufactureNames] = useState([]);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [vehicle, setVehicle] = useState({});
  const colors = [
    'Black',
    'Blue',
    'Bronze',
    'Brown',
    'Gold',
    'Green',
    'Grey',
    'Maroon',
    'Orange',
    'Purple',
    'Red',
    'Silver',
    'White',
    'Yellow',
    'Other',
  ];

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = currentYear; year >= 1900; year--) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
  };

  const fetchManufactures = async () => {
    try {
      const resp = await axios.get('/api/manufactures');
      const manufacturesData = resp.data;
      setManufacturesList(manufacturesData);
      const manufactureNamesData = manufacturesData.map((manufacture) => {
        return manufacture.name;
      });
      setManufactureNames(manufactureNamesData);
    } catch (error) {
      handleError("Can't connect to the server. Try again later");
    }
  };

  const getVehicle = async () => {
    try {
      const res = await axios.get(`/api/vehicles/${id}`);
      setVehicle(res.data);
      return res.data;
    } catch (error) {
      if (error.response.status === 404) {
        handleError(error.message);
      } else {
        handleError('Opps something went wrong here, try again later.');
      }
    }
  };

  const handleError = (error) => {
    setErrorMsg(error);
    setTimeout(() => {
      setErrorMsg('');
    }, 3000);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/vehicles/${vehicle._id}`);
      if (res.status === 200) {
        navigate(`/users/${user._id}`);
      }
    } catch (error) {
      setIsDeletePopup(false);
      if (error.response.status === 404) {
        handleError(error.response.data.message);
      } else if (error.response.status === 500) {
        handleError(error.response.data.message);
      } else {
        handleError('Opps something went wrong sorry, try again later.');
      }
    }
  };

  const onSubmit = async (values, actions) => {
    try {
      const vehicle = {
        _id: id,
        ...values,
        owner: user,
      };

      !vehicle.yearPurchased && delete vehicle.yearPurchased;
      !vehicle.description && delete vehicle.description;
      !vehicle.horsepower && delete vehicle.horsepower;
      !vehicle.vehicleImg && delete vehicle.vehicleImg;

      for (const manufacture of manufacturesList) {
        if (manufacture.name === values.manufacture) {
          vehicle.logo = manufacture.logo;
          vehicle.hq = manufacture.hq;
          vehicle.hqCoordinates = manufacture.hqCoordinates;
          vehicle.urlName = manufacture.urlName;
        }
      }

      await axios.put(`/api/vehicles/${id}`, vehicle, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/vehicles/${id}`);
      actions.resetForm();
    } catch (error) {
      actions.resetForm();
      if (error.response.status === 404) {
        handleError(error.response.data.message);
      } else {
        handleError(error.response.data.message);
      }
    }
  };
  const formikProps = useFormik({
    initialValues: {
      year: vehicle.year || '',
      manufacture: vehicle.manufacture || '',
      model: vehicle.model || '',
      color: vehicle.color || '',
      horsepower: vehicle.horsepower || '',
      yearPurchased: vehicle.yearPurchased || '',
      description: vehicle.description || '',
      vehicleImg: vehicle.vehicleImg || '',
    },
    enableReinitialize: true,
    validationSchema: vehicleSchema,
    onSubmit,
  });
  useEffect(() => {
    getVehicle();
    fetchManufactures();
    getYears();
  }, []);

  useEffect(() => {
    if (vehicle.owner && user._id) {
      if (vehicle.owner._id !== user._id) {
        navigate('/');
      }
    }
  }, [user]);

  useEffect(() => {
    formikProps.values.horsepower < 0 &&
      formikProps.setFieldValue('horsepower', 0);
  }, [formikProps.values.horsepower]);

  return (
    <div className="position-relative">
      {isDeletePopup && (
        <ModalCard>
          <div className="card-body text-center">
            <div className="m-3">
              Are you sure you want to delete this vehicle?
            </div>
            <button
              className="btn btn-secondary mx-1"
              onClick={() => {
                setIsDeletePopup(false);
              }}
            >
              Cancel
            </button>
            <button className="btn btn-danger mx-1" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </ModalCard>
      )}
      <div className="card px-3 py-5 shadow-lg" style={themeStyles.background}>
        <div className="text-center my-3">
          <h2>Edit your Vehicle</h2>
          <p>
            Something not quite right? <br></br> Edit your vehicle below.
          </p>
        </div>
        <hr></hr>
        <form
          className="mb-3 text-center"
          autoComplete="off"
          onSubmit={formikProps.handleSubmit}
        >
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="year">
              Year
            </label>
            <select
              className={`form-select text-center
            ${
              formikProps.errors.year && formikProps.touched.year
                ? 'border-danger'
                : ''
            }`}
              id="year"
              value={formikProps.values.year}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            >
              <option hidden>Select Vehicle Year</option>
              {years.map((year, index) => {
                return <option key={index}>{year}</option>;
              })}
            </select>
            {formikProps.errors.year && formikProps.touched.year && (
              <h6 className="text-danger mt-1">{formikProps.errors.year}</h6>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="manufacture" className="form-label">
              Manufacture
            </label>
            <select
              className={`form-select text-center
            ${
              formikProps.errors.manufacture && formikProps.touched.manufacture
                ? 'border-danger'
                : ''
            }`}
              id="manufacture"
              value={formikProps.values.manufacture}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            >
              <option hidden>Select Vehicle Manufacture</option>
              {manufactureNames.sort().map((manufacture, index) => {
                return (
                  <option name="manufacture" key={index}>
                    {manufacture}
                  </option>
                );
              })}
            </select>
            {formikProps.errors.manufacture &&
              formikProps.touched.manufacture && (
                <h6 className="text-danger mt-1">
                  {formikProps.errors.manufacture}
                </h6>
              )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="model" className="form-label">
              Model
            </label>
            <input
              className={`form-control text-center
            ${
              formikProps.errors.model && formikProps.touched.model
                ? 'border-danger'
                : ''
            }`}
              type="text"
              id="model"
              name="model"
              placeholder="Type Model"
              value={formikProps.values.model}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            ></input>
            {formikProps.errors.model && formikProps.touched.model && (
              <h6 className="text-danger mt-1">{formikProps.errors.model}</h6>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="color" className="form-label">
              Vehicle Colour
            </label>
            <select
              className={`form-select text-center
              ${
                formikProps.errors.color && formikProps.touched.color
                  ? 'border-danger'
                  : ''
              }`}
              id="color"
              value={formikProps.values.color}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            >
              <option hidden>Select Your Colour</option>
              {colors.map((color, index) => {
                return (
                  <option name="color" key={index}>
                    {color}
                  </option>
                );
              })}
            </select>
            {formikProps.errors.color && formikProps.touched.color && (
              <h6 className="text-danger mt-1">{formikProps.errors.color}</h6>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="yearPurchased">
              Year Purchased
            </label>
            <select
              className={`form-select text-center
                  ${
                    formikProps.errors.yearPurchased &&
                    formikProps.touched.yearPurchased
                      ? 'border-danger'
                      : ''
                  }`}
              id="yearPurchased"
              value={formikProps.values.yearPurchased}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            >
              <option hidden>Select the Year</option>
              {years.map((year, index) => {
                return <option key={index}>{year}</option>;
              })}
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="horsepower" className="form-label">
              Horsepower
            </label>
            <input
              className={`form-control text-center
            ${
              formikProps.errors.horsepower && formikProps.touched.horsepower
                ? 'border-danger'
                : ''
            }`}
              id="horsepower"
              name="horsepower"
              type="number"
              placeholder="Add horsepower"
              value={formikProps.values.horsepower}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            ></input>
            {formikProps.errors.horsepower &&
              formikProps.touched.horsepower && (
                <h6 className="text-danger mt-1">
                  {formikProps.errors.horsepower}
                </h6>
              )}
          </div>
          <div className="form-group text-center mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              value={formikProps.values.description}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              className={`form-control text-center
                  ${
                    formikProps.errors.description &&
                    formikProps.touched.description
                      ? 'border-danger'
                      : ''
                  }`}
              id="description"
              rows="3"
            ></textarea>
            {formikProps.errors.description &&
              formikProps.touched.description && (
                <h6 className="text-danger mt-1">
                  {formikProps.errors.description}
                </h6>
              )}
          </div>
          <div className="mb-3">
            <input
              className={`btn btn-outline-primary w-75
                  ${
                    formikProps.errors.vehicleImg &&
                    formikProps.touched.vehicleImg
                      ? 'border-danger'
                      : ''
                  }`}
              style={{ maxWidth: '500px' }}
              type="button"
              value={
                formikProps.values.vehicleImg
                  ? 'Change vehicle image'
                  : 'Add a vehicle image'
              }
              onClick={() => {
                document.querySelector('#vehicleImg').click();
              }}
            ></input>
            <input
              type="file"
              id="vehicleImg"
              hidden
              onChange={(e) => {
                formikProps.setFieldValue('vehicleImg', e.target.files[0]);
              }}
              onBlur={formikProps.handleBlur}
            ></input>
            {formikProps.errors.vehicleImg &&
              formikProps.touched.vehicleImg && (
                <h6 className="text-danger mt-1">
                  {formikProps.errors.vehicleImg}
                </h6>
              )}
            {formikProps.values.vehicleImg && (
              <div className="position-relative">
                <img
                  className="my-4 shadow-lg"
                  src={
                    formikProps.values.vehicleImg.url
                      ? `${formikProps.values.vehicleImg.url}`
                      : URL.createObjectURL(formikProps.values.vehicleImg)
                  }
                  crossorigin="anonymous"
                  style={{
                    maxWidth: '500px',
                    borderRadius: '5px',
                  }}
                  alt="preview of the vehicle being edited"
                ></img>
                <button
                  className="btn btn-danger position-absolute"
                  onClick={() => {
                    formikProps.setFieldValue('vehicleImg', '');
                  }}
                  style={{
                    top: '30px',
                    left: '50%',
                    transform: 'translate(-50%)',
                  }}
                  type="button"
                >
                  Delete Image
                </button>
              </div>
            )}
          </div>

          <div>
            <Link
              to={`/vehicles/${vehicle._id}`}
              className="btn mb-3 btn-outline-secondary"
              style={{ width: '100px' }}
            >
              Cancel
            </Link>
          </div>

          <button
            disabled={formikProps.isSubmitting}
            type="submit"
            className={`btn mb-3 ${
              formikProps.isSubmitting ? 'btn-success' : 'btn-outline-success'
            }`}
            style={{ minWidth: '100px' }}
          >
            {formikProps.isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <div>
            <Link
              className="btn  btn-outline-danger"
              style={{ minWidth: '100px' }}
              onClick={() => {
                setIsDeletePopup(true);
              }}
            >
              Delete Vehicle
            </Link>
          </div>
        </form>
        {errorMsg && (
          <div className="alert alert-danger mt-3 text-center">{errorMsg}</div>
        )}
      </div>
    </div>
  );
};

export default EditVehicleForm;
