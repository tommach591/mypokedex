import "./List.css";
import { getData } from "../../utils/helpers.js";
import { useEffect, useState, useRef } from "react";
import Pokemon from "../Pokemon";

function List({ search, selected, setSelected }) {
  const listInnerRef = useRef();
  const [lastUrl, setLastUrl] = useState();
  const [url, setUrl] = useState();
  const [nextUrl, setNextUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
  );
  const [list, setList] = useState([]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setUrl(nextUrl);
      }
    }
  };

  useEffect(() => {
    const nextPokemonList = () => {
      getData(url).then((data) => {
        let prevList = [...list];
        data.results.forEach((pkmn) => {
          prevList.push(
            <Pokemon
              key={pkmn.name}
              name={pkmn.name}
              setSelected={setSelected}
            />
          );
        });
        setList(prevList);
        setLastUrl(url);
        setNextUrl(data.next);
      });
    };

    if (!lastUrl) {
      setUrl(nextUrl);
    }

    if (url && lastUrl !== url) nextPokemonList();
  }, [url, nextUrl, lastUrl, list, setSelected]);

  return (
    <div className="List" onScroll={onScroll} ref={listInnerRef}>
      {list}
    </div>
  );
}

export default List;
