import React from "react";

import CardList from "./components/CardList";

const App: React.FC = () => {
  return (
    <div id="App">
      <section className="conteiner">
        <h3 className="header">Ты сегодня покормил кота?</h3>
        <CardList />
      </section>
    </div>
  );
};

export default App;
