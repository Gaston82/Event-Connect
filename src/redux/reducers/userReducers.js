export default function userReducer(state = null,action){
    switch (action.type){
        case 'SET_USER':{
            return { ...action.user };
        }
        default: {
            return state;
        }
    }
}