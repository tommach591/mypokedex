import "./Pokemon.css";
import { useState, useEffect, useRef } from "react";

function Pokemon({ name, setSelected }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div
      className={active ? "Pokemon Active" : "Pokemon Inactive"}
      onClick={() => {
        setActive(true);
        setSelected(name);
      }}
      ref={ref}
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </div>
  );
}

export default Pokemon;
