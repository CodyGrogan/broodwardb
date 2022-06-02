import { JsxEmit } from "typescript";
import { useState, useEffect } from "react";


function PlayerGameTableItem(props: any){

 let [gameResult, setGameResult] = useState<JSX.Element>()

 let gameWinResult = <td className="Win-Result">{props.result}</td>
 let gameLoseResult = <td className="Lose-Result">{props.result}</td>

 useEffect(()=>{
     if (props.result == "Win"){
         setGameResult(gameWinResult);
     }
     else{
         setGameResult(gameLoseResult);
     }

 },
 [])


    return(
        <tr>
            <td>
                {props.date}
            </td>
            <td>
                {props.opponent}
            </td>
            <td>
                {gameResult}
            </td>
            <td>
                {props.map}
            </td>

        </tr>
    )
}

export default PlayerGameTableItem;