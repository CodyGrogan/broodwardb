import { useEffect } from "react";
import { Link } from "react-router-dom";

function MapsTableItem(props: any){



    return(<tr>
       <td> <Link to={`/map/${props.name}`}>{props.name}</Link> </td>
        <td>{props.maxPlayers}</td>
        <td>{props.gamesPlayed}</td>


    </tr>)
}

export default MapsTableItem;;