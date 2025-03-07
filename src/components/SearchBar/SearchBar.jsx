import { useState } from "react";
import { toast } from "react-hot-toast";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchText.trim() === "") {
      toast.error("Please enter text");
    } else {
      console.log("Пошук з текстом:", searchText);
    }
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchText}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </form>
      </header>
    </>
  );
};
export default SearchBar;
