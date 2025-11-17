import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, "O primeiro nome do(a) usuário é obrigatório"],
        trim: true, // Lida com espaço acidental
        minlength: [3, "O primeiro nome deve ter no mínimo 3 caracteres"],
        maxlength: [50, "O primeiro nome deve ter no máximo 50 caracteres"]
    },
    lastName: { 
        type: String, 
        required: [true, "O último nome do(a) usuário é obrigatório"],
        trim: true,
        minlength: [3, "O último nome deve ter no mínimo 3 caracteres"],
        maxlength: [50, "O último nome deve ter no máximo 50 caracteres"]
    },
    age: {
        type: Number,
        min: [0, "Idade inválida"],
    },
    email: {
        type: String,
        required: [true, "O email é obrigatório"], // Você também pode querer que ele seja obrigatório
        trim: true, // Remove espaços em branco do início e fim
        lowercase: true, // Salva o email sempre em minúsculas
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, forneça um endereço de email válido']
    }
}, { versionKey: false });

const usuario = mongoose.model("Usuario", usuarioSchema);

export default usuario;