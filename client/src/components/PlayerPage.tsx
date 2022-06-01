import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Player from '../Classes/Player';


function PlayerPage(){

    const [thisPlayer, setThisPlayer] = useState<Player>();
    let { id } = useParams();

    function getPlayer(){
        fetch(`/api/player/${id}`).then(response => response.json()).then(data =>{
            console.log('received player json');
            console.log(data);
            setThisPlayer(data);
        }).catch((error)=>{
            console.log('error: ' + error);
            alert("not found")
        })
    }

    useEffect(()=>{
        getPlayer();
    
    },
    [])

    
    return(
        <div>
            this is the player page {id}

            {thisPlayer?.name}
        </div>
    )
}

export default PlayerPage;