import DetailCard from "./Components/DetailCard";
import SearchSection from "./Components/SearchSection";
import DisplaySection from "./Components/DisplaySection.jsx";
import "./CSS/App.css";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

function App() {
  let [selected,setSelected] = useState(null);
  let [typeSelected,setTypeSelected] = useState("");
  let [searchPokemon,setSearchPokemon] = useState("");
  let [history,setHistory] = useState([]);
  useEffect(()=>{
    console.log(history)
  },[history])
  return (
   
    <authContext.Provider value = {{setSelected,setHistory,history}}>
      <div className="background row">
        <div className = "left-container col-8">
          <SearchSection 
          setTypeSelected = {setTypeSelected}
          setSearchPokemon = {setSearchPokemon}></SearchSection>
          <DisplaySection 
          searchPokemon = {searchPokemon}
          typeWanted = {typeSelected}></DisplaySection>
        </div>
        <div className = "right-container col-4">
          <DetailCard pokemon = {selected}></DetailCard>
        </div>
        
        
      </div>
    </authContext.Provider>
    
  );
}

export default App;
