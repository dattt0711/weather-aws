import React from "react";
import WeatherContainers from "./containers/WeatherContainers";
import Sidebars from "./pages/Sidebars";
function App() {

  return (
    <>
      <Sidebars>
        <WeatherContainers/>
      </Sidebars>
    </>
  );
}

export default App;
