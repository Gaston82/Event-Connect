import * as firebase from "firebase";

export async function registro(email,password){
    try{
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        return {succes:true};    
    }catch(error){
        console.log("registro=>error " , error);
        
        return {succes:false, error: error.code};    
        
    }
}
