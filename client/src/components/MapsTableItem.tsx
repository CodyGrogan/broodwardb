import { useEffect } from "react";
import { Link } from "react-router-dom";

function MapsTableItem(props: any){



    return(<tr>
       <Link to={`/map/${props.name}`}><td>{props.name}</td></Link> 
        <td>{props.maxPlayers}</td>
        


    </tr>)
}

export default MapsTableItem;;