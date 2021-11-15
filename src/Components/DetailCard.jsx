import { useEffect, useState } from "react";
import "../CSS/DetailCard.css"
let DetailCard = ({pokemon})=>{
    let statsShort = {
        "hp":"HP",
        "attack":"ATK",
        "defense":"DEF",
        "special-attack":"SpA",
        "special-defense":"SpD",
        "speed":"SPD"
    
    }
    // console.log(pokemon);
    return(
        
        <div className="col-5 detail-card-container">
            {pokemon == null ? "" :

            <div className = "image">
                {
                 pokemon.sprites.other.dream_world.front_default !== null?
                <img src={pokemon.sprites.other.dream_world.front_default} alt="select" /> :
                <img src={pokemon.sprites.other["official-artwork"].front_default} alt="select" />

                }
            </div>
            }
            <div className = "all-info-container">
            {pokemon == null ? "" : 
                <>
                {/* <div className = "number">pokemon.id</div> */}
                <div className = "name">{pokemon.name.toUpperCase()}</div>
                <div className = "types mb-2">
                    {
                        pokemon.types.map((typeObj,i)=>{
                            return <span className="type" key={i}>
                                {typeObj.type.name.toUpperCase()}
                            </span>
                        })
                    }
                </div>

                <div className = "line-breaker"></div>
                <div className = "section abilities mb-2">
                    <div>ABILITIES</div>
                    <div>
                    {
                        pokemon.abilities.map((abilityObj,i)=>{
                            return <span className="block" key={i}>
                                {abilityObj.ability.name.toUpperCase()}
                            </span>
                        })
                    }
                    </div>
                </div>

                <div className = "line-breaker"></div>

                <div className = "figure-data mb-2">
                    <div className = "section height mb-2">
                        <div>HEIGHT</div>
                        <span className="block">{pokemon.height}m</span>
                    </div>
                    <div className = "section base-experience mb-2">
                        <div>BASE EXPERIENCE</div>
                        <span className="block">{pokemon.base_experience}</span>
                    </div>
                    <div className = "section height mb-2">
                        <div>WEIGHT</div>
                        <span className="block">{pokemon.weight}kg</span>
                    </div>
                </div>

                <div className = "stats mt-4">
                    {
                        pokemon.stats.map((statsObj)=>{
                            return(
                                <div className = "stat-background">
                                    <div className="stat-name">{statsShort[statsObj.stat.name]}</div>
                                    <div className= "stat-quantity">{statsObj.base_stat}</div>
                                </div>
                            )
                        })
                    }
                </div>
                </>
            }
        </div>
        </div>
        
    )
}

export default DetailCard;