

function TournamentRank(props: any){

    return(
        <tr>
            <td>
                {props.num}
            </td>
            <td>
                {props.name}
            </td>
            <td>
                {props.race}
            </td>
        </tr>
    )
}

export default TournamentRank;

