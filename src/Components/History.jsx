import { useContext } from "react"
import { authContext } from "../App"
import "../CSS/History.css"

let History = ()=>{
    let {history,setSelected}= useContext(authContext);
    return (
    <div className = "history-container">
        {
            history.map((his)=>{
                return <div className = "each-history"
                onClick={()=>{
                    setSelected(his);
                }}>
                    <img src={his.sprites.front_default} alt="" />
                </div>
            })
        }
    </div>
    )
}

export default History