import "./App.css";
import Header from "../Header";
import SearchBar from "../SearchBar";
import Display from "../Display";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <Header />
      <div className="MainBox">
        <SearchBar search={search} setSearch={setSearch} />
        <Display search={search} />
      </div>
    </div>
  );
}

export default App;
