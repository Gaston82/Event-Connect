 import { registro } from '../services/auth.js';

const ERROR_MESSAGES = {
    'auth/weak-password': 'La contraseña debe tener como mínimo 6 caracteres',
    'auth/email-already-in-use': 'Email ya utilizado'

}

export async function registerUser(email,password){
    const result = await registro(email,password);
    if(result.succes){
        return { succes: true}
    }else{
        const message = ERROR_MESSAGES[result.error]?ERROR_MESSAGES[result.error]:"error inesperado"
        return { succes: false, message}
    }
}