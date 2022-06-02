import { Link } from "react-router-dom";


function PlayersTableItem(props: any){
    let linkstring = `/player/${props.id}`;
    return(
        <tr>
                        <td>{props.tablenum}</td>
                        <td><Link to={linkstring}>{props.name}</Link></td>
                        <td>{props.scrace}</td>

        </tr>
    )
}

export default PlayersTableItem;