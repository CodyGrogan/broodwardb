import { Link } from "react-router-dom";


function PlayersTableItem(props: any){
    let linkstring = `/player/${props.name}`;
    return(
        <tr>
                        <td> {props.tablenum}</td>
                        <td><Link to={linkstring}>{props.name}</Link></td>
                        <td>{props.scrace}</td>
                        <td>{props.elo}</td>

        </tr>
    )
}

export default PlayersTableItem;