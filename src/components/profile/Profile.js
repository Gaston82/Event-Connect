import React, { useState,useEffect }from 'react';
import { editProfile } from '../../logic/User';
import { useSelector } from 'react-redux';
import './Profile.scss'
import { uploadFile, UPLOAD_STATUS } from '../../services/storage';



const Profile = () => {
    
    const user = useSelector(state => state.user)

if(user){
    console.log(" user en pagina profile",user);

}

    const [userProfile,setUserProfile] = useState(user);

    useEffect(() => {
    setUserProfile(user);
        
    }, [user])
    
    

    const handleFormSumit= async(event)=>{
      event.preventDefault();
      editProfile("profiles",user.id,userProfile)
      console.log("profile edit");
    }

    const handleUploadFile = (event)=>{
        const { files } = event.target;
        const file = files.length > 0 ? files [0] : null;

        if(file){
            uploadFile('profiles',file, (result)=>{
                if (result.status === UPLOAD_STATUS.FINISHED){
                    setUserProfile({...userProfile,image:result.url})
                }
                console.log("foto profiles",files);

            })
        }
        
    }

    const updateUserProfile = (name,value) =>{
      const newUserProfile = {
          ...userProfile,
          [name]:value
      }
      setUserProfile(newUserProfile);
    }

   
    return (
        <> 
        <form className="form-signup" onSubmit={handleFormSumit}>
                <h1>Profile</h1>
                {userProfile ? (
                    <>
                    {userProfile.image && <img src={userProfile.image} alt="" className = "profile__img"/>}
                    <label htmlFor="image">Image</label>
                    <input type="image" id="image" type = 'file'
                    onChange={handleUploadFile} />

                    <label htmlFor="name">Nombre</label>
                    <input type="name" id="name" value={userProfile.name}
                    onChange={(event)=>updateUserProfile('name',event.target.value)} />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={userProfile.email}
                    onChange={(event)=>updateUserProfile('email',event.target.value)} />

                    <label htmlFor="">City</label>
                    <input type="text" id="city" value={userProfile.city}
                    onChange={(event)=>updateUserProfile('city',event.target.value)}/>

                    <label htmlFor="">Age</label>
                    <input type="text" id="age" value={userProfile.age}
                    onChange={(event)=>updateUserProfile('age',event.target.value)}/>
                    
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