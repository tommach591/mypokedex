import "./SearchBar.css";
import MagnifyingGlass from "../../utils/magnifying_glass.svg";
import { useState, useEffect, useRef } from "react";

function SearchBar({ search, setSearch }) {
  const [isInside, setIsInside] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleUserKeyPress = (event) => {
      const { key, keyCode } = event;

      if (isInside) {
        if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {
          setSearch(`${search}${key}`);
        }
        if (keyCode === 8) {
          setSearch(search.slice(0, search.length - 1));
        }
      }
    };

    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsInside(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  return (
    <div
      className={isInside ? "SearchBar On" : "SearchBar Off"}
      ref={boxRef}
      onClick={() => {
        setIsInside(true);
      }}
    >
      <div className="Input">{search === "" ? "Search" : search}</div>
      <div className="Search">
        <img src={MagnifyingGlass} alt="Q" />
      </div>
    </div>
  );
}

export default SearchBar;
