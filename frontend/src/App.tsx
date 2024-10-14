import React from "react";
import ThemeSwitch from "./components/ThemeSwitch";

const App = () => {
  return (
    <>
      <div>
        <ThemeSwitch />
      </div>
      <button className="btn">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-link">Link</button>
    </>
  );
};

export default App;
