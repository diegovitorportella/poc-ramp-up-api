import mongoose from "mongoose"; // Corrigido: import 'mongoose'

async function conectaNaDataBase() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);

    return mongoose.connection; // Corrigido: 'mongoose.connection'
};

export default conectaNaDataBase;