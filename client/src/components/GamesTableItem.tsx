import { useEffect } from "react";
import { Link } from "react-router-dom";

function GamesTableItem(props: any){

    let winnerLink = `/player/${props.winner}`
    let loserLink = `/player/${props.loser}`


    return(<tr>
        <td>{props.date}</td>
        <td>{props.tournament}</td>
        <td>{props.gameNum}</td>
        <td><Link to={winnerLink}>{props.winner}</Link></td>
        <td><Link to={loserLink}>{props.loser}</Link></td>
        <td><a href={props.youtubelink} target={"_blank"}>Link</a></td>


    </tr>)
}

export default GamesTableItem;