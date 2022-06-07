import { Link } from "react-router-dom";

function TournamentTableItem(props: any){
    
    let tournyLink = `/tournament/${props.name}`;
    
    return(
        <tr>
                        <td><Link to={tournyLink}>{props.name}</Link> </td>
                        <td>{props.startDate}</td>
                        <td>{props.endDate}</td>
                        <td className="spoiler" hidden={true}>{props.winner}</td>
                        <td className="spoiler" hidden={true}>{props.runnerup}</td>
        </tr>
    )
}

export default TournamentTableItem;