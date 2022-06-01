import { Link } from "react-router-dom";


function PlayersTableItem(props: any){
    let linkstring = `/playerpage/${props.id}`;
    return(
        <tr>
                        <td>{props.tablenum}</td>
                        <td><Link to={linkstring}>{props.name}</Link></td>
                        <td>{props.name}</td>
                        <td>{props.scrace}</td>

        </tr>
    )
}

export default PlayersTableItem;