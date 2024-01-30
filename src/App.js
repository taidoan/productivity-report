import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function App() {
  return (
    <div className="w-11/12 xl:w-3/5 mx-auto">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
