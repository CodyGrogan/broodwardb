import { useEffect } from "react";
import { Link } from "react-router-dom";

function GamesTableItem(props: any){

    let winnerLink = `/player/${props.winner}`
    let loserLink = `/player/${props.loser}`
    let tournyLink = `/tournament/${props.tournament}`



    return(<tr>
        <td>{props.listNum}</td>
        <td>{props.date}</td>
        <td><Link to={tournyLink}>{props.tournament}</Link></td>
        <td>{props.gameNum}</td>
        <td><Link to={winnerLink}>{props.winner}</Link></td>
        <td><Link to={loserLink}>{props.loser}</Link></td>
        <td><Link to={`/map/${props.map}`}>{props.map}</Link></td>
        <td><a href={props.youtubelink} target={"_blank"}>Link</a></td>


    </tr>)
}

export default GamesTableItem;