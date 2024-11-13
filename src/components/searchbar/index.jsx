/* eslint-disable react/prop-types */
import { CiSearch } from 'react-icons/ci';
import './style.css';

export default function Searchbar({ searchValue, handleChange }) {
  return (
    <>
      <h1>Searchbar implementation here</h1>
      <div>
        <form className="searchbar-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for an interview..."
            value={searchValue}
            onChange={handleChange}
          />

          <CiSearch className="icon" />
        </form>
      </div>
    </>
  );
}
