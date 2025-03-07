import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";

// v2vQTrXbyDzcqvEXTKuO8vc6HDjsQov7FkTdJF-pWrE

const App = () => {
  return (
    <>
      <Toaster />
      <SearchBar />
    </>
  );
};

export default App;
