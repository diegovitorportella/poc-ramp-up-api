import NaoEncontrado from "../erros/NaoEncontrado.js";
import {usuario} from "../models/index.js";

class usuarioController {

    //static async poder chamar os metodos sem instanciar
    static listarUsuarios = async (req, res, next) => {
        try {
            // 1. Pega os filtros da query (req.query)
            const { firstName, lastName, minAge, maxAge, email } = req.query;

            // 2. Monta o objeto de filtro
            const filtro = {};

            if (firstName) {
                filtro.firstName = { $regex: firstName, $options: 'i' }; 
            }
            if (lastName) {
                filtro.lastName = { $regex: lastName, $options: 'i' };
            }
            if (email) {
                filtro.email = { $regex: email, $options: 'i' };
            }
            if (minAge || maxAge) {
                filtro.age = {};
                if (minAge) filtro.age.$gte = minAge;
                if (maxAge) filtro.age.$lte = maxAge;
            }

            const queryBuscaUsuarios = usuario.find(filtro);
            
            req.resultado = queryBuscaUsuarios;

            next();

        } catch (erro) {
            next(erro);
        }
    };

    static async listarUsuarioPorId(req, res, next) {
        try {
            const id = req.params.id;
            const usuarioEncontrado = await usuario.findById(id);

            if (usuarioEncontrado !== null) {
                res.status(200).send(usuarioEncontrado);
            } else {
                next(new NaoEncontrado("ID do usuário não localizado"));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static cadastrarUsuario = async (req, res, next) => {
        //try catch manejo de erros e sucessos
        try {
            const novoUsuario = await usuario.create(req.body);

            res.status(201).json({
                message: "criado com sucesso", usuario:
                    novoUsuario
            });
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarUsuario = async (req, res, next) => {
        try {
            const id = req.params.id;

            const usuarioEncontrado = await usuario.findByIdAndUpdate(id, req.body);

            if (usuarioEncontrado !== null) {
                res.status(200).send({ message: "Autor atualizado com sucesso" });
            } else {
                next(new NaoEncontrado("Id do Autor não localizado."));
            }

        } catch (erro) {
            next(erro);
        }
    };

    //Remove um usuário
    static excluirUsuario = async (req, res, next) => {
        try {
            const id = req.params.id;

            const usuarioEncontrado = await usuario.findByIdAndDelete(id);
            if (usuarioEncontrado !== null) {
                res.status(200).json({ message: "Usuário excluído" });
            } else {
                next(new NaoEncontrado("Id do Autor não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    };
};

export default usuarioController;
