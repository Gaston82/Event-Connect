import React, { useState }from 'react';
import {useHistory,useParams} from 'react-router-dom';
import { registerUser } from '../../logic/User';
import { useSelector } from 'react-redux';
import './Profile.scss'

const Profile = (params) => {
    

    let name = useParams();


    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [casa,setName]=useState('paco');
    const [error,setError]=useState('');
    
    
    const user = useSelector(state => state.user)
    const history = useHistory();
    



    const handleFormSumit= async(event)=>{
      event.preventDefault();
      setError('');

    }

   
    return (
        <> 
        <form className="form-signup" onSubmit={handleFormSumit}>
                <h1>Profile</h1>
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
            >Add Changes</button>
        </form>
        {error !=='' &&<span>{error}</span>}
        </>
     )
}


export default Profile;



    /*  if(!email || !password||!name){
          setError('Email y Password obligatorios')
          return;
      }
      const result = await registerUser(email,password,name);
      if(!result.succes){
          setError(result.message)
      }else{
          history.push('/home')
      }
    }
*/