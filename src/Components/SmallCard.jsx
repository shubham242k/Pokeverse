import { useContext } from "react"
import { authContext } from "../App"
import "../CSS/SmallCard.css"
let SmallCard = ({ pokemon }) => {
    let {setSelected,setHistory,history} = useContext(authContext);
    let handleHistory = ()=>{
        let arr = history;
        arr = renew(arr,pokemon.name);
        if(arr.length == 5) arr.shift();
        setHistory([...arr,pokemon]);
    }
    let renew = (arr,pokemonname)=>{
        return arr.filter((value)=>{
            return value.name !== pokemonname;
        })
    }
    return (

        <div className="card-container"
            onClick={() => {
                setSelected(pokemon);
                handleHistory();
            }}>
            <div className="intro-container">
                <div className="pokemon-image">
                    <img src={pokemon.sprites.front_default} alt="" />
                </div>
                <div className="pokemon-name">
                    <span>{pokemon.name.toUpperCase()}</span>
                </div>

                <div className="types">
                    {
                        pokemon.types.map((typeObj, i) => {
                            return <span className="type" key={i}>
                                {typeObj.type.name.toUpperCase()}
                            </span>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SmallCard;