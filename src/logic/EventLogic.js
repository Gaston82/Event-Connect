
import { getById,mergeArrayElement,addArrayEllement, removeArrayElement,removeArrayElement2 } from '../services/data';



    export async function createNewAsistente(collection, user, id) {
      console.log(collection);
      const result = await mergeArrayElement(collection,user,id);
    
  }

   export async function addMyEvents(collection, id, event= {eventId:'', eventName:'', eventImg:''}) {

    const result  = await addArrayEllement(collection,id,event);
  
  }

  export async function removeMyEvents(collection,id,event= {eventId:'', eventName:'', eventImg:''}){
    const result = await removeArrayElement(collection,id,event);
  }

  export async function removeAssistant(collection,user,id){
    const result = await removeArrayElement2(collection,user,id);
  }

  export async function getUserById(collection,id){
    const result = await getById(collection,id);
    return result;
}