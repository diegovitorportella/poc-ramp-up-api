import Joi from 'joi';

export const userSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required().messages({
    'string.min': 'First name must have at least 3 characters',
    'string.max': 'First name must have at most 50 characters',
    'any.required': 'First name is required'
  }),
  lastName: Joi.string().min(3).max(50).required().messages({
    'string.min': 'Last name must have at least 3 characters',
    'string.max': 'Last name must have at most 50 characters',
    'any.required': 'Last name is required'
  }),
  age: Joi.number().integer().min(0).messages({
    'number.min': 'Age must be greater than or equal to 0'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required'
  })
});