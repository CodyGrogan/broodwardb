import { Link } from "react-router-dom";

function TournamentTableItem(props: any){
    
    let tournyLink = `/tournament/${props.name}`;
    let winnerLink = `/player/${props.winner}`;

    let loserLink = `/player/${props.runnerup}`;

    
    return(
        <tr>
                        <td><Link to={tournyLink}>{props.name}</Link> </td>
                        <td>{props.startDate}</td>
                        <td>{props.endDate}</td>
                        <td className="spoiler" hidden={true}><Link to={winnerLink}>{props.winner}</Link> </td>
                        <td className="spoiler" hidden={true}><Link to={loserLink}>{props.runnerup}</Link></td>
        </tr>
    )
}

export default TournamentTableItem;