import { Link } from "react-router-dom";

function TournamentPlayerTableItem(props: any){
    return(
        <tr>

            <td>
            <Link to={`/player/${props.name}`} > {props.name}</Link>
            </td>
            <td>
                {props.scrace}
            </td>

        </tr>
    )
}

export default TournamentPlayerTableItem