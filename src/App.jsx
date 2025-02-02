import React from "react";
import Header from "./Header.jsx";
import ProfilePicture from "./PortfolioPicture.jsx";
import Experience from "./Experience.jsx";
import Footer from "./Footer.jsx";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Header />
      <section id="profile-picture">
        <ProfilePicture />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <Footer />
    </div>
  );
}

export default App;
