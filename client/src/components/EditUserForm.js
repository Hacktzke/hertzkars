import React, { useState, useContext, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import userDefaultImg from '../assets/userImg.jpg';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { updateUserSchema } from '../schemas/index.js';
import axios from 'axios';
import ModalCard from './ModalCard';

const EditUserForm = () => {
  const navigate = useNavigate();
  const markerColorInput = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const { setIsLoggedIn, user, setUser } = useContext(AuthContext);
  const { themeStyles } = useContext(ThemeContext);

  const handleError = (error) => {
    setErrorMsg(error);
    setTimeout(() => {
      setErrorMsg('');
    }, 3000);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/users/${user._id}`);
      const { auth } = res.data;
      if (res.status === 200) {
        navigate(`/`);
        setIsLoggedIn(auth);
      }
    } catch (error) {
      setIsDeletePopup(false);
      if (error.response.status === 404) {
        handleError(error.response.data.message);
      } else if (error.response.status === 500) {
        handleError(error.response.data.message);
      }
    }
  };

  const onSubmit = async (values) => {
    try {
      const editedUser = { ...values };
      !editedUser.favouriteVehicle && delete editedUser.favouriteVehicle;
      !editedUser.bio && delete editedUser.bio;
      !editedUser.newPassword && delete editedUser.newPassword;

      const res = await axios.put('/api/users', editedUser, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { auth, updatedUser } = res.data;
      if (!auth) {
        setIsLoggedIn(false);
        navigate('/login');
      } else {
        setUser(updatedUser);
        navigate(`/users/${updatedUser._id}`);
      }
    } catch (error) {
      if (error.response.status === 500) {
        handleError('Opps something went wrong here, try again later.');
      } else {
        handleError(error.response.data.message);
      }
    }
  };

  const formikProps = useFormik({
    initialValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      profileImg: user.profileImg || '',
      markerColor: user.markerColor || '',
      favouriteVehicle: user.favouriteVehicle || '',
      bio: user.bio || '',
      email: user.email || '',
      currentPassword: '',
      newPassword: '',
      id: user._id || '',
    },
    enableReinitialize: true,
    validationSchema: updateUserSchema,
    onSubmit,
  });

  const getBackgroundImageStyle = (profileImg) => ({
    backgroundImage: `url(${
      formikProps.values.profileImg
        ? formikProps.values.profileImg.url ||
          URL.createObjectURL(formikProps.values.profileImg)
        : userDefaultImg
    })`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

  const backgroundImageStyle = useMemo(
    () => getBackgroundImageStyle(formikProps.values.profileImg),
    [formikProps.values.profileImg]
  );

  return (
    <div className="position-relative">
      {isDeletePopup && (
        <ModalCard>
          <div className="card-body text-center">
            <div className="m-3">
              Are you sure you want to delete your profile?<br></br>This will
              also delete your vehicles.
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
      <div className="card p-3 shadow-lg" style={themeStyles.background}>
        <form
          className="text-center mb-3"
          autoComplete="off"
          onSubmit={formikProps.handleSubmit}
        >
          <div className="text-center mt-3 mb-5">
            <h2>Edit your Profile</h2>
            <p>
              Something not quite right? <br></br> Edit your profile below.
            </p>
            <hr></hr>
          </div>
          <div>
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
                value={
                  formikProps.values.profileImg
                    ? 'Update your Profile Image'
                    : 'Add a Profile Image'
                }
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
                  e.target.files.length &&
                    formikProps.setFieldValue('profileImg', e.target.files[0]);
                }}
                onBlur={formikProps.handleBlur}
              ></input>
            </div>
            {formikProps.errors.profileImg &&
              formikProps.touched.profileImg && (
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
          </div>
          <div className="form-group mb-3">
            <button
              type="button"
              className="btn btn-outline-secondary d-flex justify-content-center align-items-center mx-auto"
              onClick={() => {
                markerColorInput.current.click();
              }}
            >
              Change Marker Color
              <input
                type="color"
                ref={markerColorInput}
                value={formikProps.values.markerColor}
                onBlur={formikProps.handleBlur}
                onChange={formikProps.handleChange}
                id="markerColor"
                style={{
                  marginLeft: '10px',
                  width: '30px',
                  height: '30px',
                }}
              ></input>
            </button>
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="firstName">
              First Name
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
              type="text"
              placeholder="Enter you first name"
              maxLength="25"
            ></input>
            {formikProps.errors.firstName && formikProps.touched.firstName && (
              <h6 className="text-danger mt-1">
                {formikProps.errors.firstName}
              </h6>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="lastName">
              Last Name
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
              <h6 className="text-danger mt-1">
                {formikProps.errors.lastName}
              </h6>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="favouriteVehicle">
              Favourite Vehicle
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
              Personal Bio
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
              Email
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
            <label className="form-label" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              className={`form-control text-center
                  ${
                    formikProps.errors.currentPassword &&
                    formikProps.touched.currentPassword
                      ? 'border-danger'
                      : ''
                  }`}
              value={formikProps.values.currentPassword}
              onChange={formikProps.handleChange}
              id="currentPassword"
              type="password"
              placeholder="Enter your current password"
              maxLength="50"
              onBlur={formikProps.handleBlur}
            ></input>
            {formikProps.errors.currentPassword &&
              formikProps.touched.currentPassword && (
                <h6 className="text-danger mt-1">
                  {formikProps.errors.currentPassword}
                </h6>
              )}
          </div>

          <div className="form-group mb-3">
            <label className="form-label" htmlFor="newPassword">
              New Password
            </label>
            <input
              className={`form-control text-center
                  ${
                    formikProps.errors.password && formikProps.touched.password
                      ? 'border-danger'
                      : ''
                  }`}
              value={formikProps.values.newPassword}
              onChange={formikProps.handleChange}
              id="newPassword"
              type="password"
              placeholder="Enter a new password if you wish to change it"
              onBlur={formikProps.handleBlur}
            ></input>
            {formikProps.errors.newPassword &&
              formikProps.touched.newPassword && (
                <h6 className="text-danger mt-1">
                  {formikProps.errors.newPassword}
                </h6>
              )}
          </div>
          <div>
            <Link
              to={`/users/${user._id}`}
              className="btn btn-outline-secondary mb-3 my-auto"
              style={{ width: '100px' }}
            >
              Cancel
            </Link>
          </div>

          <div>
            <button
              disabled={formikProps.isSubmitting}
              type="submit"
              className={`btn mb-3 ${
                formikProps.isSubmitting ? 'btn-success' : 'btn-outline-success'
              }`}
              style={{ minWidth: '100px' }}
            >
              {formikProps.isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </div>
          <div>
            <Link
              className="btn btn-outline-danger"
              style={{ minWidth: '100px' }}
              onClick={() => {
                setIsDeletePopup(true);
              }}
            >
              Delete Profile
            </Link>
          </div>
        </form>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      </div>
    </div>
  );
};

export default EditUserForm;
