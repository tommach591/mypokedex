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
  const [searchList, setSearchList] = useState([]);

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
              pkmnID={pkmn.url.slice(34, pkmn.url.length - 1)}
              selected={selected}
              setSelected={setSelected}
              found={false}
            />
          );
        });
        setList(prevList);
        setLastUrl(url);
        setNextUrl(data.next);
      });
    };

    const findPokemon = () => {
      getData(`https://pokeapi.co/api/v2/pokemon/${search}`).then((data) => {
        if (data !== 0) {
          let newList = [];
          newList.push(
            <Pokemon
              key={data.name}
              name={data.name}
              pkmnID={data.species.url.slice(42, data.species.url.length - 1)}
              selected={selected}
              setSelected={setSelected}
              found={true}
            />
          );
          setSearchList(newList);
        } else {
          let newList = [];
          newList.push(
            <div className="NotFound" key={newList.length}>
              <h2>Not Found</h2>
            </div>
          );
          setSelected("");
          setSearchList(newList);
        }
      });
    };

    if (!lastUrl) {
      setUrl(nextUrl);
    }

    if (search !== "") findPokemon();
    else if (url && lastUrl !== url) nextPokemonList();
  }, [url, nextUrl, lastUrl, list, search, selected, setSelected]);

  return (
    <div className="List" onScroll={onScroll} ref={listInnerRef}>
      {search ? (searchList.length > 0 ? searchList : []) : list}
    </div>
  );
}

export default List;
