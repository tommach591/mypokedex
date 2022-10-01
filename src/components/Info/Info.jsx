import "./Info.css";
import { getData } from "../../utils/helpers.js";
import { useState, useEffect } from "react";

function Info({ selected }) {
  const [lastSelected, setLastSelected] = useState();
  const [pokemonData, setPokemonData] = useState();

  const GetSprites = () => {
    return (
      <div className="PokemonSprites">
        <div className="Grid">
          {pokemonData.sprites.front_default ? (
            <img src={pokemonData.sprites.front_default} alt="N/A" />
          ) : (
            <div />
          )}
          {pokemonData.sprites.back_default ? (
            <img src={pokemonData.sprites.back_default} alt="N/A" />
          ) : (
            <div />
          )}
          {pokemonData.sprites.front_female ? (
            <img src={pokemonData.sprites.front_female} alt="N/A" />
          ) : (
            <div />
          )}
          {pokemonData.sprites.back_female ? (
            <img src={pokemonData.sprites.back_female} alt="N/A" />
          ) : (
            <div />
          )}
          {pokemonData.sprites.front_shiny ? (
            <img src={pokemonData.sprites.front_shiny} alt="N/A" />
          ) : (
            <div />
          )}
          {pokemonData.sprites.back_shiny ? (
            <img src={pokemonData.sprites.back_shiny} alt="N/A" />
          ) : (
            <div />
          )}
          {pokemonData.sprites.front_shiny_female ? (
            <img src={pokemonData.sprites.front_shiny_female} alt="N/A" />
          ) : (
            <div />
          )}
          {pokemonData.sprites.back_shiny_female ? (
            <img src={pokemonData.sprites.back_shiny_female} alt="N/A" />
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  };

  const GetName = () => {
    let formatted = "";
    selected.split("-").forEach((e) => {
      formatted += e.charAt(0).toUpperCase() + e.slice(1) + " ";
    });

    return <h3 className="PokemonName">{`#${pokemonData.id} ${formatted}`}</h3>;
  };

  const GetType = () => {
    let listOfTypes = [];
    pokemonData.types.forEach((type) => {
      let t = type.type.name;
      listOfTypes.push(
        <div className="Type" key={t}>
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </div>
      );
    });
    return (
      <div className="PokemonTypes">
        <h3>Type(s):</h3>
        {listOfTypes}
      </div>
    );
  };

  const GetAbilities = () => {
    let listOfAbilities = [];
    pokemonData.abilities.forEach((ability) => {
      let a = ability.ability.name;
      let formatted = "";
      a.split("-").forEach((e, i) => {
        formatted += e.charAt(0).toUpperCase() + e.slice(1) + " ";
      });
      listOfAbilities.push(
        <div className="Ability" key={a}>
          {formatted}
        </div>
      );
    });
    return (
      <div className="PokemonAbilities">
        <h3>Abilities(s):</h3>
        {listOfAbilities}
      </div>
    );
  };

  const GetMoves = () => {
    let listOfMoves = [];
    pokemonData.moves.forEach((move) => {
      let m = move.move.name;
      let formatted = "";
      m.split("-").forEach((e, i) => {
        formatted += e.charAt(0).toUpperCase() + e.slice(1) + " ";
      });
      listOfMoves.push(
        <div className="Move" key={m}>
          {formatted}
        </div>
      );
    });
    return (
      <div className="PokemonMoves">
        <h3>Move(s):</h3>
        {listOfMoves}
      </div>
    );
  };

  useEffect(() => {
    const updateInfo = () => {
      if (selected && selected !== lastSelected) {
        getData(`https://pokeapi.co/api/v2/pokemon/${selected}`).then(
          (data) => {
            setLastSelected(selected);
            setPokemonData(data);
          }
        );
      } else if (selected === "") {
        setLastSelected(null);
        setPokemonData(null);
      }
    };

    updateInfo();
  }, [selected, lastSelected, pokemonData]);

  return (
    <div className="Info">
      {pokemonData ? (
        <div className="Found">
          <GetName />
          <GetSprites />
          <GetType />
          <GetAbilities />
          <GetMoves />
        </div>
      ) : (
        <div className="NotFound">
          <h2>Not Found</h2>
        </div>
      )}
    </div>
  );
}

export default Info;
