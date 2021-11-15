import { useEffect, useState } from "react";
import "../CSS/SearchBar.css"
import History from "./History";
import { fetchDifferentUrl, fetchPokemonOfType } from "../fetchData";
let SearchSection = (props)=>{
    let [types,setType] = useState([]);
    let [pokemonName,SetPokemonName] = useState([]);
    let [prefix,setPrefix] = useState("");
    let [suggestedList,setSuggestedList] = useState([]);
    useEffect(async()=>{
        let res = await fetchDifferentUrl("https://pokeapi.co/api/v2/type/");
        setType(res.results);
        // console.log(types);
        
    },[]);
    useEffect(async()=>{
        let obj = await gettingNames();
        obj.sort();
        SetPokemonName(obj);
    },[types]);
    useEffect(async()=>{
    },[pokemonName]);

    useEffect(()=>{
        if(prefix === ""){
            setSuggestedList([]);
            props.setSearchPokemon("");
        }else{
            let arr = pokemonName.filter(name => {
                return name.startsWith(prefix)
            });
            console.log(arr);
            setSuggestedList(arr);
        }
    },[prefix])
    let gettingNames = async() =>{
        let obj = [];
        for(let i = 0; i < types.length ; i++){
            let type = types[i];
            let response = await fetchPokemonOfType(type.url);
            
            let arr = namesOfPokemon(response);
            obj = [...obj,...arr];
        }
        return obj;
    }

    let namesOfPokemon = (response)=>{
        
        let arr = response.pokemon.map((pokemonObj)=>{
            return pokemonObj.pokemon.name;
        })
        return arr;
    }
    return(
        <div>
            <div class="search-bar mb-3" >
                <input type="text" className="search-input"placeholder="Search Pokemon"
                value = {prefix}
                onChange = {(e)=>{
                    console.log(e.currentTarget.value);
                    setPrefix(e.currentTarget.value);
                }}/>
                
                
                <div className="search-list">
                {
                    suggestedList.map((value,i)=>{
                        return <div key={i} className="dropdown-item"
                        onClick={
                            (e)=>{
                                props.setSearchPokemon(e.currentTarget.innerText);
                                setSuggestedList([]);
                            }
                        }>{value}</div>
                    })
                }
                
                </div>

                
            </div>

            <div className = "second-search-bar justify-contend-end">
                <div className = "filter-container row">
                    <div class="dropdown col-9">
                        <div className="dropdown-select ">
                            <span className="select">Type</span>
                            <span class="material-icons">arrow_drop_down</span>
                        </div>
                        <div className="dropdown-list">
                            {
                                types.map((type,i)=>{
                                    return <div key={i} className="dropdown-item"
                                    onClick={
                                        (e)=>{
                                            props.setTypeSelected(e.currentTarget.innerText);
                                        }
                                    }>{type.name}</div>
                                })
                            }
                            
                
                        </div>
                    </div>

                    <div className="reset"
                        onClick = {()=>{
                            props.setTypeSelected("")
                        }  
                        }>
                        <span class="material-icons">refresh</span>
                    </div>
                    
                </div>
                <History></History>
            </div>
        </div>
    )
}

export default SearchSection;
