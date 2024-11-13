/* eslint-disable react/prop-types */
import { CiSearch } from 'react-icons/ci';
import './style.css';

export default function Searchbar({ searchValue, handleChange }) {
  return (
    <>
      <div>
        <form className="searchbar-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for an interview..."
            value={searchValue}
            onChange={handleChange}
          />

          <CiSearch className="searchbar-icon" />
        </form>
      </div>
    </>
  );
}
