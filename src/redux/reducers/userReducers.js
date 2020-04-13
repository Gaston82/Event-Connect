export default function userReducer(state = null,action){
    switch (action.type){
        case 'SET_USER':{
            return action.user !==null ? { ...action.user } : null;
        }
        default: {
            return state;
        }
    }
}