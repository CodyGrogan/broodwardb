

function PlayerGameTableItem(props: any){

    return(
        <tr>
            <td>
                {props.date}
            </td>
            <td>
                {props.opponent}
            </td>
            <td>
                {props.result}
            </td>
            <td>
                {props.map}
            </td>

        </tr>
    )
}

export default PlayerGameTableItem;