import React, { useState, useRef, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import userDefaultImg from '../assets/userImg.jpg';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { registerSchema } from '../schemas/index.js';
import { randomColor } from '../helpers/helpers';
import axios from 'axios';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const firstInput = useRef(null);
  const { setIsLoggedIn, setUser, setIntroPopup } = useContext(AuthContext);
  const { themeStyles } = useContext(ThemeContext);

  const handleError = (error) => {
    setErrorMsg(error);
    setTimeout(() => {
      setErrorMsg('');
    }, 3000);
  };

  const onSubmit = async (values, actions) => {
    try {
      const newUser = { ...values };
      !newUser.profileImg && delete newUser.profileImg;
      !newUser.favouriteVehicle && delete newUser.favouriteVehicle;
      !newUser.bio && delete newUser.bio;
      const res = await axios.post('/api/auth/register', newUser, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const user = res.data.user;
      setIsLoggedIn(true);
      setUser(user);
      setIntroPopup(true);
      navigate(`/users/${res.data.user._id}`);
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
      firstName: '',
      lastName: '',
      profileImg: '',
      markerColor: randomColor(),
      favouriteVehicle: '',
      bio: '',
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  const getBackgroundImageStyle = (profileImg) => ({
    backgroundImage: `url(${
      profileImg ? URL.createObjectURL(profileImg) : userDefaultImg
    })`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

  const backgroundImageStyle = useMemo(
    () => getBackgroundImageStyle(formikProps.values.profileImg),
    [formikProps.values.profileImg]
  );

  return (
    <div className="card p-3 shadow-lg" style={themeStyles.background}>
      <form
        className="text-center mb-3"
        autoComplete="off"
        onSubmit={formikProps.handleSubmit}
      >
        <div className="text-center my-5">
          <h2>Join the Community</h2>
          <p>
            To submit a vehicle you need to register.
            <br></br> Go on, tell us a bit about yourself!
          </p>
        </div>
        <hr></hr>
        <div>
          <div
            className="my-3 position-relative"
            style={{
              margin: 'auto',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              border: `3px solid ${formikProps.values.markerColor}`,
              ...backgroundImageStyle,
            }}
          >
            {formikProps.values.profileImg && (
              <button
                className=" btn btn-danger btn-sm position-absolute"
                style={{ left: '52%' }}
                type="button"
                onClick={(e) => {
                  formikProps.setFieldValue('profileImg', '');
                }}
              >
                Remove
              </button>
            )}
          </div>

          <div className="form-group mb-3">
            <input
              className={`btn btn-outline-secondary
                  ${
                    formikProps.errors.profileImg &&
                    formikProps.touched.profileImg
                      ? 'border-danger'
                      : ''
                  }`}
              type="button"
              value="Upload profile image"
              onClick={() => {
                document.querySelector('#profileImg').click();
              }}
            ></input>
            <input
              type="file"
              id="profileImg"
              name="profileImg"
              hidden
              onChange={(e) => {
                formikProps.setFieldValue('profileImg', e.target.files[0]);
              }}
              onBlur={formikProps.handleBlur}
            ></input>
          </div>
          {formikProps.errors.profileImg && formikProps.touched.profileImg && (
            <h6 className="text-danger m-3">
              {formikProps.errors.profileImg}
              <br></br>{' '}
              <a
                href="https://www.iloveimg.com/compress-image"
                target="_blank"
                rel="noreferrer"
              >
                Compress it here
              </a>
            </h6>
          )}
          <div className="form-group mb-3">
            <button
              type="button"
              className="btn btn-outline-secondary d-flex justify-content-center align-items-center mx-auto"
              onClick={() => {
                formikProps.setFieldValue('markerColor', randomColor());
              }}
            >
              Change Marker Color
              <span
                className="card"
                style={{
                  marginLeft: '10px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: `${formikProps.values.markerColor}`,
                }}
              ></span>
            </button>
          </div>
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="firstName">
            <b>First Name</b>
          </label>
          <input
            className={`form-control text-center
              ${
                formikProps.errors.firstName && formikProps.touched.firstName
                  ? 'border-danger'
                  : ''
              }`}
            value={formikProps.values.firstName}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            id="firstName"
            ref={firstInput}
            type="text"
            placeholder="Enter you first name"
            maxLength="25"
          ></input>
          {formikProps.errors.firstName && formikProps.touched.firstName && (
            <h6 className="text-danger mt-1">{formikProps.errors.firstName}</h6>
          )}
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="lastName">
            <b>Last Name</b>
          </label>
          <input
            className={`form-control text-center
                  ${
                    formikProps.errors.lastName && formikProps.touched.lastName
                      ? 'border-danger'
                      : ''
                  }`}
            value={formikProps.values.lastName}
            onChange={formikProps.handleChange}
            id="lastName"
            type="text"
            placeholder="Enter you last name"
            maxLength="25"
            onBlur={formikProps.handleBlur}
          ></input>
          {formikProps.errors.lastName && formikProps.touched.lastName && (
            <h6 className="text-danger mt-1">{formikProps.errors.lastName}</h6>
          )}
        </div>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="favouriteVehicle">
            <b>Favourite Vehicle</b>
          </label>
          <input
            className={`form-control text-center
                  ${
                    formikProps.errors.favouriteVehicle &&
                    formikProps.touched.favouriteVehicle
                      ? 'border-danger'
                      : ''
                  }`}
            value={formikProps.values.favouriteVehicle}
            onChange={formikProps.handleChange}
            id="favouriteVehicle"
            type="text"
            placeholder="Enter you favourite vehicle"
            maxLength="50"
            onBlur={formikProps.handleBlur}
          ></input>
          {formikProps.errors.favouriteVehicle &&
            formikProps.touched.favouriteVehicle && (
              <h6 className="text-danger mt-1">
                {formikProps.errors.favouriteVehicle}
              </h6>
            )}
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="favouriteVehicle">
            <b>Personal Bio</b>
          </label>
          <textarea
            className={`form-control text-center
                  ${
                    formikProps.errors.bio && formikProps.touched.bio
                      ? 'border-danger'
                      : ''
                  }`}
            value={formikProps.values.bio}
            onChange={formikProps.handleChange}
            id="bio"
            rows="4"
            placeholder="Tell us a little about yourself"
            maxLength="300"
            onBlur={formikProps.handleBlur}
          ></textarea>
          {formikProps.errors.bio && formikProps.touched.bio && (
            <h6 className="text-danger mt-1">{formikProps.errors.bio}</h6>
          )}
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="email">
            <b>Email</b>
          </label>
          <input
            className={`form-control text-center
                  ${
                    formikProps.errors.email && formikProps.touched.email
                      ? 'border-danger'
                      : ''
                  }`}
            value={formikProps.values.email}
            onChange={formikProps.handleChange}
            id="email"
            type="email"
            placeholder="Enter you email"
            maxLength="70"
            onBlur={formikProps.handleBlur}
          ></input>
          {formikProps.errors.email && formikProps.touched.email && (
            <h6 className="text-danger mt-1">{formikProps.errors.email}</h6>
          )}
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="password">
            <b>Password</b>
          </label>
          <input
            className={`form-control text-center
                  ${
                    formikProps.errors.password && formikProps.touched.password
                      ? 'border-danger'
                      : ''
                  }`}
            value={formikProps.values.password}
            onChange={formikProps.handleChange}
            id="password"
            type="password"
            placeholder="Enter you password"
            maxLength="50"
            onBlur={formikProps.handleBlur}
          ></input>
          {formikProps.errors.password && formikProps.touched.password && (
            <h6 className="text-danger mt-1">{formikProps.errors.password}</h6>
          )}
        </div>
        <div>
          <button
            disabled={formikProps.isSubmitting}
            type="submit"
            className={`btn ${
              formikProps.isSubmitting ? 'btn-success' : 'btn-outline-success'
            }`}
            style={{ minWidth: '100px' }}
          >
            {formikProps.isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
    </div>
  );
};

export default RegisterForm;
