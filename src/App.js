import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchList from "./components/SearchList";

class App extends Component {
  state = {
    visible: true
  };

  render() {
    return (
      <div className="App" style={{ paddingTop: "1rem" }}>
        <SearchList />
      </div>
    );
  }
}

export default App;
