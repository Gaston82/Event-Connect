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
      <div className="container row">
        <form onSubmit = {handleSubmit}>
          <div className="input-group">
            <input
            className="search-input"
            type="text"
            name="keyword"
            value={inputValue}
            onChange={handleChange}
            placeholder="Artista, evento o recinto"/>

            <button className="submit-button" type="submit" value="Submit">
              <FontAwesomeIcon icon={faSearch}/>
            </button>
          </div>
          </form>
        </div>
      );
}

export default SearchEvent;