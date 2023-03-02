import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../schemas/index.js';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const { themeStyles } = useContext(ThemeContext);
  const firstInput = useRef(null);
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleError = (error) => {
    firstInput.current.focus();
    setErrorMsg(error);
    setTimeout(() => {
      setErrorMsg('');
    }, 3000);
  };

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post('/api/auth/login', values);
      const user = res.data.user;
      setIsLoggedIn(true);
      setUser(user);
      navigate(`/users/${res.data.user._id}`);
      actions.resetForm();
    } catch (error) {
      actions.resetForm();
      if (error.response.status === 400) {
        handleError(error.response.data.error);
      } else {
        handleError('Opps something went wrong here, try again later.');
      }
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });
  return (
    <div
      className="card p-3 text-center shadow-lg"
      style={themeStyles.background}
    >
      <form
        className="text-center mb-3"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="text-center my-3">
          <h2>Login</h2>
        </div>
        <hr></hr>

        <div className="form-group my-3">
          <label className="form-label" htmlFor="email">
            <b>Email</b>
          </label>
          <input
            className={`form-control text-center
            ${errors.email && touched.email ? 'border-danger' : ''}`}
            value={values.email}
            onChange={handleChange}
            id="email"
            ref={firstInput}
            type="email"
            placeholder="Enter you email"
            onBlur={handleBlur}
          ></input>
          {errors.email && touched.email && (
            <h6 className="text-danger mt-1">{errors.email}</h6>
          )}
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="password">
            <b>Password</b>
          </label>
          <input
            className={`form-control text-center
            ${errors.password && touched.password ? 'border-danger' : ''}`}
            value={values.password}
            onChange={handleChange}
            id="password"
            type="password"
            placeholder="Enter you password"
            onBlur={handleBlur}
          ></input>
          {errors.password && touched.password && (
            <h6 className="text-danger mt-1">{errors.password}</h6>
          )}
        </div>
        <div>
          <button
            disabled={isSubmitting}
            type="submit"
            className={`btn ${
              isSubmitting ? 'btn-success' : 'btn-outline-success'
            }`}
            style={{ minWidth: '100px' }}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
      <div>
        <p>Not a member? Register below</p>
        <Link
          to={'/register'}
          className="btn btn-outline-secondary mb-3"
          style={{ width: '100px' }}
        >
          Register
        </Link>
      </div>
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
    </div>
  );
};

export default LoginForm;
