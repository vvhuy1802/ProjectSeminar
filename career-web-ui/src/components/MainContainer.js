import React from "react";
import { Search, Value, Associated,SuggestJob } from "./index";
const MainContainer = () => {
  return (
    <div>
      <Search />
      <SuggestJob />
      <Associated />
      <Value />
    </div>
  );
};

export default MainContainer;
