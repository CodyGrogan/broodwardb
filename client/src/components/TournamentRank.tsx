import { Link } from "react-router-dom";

function TournamentRank(props: any){

    return(
        <tr>
            <td>
                {props.num}
            </td>
            <td>
               <Link to={`/player/${props.name}`} > {props.name} </Link>
            </td>
            <td>
                {props.scrace}
            </td>
        </tr>
    )
}

export default TournamentRank;

