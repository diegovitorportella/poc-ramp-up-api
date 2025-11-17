import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase{
    constructor(mensagem = "Página não enontrada"){
        super(mensagem, 404);
    }
} 
export default NaoEncontrado;