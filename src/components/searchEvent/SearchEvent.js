import React, {  useState } from 'react';
const SearchEvent = () => {

    const [inputValue,setInputValues] = useState()

    const handleChange = (e) =>{
    setInputValues(e.target.value)
    }

    return (
        <form>
            <input
            type='text'
            value={inputValue}
            onChange={handleChange}
            ></input>
            <button>Go!!</button>
        </form>
      );
}
 
export default SearchEvent;