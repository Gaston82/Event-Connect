import React,{ useEffect,useState } from 'react';
import { loginUser } from '../logic/User';


const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');

    const handleFormSumit= async(event)=>{
      event.preventDefault();
      setError('');

      if(!email || !password){
          setError('Email y Password obligatorios')
          return;
      }
      const result = await loginUser(email,password);
      if(!result.succes){
          setError(result.message)
      }
    }

    return (
        <>
        <h1>Login de Usuarios</h1>
        <form onSubmit={handleFormSumit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email}
                onChange={(event)=>setEmail(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password}
                onChange={(event)=>setPassword(event.target.value)}
                />
            </div>
            <button
            type="submit"
            >Registrarme</button>
        </form>
        {error !=='' &&<span>{error}</span>}
        </>
    );
}
 
export default Login;