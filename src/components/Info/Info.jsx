import "./Info.css";
import { getData } from "../../utils/helpers.js";

function Info({ selected }) {
  if (selected) {
    getData(`https://pokeapi.co/api/v2/pokemon/${selected}`).then((data) => {
      console.log(data);
    });
  }
  return <div className="Info">{selected}</div>;
}

export default Info;
