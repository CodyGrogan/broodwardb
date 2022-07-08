import { JsxEmit } from "typescript";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function PlayerGameTableItem(props: any){

 const [gameResult, setGameResult] = useState<JSX.Element>()

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

 useEffect(()=>{
    if (props.result == "Win"){
        setGameResult(gameWinResult);
    }
    else{
        setGameResult(gameLoseResult);
    }

},
[props.result])


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
            <Link to={`/map/${props.map}`}>{props.map}</Link>
            </td>

            <td>
            <Link to={`/tournament/${props.tournament}`}>{props.tournament}</Link>
            </td>

            <td>
                <a href={props.youtubelink} target="_blank"><span className="material-icons">
smart_display
</span></a>
            </td>

        </tr>
    )
}

export default PlayerGameTableItem;