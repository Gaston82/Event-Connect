import React, {  useState } from 'react';
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
            ></input>
           <input type="submit" value="Submit" />
        </form>
      );
}
 
export default SearchEvent;