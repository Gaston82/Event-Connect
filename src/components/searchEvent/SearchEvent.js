import React, {  useState } from 'react';
import './SearchEvent.scss';

const SearchEvent = ({ setKeyword }) => {

    const [inputValue,setInputValues] = useState("")

    const handleChange = (e) =>{
    setInputValues(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setKeyword(inputValue);
    }

    return (
        <form
        onSubmit = {handleSubmit}
        >
            <input
            type="text"
            name="keyword"
            value={inputValue}
            onChange={handleChange}
            placeholder="evento"
            ></input>
           <button
            type="submit"
             value="Submit">
            GO!!
           </button>
        </form>
      );
}
 
export default SearchEvent;