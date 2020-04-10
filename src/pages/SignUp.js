import React,{ useEffect,useState } from 'react';
import { registerUser } from '../logic/User';


const SignUp = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [error,setError]=useState('');

    const handleFormSumit= async(event)=>{
      event.preventDefault();
      setError('');

      if(!email || !password||!name){
          setError('Email y Password obligatorios')
          return;
      }
      const result = await registerUser(email,password,name);
      if(!result.succes){
          setError(result.message)
      }
    }

    return (
        <>
        <h1>Registro de Usuarios</h1>
        <form onSubmit={handleFormSumit}>
        <div>
                <label htmlFor="name">Nombre</label>
                <input type="name" id="name" value={name}
                onChange={(event)=>setName(event.target.value)}
                />
            </div>
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
 
export default SignUp;