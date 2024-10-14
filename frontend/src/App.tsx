import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/custom/Layout";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
