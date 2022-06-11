import { JsxEmit } from "typescript";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function PlayerGameTableItem(props: any){

 let [gameResult, setGameResult] = useState<JSX.Element>()

 let gameWinResult = <td className="Win-Result">{props.result}</td>
 let gameLoseResult = <td className="Lose-Result">{props.result}</td>

 let opponentLink =`/player/${props.opponent}`;

 function waitForReload(){
    setTimeout(()=>{
        window.location.reload()
    }, 100)
   
 }

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
              <Link to={opponentLink} onClick={() => waitForReload()}> {props.opponent}</Link>
            </td>
            <td>
                {gameResult}
            </td>
            <td>
                {props.map}
            </td>

            <td>
            <Link to={`/tournament/${props.tournament}`}>{props.tournament}</Link>
            </td>

            <td>
                <a href={props.youtubelink} target="_blank">Link</a>
            </td>

        </tr>
    )
}

export default PlayerGameTableItem;