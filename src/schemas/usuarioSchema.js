import joi from 'joi';

export const usuarioSchema = joi.object({
  firstName: joi.string().min(3).max(50).required().messages({
    'string.min': 'O primeiro nome deve ter no mínimo 3 caracteres',
    'string.max': 'O primeiro nome deve ter no máximo 50 caracteres',
    'any.required': 'O primeiro nome é obrigatório'
  }),
  lastName: joi.string().min(3).max(50).required().messages({
    'string.min': 'O último nome deve ter no mínimo 3 caracteres',
    'string.max': 'O último nome deve ter no máximo 50 caracteres',
    'any.required': 'O último nome é obrigatório'
  }),
  age: joi.number().integer().min(0).messages({
    'number.min': 'A idade deve ser maior ou igual a 0'
  }),
  email: joi.string().email().required().messages({
    'string.email': 'Forneça um email válido',
    'any.required': 'O email é obrigatório'
  })
});