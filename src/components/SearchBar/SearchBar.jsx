import "./SearchBar.css";
import MagnifyingGlass from "../../utils/magnifying_glass.svg";
import { useState, useEffect, useRef } from "react";

function SearchBar({ setSearch }) {
  const [entry, setEntry] = useState("");
  const [isInside, setIsInside] = useState(false);
  const boxRef = useRef(null);

  const adjustAndSet = () => {
    setSearch(entry.toLowerCase().replaceAll(" ", "-"));
    console.log(entry.toLowerCase().replaceAll(" ", "-"));
  };

  useEffect(() => {
    const handleUserKeyPress = (event) => {
      const { key, keyCode } = event;

      if (isInside) {
        if (
          keyCode === 32 ||
          (keyCode >= 65 && keyCode <= 90) ||
          (keyCode >= 48 && keyCode <= 57)
        ) {
          setEntry(`${entry}${key}`);
        }
        if (keyCode === 8) {
          setEntry(entry.slice(0, entry.length - 1));
        }
      }

      if (keyCode === 13) {
        adjustAndSet();
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
      <div className="Input">{entry === "" ? "Search" : entry}</div>
      <div
        className="Search"
        onClick={() => {
          adjustAndSet();
        }}
      >
        <img src={MagnifyingGlass} alt="Q" />
      </div>
    </div>
  );
}

export default SearchBar;
