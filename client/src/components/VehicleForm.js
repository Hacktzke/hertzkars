import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { vehicleSchema } from '../schemas';

const VehicleForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { themeStyles } = useContext(ThemeContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [manufacturesList, setManufacturesList] = useState({});
  const [years, setYears] = useState([]);
  const [manufactureNames, setManufactureNames] = useState([]);
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

  useEffect(() => {
    fetchManufactures();
    getYears();
  }, []);

  const handleError = (error) => {
    setErrorMsg(error);
    setTimeout(() => {
      setErrorMsg('');
    }, 3000);
  };

  const onSubmit = async (values, actions) => {
    try {
      const vehicle = {
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
          vehicle.urlName = manufacture.urlName;
          vehicle.hq = manufacture.hq;
          vehicle.hqCoordinates = manufacture.hqCoordinates;
        }
      }
      console.log('HI', vehicle);

      await axios.post('/api/vehicles', vehicle, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/users/${user._id}`);
      actions.resetForm();
    } catch (error) {
      if (error.response.status === 400) {
        handleError(error.response.data.error);
      } else {
        handleError('Opps something went wrong here, try again later.');
      }
    }
  };

  const formikProps = useFormik({
    initialValues: {
      year: '',
      manufacture: '',
      model: '',
      color: '',
      horsepower: '',
      yearPurchased: '',
      description: '',
      vehicleImg: '',
    },
    validationSchema: vehicleSchema,
    onSubmit,
  });

  useEffect(() => {
    formikProps.values.horsepower < 0 &&
      formikProps.setFieldValue('horsepower', 0);
  }, [formikProps.values.horsepower]);

  return (
    <div className="card px-3 py-5 shadow-lg" style={themeStyles.background}>
      <div className="text-center my-3">
        <h2>Add a New Vehicle</h2>
        <p>
          Add to your collection, show us what you have had or luckily still
          have!
        </p>
      </div>
      <hr></hr>
      <form
        className="text-center mt-3"
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
            style={{ paddingLeft: '35px' }}
          >
            <option hidden>Select Vehicle Year</option>
            {years.map((year, index) => {
              return (
                <option type="number" key={index}>
                  {year}
                </option>
              );
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
            style={{ paddingLeft: '35px' }}
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
            style={{ paddingLeft: '35px' }}
          >
            <option hidden>Select Your Colour</option>
            {colors.map((color, index) => {
              return (
                <option name="coloor" key={index}>
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
            style={{ paddingLeft: '35px' }}
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
            style={{ paddingLeft: '25px' }}
          ></input>
          {formikProps.errors.horsepower && formikProps.touched.horsepower && (
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
            hidden
            id="vehicleImg"
            onChange={(e) => {
              formikProps.setFieldValue('vehicleImg', e.target.files[0]);
            }}
            onBlur={formikProps.handleBlur}
          ></input>
          {formikProps.errors.vehicleImg && formikProps.touched.vehicleImg && (
            <h6 className="text-danger m-3">
              {formikProps.errors.vehicleImg}
              <br></br>{' '}
              <a href="https://www.iloveimg.com/compress-image" target="_blank">
                Compress it here
              </a>
            </h6>
          )}
          {formikProps.values.vehicleImg && (
            <div className="position-relative">
              <img
                className="my-3 shadow"
                src={URL.createObjectURL(formikProps.values.vehicleImg)}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '5px',
                }}
                alt="Preview of the vehicle being uploaded"
              ></img>
              <button
                className=" btn btn-danger btn-sm mt-3 position-absolute"
                style={{
                  top: '30px',
                  left: '50%',
                  transform: 'translate(-50%)',
                }}
                type="button"
                onClick={(e) => {
                  formikProps.setFieldValue('vehicleImg', '');
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <button
          disabled={formikProps.isSubmitting}
          type="submit"
          className={`btn ${
            formikProps.isSubmitting ? 'btn-success' : 'btn-outline-success'
          }`}
          style={{ minWidth: '100px' }}
        >
          {formikProps.isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {errorMsg && (
        <div className="alert alert-danger mt-3 text-center">{errorMsg}</div>
      )}
    </div>
  );
};

export default VehicleForm;
