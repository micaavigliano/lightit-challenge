import React from "react";
import "./App.css";
import UserProvider from "./context/UserDataProvider";
import CardsContainers from "./containers/CardsContainers";
import Header from "./containers/Header";

function App() {
  return (
    <UserProvider>
      <div data-testid="app-id">
        <Header />
        <main>
          <CardsContainers />
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
