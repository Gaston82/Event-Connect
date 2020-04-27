import React, { useState }from 'react';
import { editProfile } from '../../logic/User';
import { useSelector } from 'react-redux';
import './Profile.scss'



const Profile = () => {
    
    const user = useSelector(state => state.user)

if(user){
    console.log(" user en pagina profile",user);

}



    const [email,setEmail]=useState('');
    const [city,setCity]=useState('');
    const [name,setName]=useState('');
    const [age,setAge]=useState('');

    

    const handleFormSumit= async(event)=>{
      event.preventDefault();
     
      editProfile("profiles",user.id,{ age: age ,city: city ,name: name})
      console.log("profile edit");
    }
    

   
    return (
        <> 
        <form className="form-signup" onSubmit={handleFormSumit}>
                <h1>Profile</h1>
                {user ? (
                    <>
                    <label htmlFor="name">Nombre</label>
                    <input type="name" id="name" value={user.name}
                    onChange={(event)=>setName(event.target.value)} />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={user.email}
                    onChange={(event)=>setEmail(event.target.value)} />

                    <label htmlFor="">City</label>
                    <input type="text" id="city" value={user.city}
                    onChange={(event)=>setCity(event.target.value)}/>

                    <label htmlFor="">Age</label>
                    <input type="number" id="age" value={age}
                    onChange={(event)=>setAge(event.target.value)}/>
                    
                    </>
                ):('')}
                
                
               
            <button
            type="submit"
            >Add Changes</button>
        </form>
        </>
     )
}


export default Profile;


        
/*
const [profile,setProfile] = useState({name:'',age:'',city:''})     
{error !=='' &&<span>{error}</span>}


*/
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