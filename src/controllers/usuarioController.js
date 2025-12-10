import createUserUseCase from "../use-cases/CreateUserUseCase.js";
import listUsersUseCase from "../use-cases/ListUsersUseCase.js";
import getUserByIdUseCase from "../use-cases/GetUserByIdUseCase.js";
import updateUserUseCase from "../use-cases/UpdateUserUseCase.js";
import deleteUserUseCase from "../use-cases/DeleteUserUseCase.js";

class usuarioController {

    static listarUsuarios = async (req, res, next) => {
        try {
            const resultado = await listUsersUseCase.execute({
                query: req.query,
                page: req.query.pagina,
                limit: req.query.limite,
                order: req.query.ordenacao
            });
            
            res.status(200).json(resultado);
        } catch (erro) {
            next(erro);
        }
    };

    static listarUsuarioPorId = async (req, res, next) => {
        try {
            const usuario = await getUserByIdUseCase.execute(req.params.id);
            res.status(200).send(usuario);
        } catch (erro) {
            next(erro);
        }
    };

    static cadastrarUsuario = async (req, res, next) => {
        try {
            const novoUsuario = await createUserUseCase.execute(req.body);
            res.status(201).json({ message: "criado com sucesso", usuario: novoUsuario });
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarUsuario = async (req, res, next) => {
        try {
            const resposta = await updateUserUseCase.execute(req.params.id, req.body);
            res.status(200).send(resposta);
        } catch (erro) {
            next(erro);
        }
    };

    static excluirUsuario = async (req, res, next) => {
        try {
            const resposta = await deleteUserUseCase.execute(req.params.id);
            res.status(200).json(resposta);
        } catch (erro) {
            next(erro);
        }
    };
};

export default usuarioController;