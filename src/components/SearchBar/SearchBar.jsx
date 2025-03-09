import { useState } from "react";
import { toast } from "react-hot-toast";
import PropTypes from 'prop-types'; 

const SearchBar = ({onSubmit}) => {
  const [query, setQuery] = useState("");

 

  const handleSubmit = (event) => {
    event.preventDefault();
   
    if (query.trim() === '') {
      toast.error('Please enter a search term!');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images and photos"
          autoComplete="off"
          autoFocus
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,  
};
export default SearchBar;
