
function PlayersTableItem(props: any){
    return(
        <tr>
                        <td>{props.tablenum}</td>
                        <td>{props.name}</td>
                        <td>{props.scrace}</td>

        </tr>
    )
}

export default PlayersTableItem;