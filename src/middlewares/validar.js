import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

export const validar = (schema) => {
  return (req, res, next) => {
    // abortEarly: false faz com que o Joi valide todos os campos e mostre todos os erros de uma vez
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const mensagensErro = error.details.map(detail => detail.message).join('; ');
      next(new RequisicaoIncorreta(mensagensErro));
    } else {
      next();
    }
  };
};