import React, {  useState } from 'react';
import './SearchEvent.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
            <fieldset>
                <input
                type="text"
                name="keyword"
                value={inputValue}
                onChange={handleChange}
                placeholder="Artista, evento o recinto"
                ></input>
                <button
                type="submit"
                value="Submit">
                <FontAwesomeIcon icon={faSearch}/>
                </button>
            </fieldset>
        </form>
      );
}

export default SearchEvent;