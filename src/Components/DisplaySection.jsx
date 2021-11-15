import { useEffect, useState } from "react";
import SmallCard from "../Components/SmallCard";
import "../CSS/DisplaySection.css";
import { fetchData, fetchPokemonOfType, getPokemonRecord } from "../fetchData";


let DisplaySection = (props) => {
    let baseUrl = "https://pokeapi.co/api/v2/pokemon"
    let [pokemons, setPokemons] = useState([]);
    let [nextUrl, setNextUrl] = useState(baseUrl);
    let [isLoading, setLoading] = useState(true);
    let [currentStart,setcurrentStart] = useState(0); //used in filter for loading (currentStar + 20) pokemons 
    let [arrpok,setarrpok] = useState([]); //contains all pokemon of particular type, and them after scrolling to bottom load next 20 pokemons

    //when type of pokemon is changed
    useEffect(async () => {
        setcurrentStart(0);
        if(props.typeWanted !== ""){
            gettingTypePokemons();
        }else{
            setLoading(true);
            setPokemons([]);
            setNextUrl(baseUrl);
        }
        
    },[props.typeWanted]);

    //when searching pokemon
    useEffect(async()=>{
        if(props.searchPokemon !== ""){
            let record = await getPokemonRecord(`https://pokeapi.co/api/v2/pokemon/${props.searchPokemon}`);
            setPokemons([record]);
        }else{
            setLoading(true);
            setPokemons([]);
            setNextUrl(baseUrl);
        }
    },[props.searchPokemon]);

    //loading next 20 pokemons of particular type
    useEffect(()=>{
        let arr = [];
        for(let i = currentStart; i < Math.min(currentStart+20,arrpok.length);i++){
            arr.push(arrpok[i]);
        }
        setPokemons(arr);
    },[arrpok])

    //loading normally when hit the bottom
    useEffect(async () => {
        console.log(isLoading);
        loadingNextUrl();
    }, [isLoading]);

    //functions used in getting particular type of pokemons and loading next pokemons of that type
    let gettingTypePokemons = async() =>{
        let response = await fetchPokemonOfType(`https://pokeapi.co/api/v2/type/${props.typeWanted}`);

        let arr = await loadingPokemonOfType(response.pokemon);
        setarrpok(arr);
        loadingNextPokemons();
    }
    let loadingNextPokemons = () =>{
        let a = [];
        for(let i = currentStart; i < Math.min(currentStart+20,arrpok.length);i++){
            a.push(arrpok[i]);
        }
        setPokemons([...pokemons,...a]);
        setcurrentStart(Math.min(currentStart+20,arrpok.length));
    }
    let loadingPokemonOfType = async (data) =>{
        let pokemons = Promise.all(
            data.map(async(pokemonObj)=>{
                let record = await getPokemonRecord(pokemonObj.pokemon.url);
                return record;
            })
        )

        return pokemons;
    }
    // ****************************
    
    //for loading all pokemons and infinite scroll
    let loadingNextUrl = async () => {
        if (!isLoading) return;
        let response = await fetchData(nextUrl);
        setNextUrl(response.next);
        let arr = await loadingPokemon(response.results);
        let allPokemons = arr.filter((pok) => { return pok != null })
        setPokemons([...pokemons, ...allPokemons]);
        setLoading(false);
    }
    let loadingPokemon = async (data) => {
        let pokemons = Promise.all(
            data.map(async (pokemon) => {
                let record = await getPokemonRecord(pokemon.url);
                return record;
                
            })
        )
        return pokemons;
    }

    
    return (
        <div className="all-card-container" onScroll={
            (event) => {

                const bottom = Math.ceil(event.target.scrollHeight - event.target.scrollTop) == event.target.clientHeight;
                if (bottom) {
                    if(props.typeWanted === "")
                        setLoading(true);
                    else loadingNextPokemons();
                }

            }
        }>
            {

                pokemons.map((pokemon, i) => {
                    return pokemon == null ? "" : <SmallCard key={i} pokemon={pokemon}></SmallCard>
                })
            }
        </div>
    )
}

export default DisplaySection;