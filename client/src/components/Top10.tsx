import { Link } from "react-router-dom";

function Top10(props: any){

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
            <td>
                {props.elo}
            </td>
        </tr>
    )
}

export default Top10;