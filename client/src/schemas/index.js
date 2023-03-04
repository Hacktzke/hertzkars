import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
const emailRules =
  /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u;
const letterRegex = /^[A-Za-z.\s]+$/;
const letterNumberRegex = /^[A-Za-z0-9.\s]+$/;

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(25, 'Exceeds character limit.')
    .matches(letterRegex, 'Name must contain only letters.')
    .required('First name is required.'),
  lastName: yup
    .string()
    .max(25, 'Exceeds chracter limit.')
    .matches(letterRegex, 'Name must contain only letters.')
    .required('Last name is required.'),
  profileImg: yup
    .mixed()
    .test(
      'FILE_SIZE',
      'The image size is too big! Image must be less than 2MB',
      (value) => {
        if (value) {
          return value.size < 2000000;
        }
        return true;
      }
    )
    .test(
      'FILE_TYPE',
      'Invalid file type. Please use jpeg, jpg or png.',
      (value) => {
        if (value) {
          return ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type);
        }
        return true;
      }
    ),
  favouriteVehicle: yup
    .string()
    .matches(letterNumberRegex, 'Cannot contain symbols')
    .max(50, 'Must be less than 50 characters.'),
  bio: yup.string().max(400, 'Bio must be less than 400 characters.'),
  email: yup
    .string()
    .email()
    .max(70, 'Exceeded character amount')
    .matches(emailRules, { message: 'Must be a valid email...' })
    .required('Please enter your email.'),
  password: yup
    .string()
    .min(8)
    .max(50, 'Password too long.')
    .matches(passwordRules, {
      message:
        'The password must be a minimum eight characters, with at least one letter and one number.',
    })
    .required(
      'The password must be a minimum eight characters, with at least one letter and one number.'
    ),
});

export const updateUserSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(25, 'Exceeds character limit.')
    .matches(letterRegex, 'Name must contain only letters.')
    .required('First name is required.'),
  lastName: yup
    .string()
    .max(25, 'Exceeds character limit.')
    .matches(letterRegex, 'Name must contain only letters.')
    .required('Last name is required.'),
  profileImg: yup
    .mixed()
    .test(
      'FILE_SIZE',
      'The image size is too big! Image must be less than 2MB.',
      (value) => {
        if (value) {
          if (value.size) {
            return value.size < 2000000;
          }
        }
        return true;
      }
    )
    .test(
      'FILE_TYPE',
      'Invalid file type. Please use jpeg, jpg or png.',
      (value) => {
        if (value) {
          if (value.type) {
            return ['image/png', 'image/jpeg', 'image/jpg'].includes(
              value.type
            );
          }
        }
        return true;
      }
    ),
  favouriteVehicle: yup
    .string()
    .matches(letterNumberRegex, 'Cannot contain symbols')
    .max(50, 'Must be less than 50 characters.'),
  bio: yup.string().max(400, 'Bio must be less than 400 characters.'),
  email: yup
    .string()
    .email()
    .matches(emailRules, { message: 'Must be a valid email...' })
    .required('Please enter your email.'),
  currentPassword: yup
    .string()
    .min(8)
    .max(50, 'Password too long.')
    .matches(passwordRules, {
      message:
        'The password must be a minimum eight characters, with at least one letter and one number.',
    })
    .required('You must enter your password to update your profile.'),
  newPassword: yup
    .string()
    .min(8)
    .max(50, 'Password too long.')
    .matches(passwordRules, {
      message:
        'The password must be a minimum eight characters, with at least one letter and one number.',
    }),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(emailRules, { message: 'Must be a valid email...' })
    .required('Please enter your email.'),
  password: yup.string().min(8).required('Password required.'),
});

export const vehicleSchema = yup.object().shape({
  year: yup
    .number()
    .positive()
    .min(1900)
    .max(new Date().getFullYear())
    .required('Vehicle year is required.'),
  manufacture: yup.string().required('Manufacture required.'),
  model: yup
    .string()
    .max(50, 'Model must be less then 50 characters.')
    .matches(letterNumberRegex, 'Cannot contain symbols.')
    .required('Model required.'),
  urlName: yup.string(),
  color: yup
    .string()
    .max(20)
    .matches(letterRegex, 'Can only contain letters.')
    .required('Colour required.'),
  yearPurchased: yup.number().min(1900).max(new Date().getFullYear()),
  horsepower: yup
    .number()
    .positive('Must be a postive number')
    .min(1)
    .max(2000, "C'mon be realistic..."),
  description: yup.string().max(400, 'Maximum 400 characters allowed sorry...'),
  vehicleImg: yup
    .mixed()
    .test(
      'FILE_SIZE',
      'The image size is too big! Image must be less than 3MB',
      (value) => {
        if (value) {
          if (value.size) {
            return value.size < 3000000;
          }
        }
        return true;
      }
    )
    .test(
      'FILE_TYPE',
      'Invalid file type. Please use jpeg, jpg or png.',
      (value) => {
        if (value) {
          if (value.type) {
            return ['image/png', 'image/jpeg', 'image/jpg'].includes(
              value.type
            );
          }
        }
        return true;
      }
    ),
});
