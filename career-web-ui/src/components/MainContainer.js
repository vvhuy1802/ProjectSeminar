import React from "react";
import { Search, Value, Associated,SuggestJob } from "./index";
const MainContainer = () => {
  return (
    <div>
      <Search />
      <Associated />
      <SuggestJob />
      <Value />
    </div>
  );
};

export default MainContainer;
