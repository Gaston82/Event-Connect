import { registro, login,registerAuthObserver,salir } from '../services/auth.js';
import { createNewWithId, getById,updateElement} from '../services/data';

const ERROR_MESSAGES = {
    'auth/weak-password': 'La contraseña debe tener como mínimo 6 caracteres',
    'auth/email-already-in-use': 'Email ya utilizado',
    'auth/wrong-password': 'Usuario y/o contraseña incorrectos',
}

const PROFILES_COLLECTION = 'profiles';

export async function registerUser(email,password,name,myEvents){
    const result = await registro(email,password);
    
    if(result.succes){
        const profileResult = createNewWithId(PROFILES_COLLECTION, { email,name,myEvents},result.id)
        return { succes: profileResult }
    }else{
        const message = ERROR_MESSAGES[result.error]?ERROR_MESSAGES[result.error]:"error inesperado"
        return { succes: false, message}
    }
}

export async function loginUser(email,password){
    const result = await login(email,password);
    if(result.succes){
        return {succes : true}
    }else{
        console.log("loginUser =>",result.error);
        
        const message = ERROR_MESSAGES[result.error]?ERROR_MESSAGES[result.error]:"error inesperado"
        return { succes: false, message}
    }
}

export  function registerUserObserver(callback){
    registerAuthObserver(callback)
}

export async function getUserById(id){
    const result = await getById(PROFILES_COLLECTION,id);
    return result;
}

export async function signout(){
    const result = await salir();
    return result.succes;
}

export async function editProfile(PROFILES_COLLECTION,id,{ age,city,name}){
    
    const result = await updateElement(PROFILES_COLLECTION,id,{age,city,name});
    console.log(result);

    return result;
}