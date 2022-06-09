

function SpoilerFreeTableItem(props: any){
    return(
        <tr>
            <td>{props.gameNum}</td>
            <td><a href={props.youtubelink} target='_blank' rel="noreferrer">Link</a></td>

        </tr>
    )
}

export default SpoilerFreeTableItem;