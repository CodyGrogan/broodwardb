

function TournamentTableItem(props: any){
    
    
    return(
        <tr>
                        <td>{props.name}</td>
                        <td>{props.startDate}</td>
                        <td>{props.endDate}</td>
                        <td className="spoiler" hidden={true}>{props.winner}</td>
                        <td className="spoiler" hidden={true}>{props.runnerup}</td>
        </tr>
    )
}

export default TournamentTableItem;