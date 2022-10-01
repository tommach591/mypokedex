import "./Header.css";

function Header() {
  return (
    <div
      className="Header"
      onClick={() => {
        window.location.reload(false);
      }}
    >
      <h1>My Pokedex</h1>
    </div>
  );
}

export default Header;
