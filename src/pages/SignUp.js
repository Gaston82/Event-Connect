import React,{ useState } from 'react';
import { registerUser } from '../logic/User';
import { useHistory } from 'react-router-dom';
import './SignUp.scss';

const SignUp = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [error,setError]=useState('');
    const [myEvents,setMyEvents] = useState([]);
    //Preguntar como meter myEvents sin utilizar un useState

    const history = useHistory();

    const handleFormSumit= async(event)=>{
      event.preventDefault();
      setError('');

      if(!email || !password||!name){
          setError('Email y Password obligatorios')
          return;
      }
      const result = await registerUser(email,password,name,myEvents);
      if(!result.succes){
          setError(result.message)
      }else{
          history.push('/home')
      }
    }

    return (
        <>
        
        <form className="form-signup" onSubmit={handleFormSumit}>
                <h1>Register</h1>
                <label htmlFor="name">Nombre</label>
                <input type="name" id="name" value={name}
                onChange={(event)=>setName(event.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email}
                onChange={(event)=>setEmail(event.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password}
                onChange={(event)=>setPassword(event.target.value)}
                />
            <button
            type="submit"
            >Registrarme</button>
        </form>
        {error !=='' &&<span>{error}</span>}
        </>
    );
}
 
export default SignUp;