// import logo from "./logo.svg";
import "./App.css";
import HelloWorld from "./HelloWorld";
import MenuList from "./menu-list";

function App() {
  return (
    <div className="App">
      <HelloWorld />
      <MenuList />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;