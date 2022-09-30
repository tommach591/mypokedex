import "./Display.css";
import List from "../List";
import Info from "../Info";
import { useState } from "react";

function Display({ search }) {
  const [selected, setSelected] = useState("");

  return (
    <div className="Display">
      <List search={search} selected={selected} setSelected={setSelected} />
      <Info selected={selected} />
    </div>
  );
}

export default Display;
