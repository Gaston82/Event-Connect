import React,{ useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRealTime } from '../../services/data';




const Chat = (props) => {

    const user = useSelector(state => state.user);
    let { id } = useParams();

    const [chat,setChat] = useState({id: '', name: '', content: ''});
    const [input,setInput] = useState('');


   useEffect(()=>{
      const fetchMessages = async() =>{
           getRealTime(id,(dbMessages) =>{
    
               setChat(dbMessages);
           })
       }
       fetchMessages();
   },[])


    const handleInput = (e) =>{
     setInput({
         ...chat,
         [e.target.name]:e.target.value
     })
    }

    const handleMessage = (e) =>{
        e.preventDefault();
        
    }
   
    
    return ( 
        <>
        <div>messagge</div>
        <form onSubmit ={handleMessage}>
            <input type="text" name = "content" value= {chat.content}
            onChange = {handleInput}
            ></input>
            <button>send</button>

        </form>
        </>
     );
}
 
export default Chat;

/*
 useEffect(() => {
        setMessage(user);
            
        }, [user])

*/