import "./Pokemon.css";
import { useState, useEffect, useRef } from "react";

function Pokemon({ name, pkmnID, selected, setSelected, found }) {
  const [active, setActive] = useState(found);
  const ref = useRef(null);

  let formatted = "";
  name.split("-").forEach((e) => {
    formatted += e.charAt(0).toUpperCase() + e.slice(1) + " ";
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
      }
    }

    if (active && selected !== name) {
      setSelected(name);
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
      {`${pkmnID}. ${formatted}`}
    </div>
  );
}

export default Pokemon;
